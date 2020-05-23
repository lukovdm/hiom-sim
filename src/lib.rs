mod utils;

use std::fmt;

use std::f32;

use js_sys::Math;

use wasm_bindgen::prelude::*;

extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook()
}

fn norm_random(mean: f32, std: f32) -> f32 {
    let u = Math::random() as f32;
    let v = Math::random() as f32;
    let gaus = (-2.0 * u.ln()).sqrt() * (2.0 * f32::consts::PI * v).cos();
    gaus * std + mean
}

// Fisher and Yates shuffle
fn shuffle(ar: &mut[usize]) {
    if ar.len() < 2 {
        return;
    }
    for i in 0..ar.len() - 2 {
        let j = (Math::random() * (ar.len() - i) as f64).floor() as usize + i;
        let x = ar[i];
        ar[i] = ar[j];
        ar[j] = x;
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Agent {
    opinion: f32,
    attention: f32,
    information: f32,
}

impl Agent {
    pub fn new() -> Agent {
        Agent {
            attention: 0.0,
            opinion: norm_random(0.0, 0.01),
            information: norm_random(-0.1, 0.0),
        }
    }

    fn update_info(&mut self, other: &Agent, persuasion: f32, r_min: f32) {
        let r = r_min + (1.0 - r_min)/(1.0 + (-1.0 * persuasion * (self.attention - other.attention)).exp());
        self.information = r * self.information + (1f32 - r) * other.information;
    }

    fn update_attention(&mut self, d_a: f32) {
       // self.attention = self.attention + d_a * (2.0 * a_s - self.attention);
       self.attention = 1f32.min(self.attention + d_a);
    }

    fn decay_attention(&mut self, decay_a: f32) {
     //   self.attention = self.attention - 2.0 * d_a * (count as f32) * self.attention / (n as f32)
        self.attention = decay_a * self.attention;
    }

    fn decay_information(&mut self, decay_i: f32, s_i : f32) {
        //   self.attention = self.attention - 2.0 * d_a * (count as f32) * self.attention / (n as f32)
        self.information += norm_random(0.0, s_i);
        self.information = decay_i * self.information;
    }


    fn stoch_cusp(&mut self, d_t: f32, s_o: f32, a_min: f32) {
        self.opinion = self.opinion
            - d_t*(self.opinion.powi(3)-(self.attention + a_min) * self.opinion - self.information)
            + norm_random(0.0, s_o);
    }
}

impl fmt::Display for Agent {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({:.2}, {:.2}, {:.2})", self.opinion, self.attention, self.information)?;
        Ok(())
    }
}

#[wasm_bindgen]
pub struct BlockNetwork {
    width: usize,
    height: usize,
    cells: Vec<Agent>,
}

#[wasm_bindgen]
impl BlockNetwork {
    pub fn new (width: usize, height: usize) -> BlockNetwork {
        let cells = (0..width*height).map(|_i| {
            Agent::new()
        }).collect();
        BlockNetwork {
            width,
            height,
            cells,
        }
    }

    pub fn render(&self) -> String {
        self.to_string()
    }

    fn rand_neighbours(&self, i: usize) -> usize {
        let size = self.width * self.height;
        let r = Math::random();
        (i +
            if r < (1f64/8f64) {
                size - self.width - 1
            } else if r < (2f64/8f64) {
                size - self.width
            } else if r < (3f64/8f64) {
                size - self.width + 1
            } else if r < (4f64/8f64) {
                size - 1
            } else if r < (5f64/8f64) {
                size + 1
            } else if r < (6f64/8f64) {
                size + self.width - 1
            } else if r < (7f64/8f64) {
                size + self.width
            } else {
                size + self.width + 1
            }
        ) % size
    }
}

impl fmt::Display for BlockNetwork {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                write!(f, "{}", cell)?;
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}

#[wasm_bindgen]
pub struct Model {
    n: usize,
    d_t: f32,
    a_min: f32,
    decay_i: f32,
    s_o: f32,
    s_i: f32,
    d_a: f32,
    decay_a: f32,
    persuasion: f32,
    r_min: f32,
    t_o: f32,
    network: BlockNetwork,
    last_updated_count: usize,
}

#[wasm_bindgen]
impl Model {
    pub fn new(l: usize, decay_i: f32, s_i: f32, d_a: f32, decay_a: f32, persuasion: f32, r_min: f32, t_o: f32) -> Model {
        Model {
            n: l*l,
            d_t: 0.01,
            a_min: -0.5,
            decay_i,
            s_o: 0.01,
            s_i,
            d_a,
            decay_a,
            persuasion,
            r_min,
            t_o,
            network: BlockNetwork::new(l, l),
            last_updated_count: 0,
        }
    }

    pub fn add_activist(&mut self, row: usize, col: usize) {
        let idx = row * self.network.width + col;
        self.network.cells[idx] = Agent {
            opinion: 0.5,
            attention: 1.0,
            information: 0.5,
        }
    }

    pub fn tick(&mut self) {
        let mut count = 0;

        let mut shuffeld_range: Vec<usize> = (0..self.n).filter(|i| {
            let r = Math::random() as f32;
            self.network.cells[*i].attention > r
        }).collect();

        if shuffeld_range.len() > 0 {
            shuffle(&mut shuffeld_range);
            for idx in shuffeld_range {
                let mut agent = self.network.cells[idx];
                count += 1;
                let neigh_index = self.network.rand_neighbours(idx);
                let mut neigh = self.network.cells[neigh_index];

                agent.update_info(&self.network.cells[neigh_index], self.persuasion, self.r_min);
                neigh.update_info(&self.network.cells[idx], self.persuasion, self.r_min);

                agent.update_attention(self.d_a);
                neigh.update_attention(self.d_a);

                self.network.cells[idx] = agent;
                self.network.cells[neigh_index] = neigh;
            }
        }

        self.network.cells = self.network.cells.iter().map(|a| {
            let mut a_new = a.clone();
            a_new.decay_attention(self.decay_a);
            a_new.decay_information(self.decay_i, self.s_i);
            a_new.stoch_cusp(self.d_t, self.s_o, self.a_min);
            a_new
        }).collect();

        self.last_updated_count = count;
    }

    pub fn x_tick(&mut self, ticks: u32) {
        for _ in 0..ticks {
            self.tick();
        }
    }

    pub fn cell_ptr(&self) -> *const Agent {
        self.network.cells.as_ptr()
    }

    pub fn render(&self) -> String {
        self.network.to_string()
    }

    pub fn count(&self) -> usize {
        self.last_updated_count
    }

    pub fn set_d_a(&mut self, d_a: f32) {
        self.d_a = d_a;
    }

    pub fn set_s_i(&mut self, s_i: f32) {
        self.s_i = s_i;
    }

    pub fn set_decay_a(&mut self, decay_a: f32) {
        self.decay_a = decay_a;
    }

    pub fn set_r_min(&mut self, r_min: f32) {
        self.r_min = r_min;
    }

    pub fn set_decay_i(&mut self, decay_i: f32) {
        self.decay_i = decay_i;
    }

    pub fn set_persuasion(&mut self, persuasion: f32) {
        self.persuasion = persuasion;
    }

    pub fn inspect_agent(&self, row: usize, col: usize) -> String {
        self.network.cells[row * self.network.width + col].to_string()
    }
}
