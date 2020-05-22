mod utils;

use std::fmt;

use std::f32;

use js_sys::Math;

use wasm_bindgen::prelude::*;
use js_sys::Math::round;

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
            information: norm_random(0.1, 0.0),
        }
    }

    fn update_info(&mut self, other: &Agent, persuasion: f32, r_min: f32) {
        let r = r_min + (1.0 - r_min)/(1.0 + (-1.0 * persuasion * (self.attention - other.attention)).exp());
        self.information = r * self.information + (1f32 - r) * other.information;
    }

    fn update_attention(&mut self, d_a: f32, a_s: f32) {
        self.attention = self.attention + d_a * (2.0 * a_s - self.attention);
    }

    fn decay_attention(&mut self, d_a: f32, n: usize) {
        self.attention = self.attention - 2.0 * d_a * self.attention / (n as f32)
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

    fn sum_of_attention(&self) -> f32 {
        self.cells.iter().map(|a| a.attention).sum()
    }

    fn rand_neighbours(&self, i: usize) -> usize {
        let size = self.width * self.height;
        let r = Math::random();
        (i + if r < (1f64/8f64) {
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
        }) % size
    }

    fn weighted_random_sample(&self) -> Option<usize> {
        let mut sorted_cells : Vec<_> = self.cells.iter().enumerate().collect();
        sorted_cells.sort_unstable_by(|(_, a), (_, b)|
            b.attention.partial_cmp(&a.attention).unwrap()
        );
        let at_sum = self.sum_of_attention();
        let mut sorted_iter = sorted_cells.iter().map(|(i, a)| {
            let mut a_new = (*a).clone();
            a_new.attention = a_new.attention / at_sum;
            (*i, a_new)
        });

        let mut r = Math::random() as f32;
        loop {
            match sorted_iter.next() {
                Some(agent) => {
                    r -= agent.1.attention;
                    if r < 0.0 {
                        break Some(agent.0);
                    }
                },
                None => break None,
            }

        }
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
    a_star: f32,
    s_o: f32,
    s_i: f32,
    d_a: f32,
    persuasion: f32,
    r_min: f32,
    t_o: f32,
    network: BlockNetwork
}

#[wasm_bindgen]
impl Model {
    pub fn new(l: usize, s_i: f32, d_a: f32, persuasion: f32, r_min: f32, t_o: f32) -> Model {
        Model {
            n: l*l,
            d_t: 0.01,
            a_min: -0.5,
            a_star: 1.0,
            s_o: 0.01,
            s_i,
            d_a,
            persuasion,
            r_min,
            t_o,
            network: BlockNetwork::new(l, l),
        }
    }

    pub fn add_activist(&mut self, row: usize, col: usize) {
        let idx = row * self.network.width + col;
        self.network.cells[idx] = Agent {
            opinion: -0.5,
            attention: 1.0,
            information: -0.5,
        }
    }

    pub fn tick(&mut self) {
        log!("tick");
        if let Some(agent_index) = self.network.weighted_random_sample() {
            let mut agent = self.network.cells[agent_index];
            let neigh_index = self.network.rand_neighbours(agent_index);
            let mut neigh = self.network.cells[neigh_index];

            agent.update_info(&self.network.cells[neigh_index], self.persuasion, self.r_min);
            neigh.update_info(&self.network.cells[agent_index], self.persuasion, self.r_min);

            agent.update_attention(self.d_a, self.a_star);
            neigh.update_attention(self.d_a, self.a_star);

            self.network.cells[agent_index] = agent;
            self.network.cells[neigh_index] = neigh;
        }

        self.network.cells = self.network.cells.iter().map(|a| {
            let mut a_new = a.clone();
            a_new.stoch_cusp(self.d_t, self.s_o, self.a_min);
            a_new.decay_attention(self.d_a, self.n);
            a_new
        }).collect();
    }

    pub fn cell_ptr(&self) -> *const Agent {
        self.network.cells.as_ptr()
    }

    pub fn render(&self) -> String {
        self.network.to_string()
    }
}
