import {init, Model} from "hiom-sim";
import {memory} from "hiom-sim/hiom_sim_bg";

var colormap = require('colormap');

init();

const MIN_O = -.5;
const MAX_O = .5;
const MIN_I = -.5;
const MAX_I = .5;
const MIN_A = -1.0;
const MAX_A = 1.0;
const NSHADES = 100;
const T_O = 0;
const DECAY_A = .9;

let colors = colormap({
    colormap: 'picnic',
    nshades: NSHADES,
    format: 'hex',
    alpha: 1
})

// buttons
const tick_but = document.getElementById("tick-but");
const pp_but = document.getElementById("pp-but");
const reset_but = document.getElementById("reset-but");
const thou_but = document.getElementById("thou-tick-but");

// info fields
const agent_info_pre = document.getElementById("agent-info");
const update_info_pre = document.getElementById("update-info");

// Sliders
const d_a_slider = document.getElementById("d_a");
const s_o_slider = document.getElementById("s_o");
const s_i_slider = document.getElementById("s_i");
const decay_i_slider = document.getElementById("decay_i");
const r_min_slider = document.getElementById("r_min");
const persuasion_slider = document.getElementById("persuasion");
const size_slider = document.getElementById("size");
const attention_init_slider = document.getElementById("attention_init");
const information_init_slider = document.getElementById("information_init");
const active_agents_slider = document.getElementById("active_agents");

// Radio buttons
const opinion_radio = document.getElementById("opinion");
const information_radio = document.getElementById("information");
const attention_radio = document.getElementById("attention");

const canvas = document.getElementById("canvas");
canvas.height = Math.min(window.innerWidth, window.innerHeight);
canvas.width = Math.min(window.innerWidth, window.innerHeight);

const ctx = canvas.getContext('2d');

let pause = true;
let mouse_x;
let mouse_y;
let size = size_slider.value;
let attention_init = attention_init_slider.value;
let information_init = information_init_slider.value;

let new_size = size_slider.value;

const calculate_cell_size = () => {
    return canvas.width / size;
}

let cell_size = calculate_cell_size();
let model = Model.new(size, decay_i_slider.value, s_o_slider.value,s_i_slider.value, d_a_slider.value, DECAY_A, persuasion_slider.value, r_min_slider.value, T_O,active_agents_slider.value);

const getIndex = (row, column) => {
    return (row * size + column) * 3;
};

const draw = () => {
    drawCells();
    update_info();
}

const drawCells = () => {
    const networkPtr = model.cell_ptr();
    const agents = new Float32Array(memory.buffer, networkPtr, size * size * 3);

    ctx.beginPath();

    let offset;
    let MIN;
    let MAX;
    if (attention_radio.checked) {
        offset = 1;
        MIN = MIN_A;
        MAX = MAX_A;
    } else if (information_radio.checked) {
        offset = 2;
        MIN = MIN_I;
        MAX = MAX_I;
    } else {
        offset = 0;
        MIN = MIN_O;
        MAX = MAX_O;
    }

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const idx = getIndex(row, col);

            let val = (Math.min(Math.max(agents[idx + offset], MIN), MAX) - MIN) / (MAX - MIN);

            ctx.fillStyle = colors[Math.floor(val * (NSHADES - 1))];

            ctx.fillRect(
                col * cell_size,
                row * cell_size,
                cell_size,
                cell_size
            );
        }
    }

    ctx.stroke();
};

const update_info = () => {
    update_info_pre.textContent = "agents updated in iteration: " + model.count();

    if (mouse_x === null || mouse_y === null) {
        return
    }

    agent_info_pre.textContent = model.inspect_agent(mouse_y, mouse_x);
}

const frame = () => {
    model.tick();

    draw();
}

const play = () => {
    if (!pause) {
        frame();
        requestAnimationFrame(play);
    }
}

const reset = () => {
    size = new_size;
    cell_size = calculate_cell_size();
    model = Model.new(size, decay_i_slider.value, s_o_slider.value, s_i_slider.value, d_a_slider.value, DECAY_A, persuasion_slider.value, r_min_slider.value, T_O,active_agents_slider.value, attention_init,information_init);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

size_slider.oninput = () => {
    document.getElementById("size_label").textContent = "length: " + size_slider.value;
    new_size = size_slider.value;
}

size_slider.onchange = () => {reset();};

canvas.addEventListener("click", event => {
    const row = Math.min(Math.floor(event.offsetY / cell_size), size);
    const col = Math.min(Math.floor(event.offsetX / cell_size), size);

    model.add_activist(row, col);

    draw();
});

canvas.addEventListener("mousemove", event => {
    mouse_x = Math.min(Math.floor(event.offsetX / (cell_size)), size);
    mouse_y = Math.min(Math.floor(event.offsetY / (cell_size)), size);

    update_info();
});

tick_but.onclick = () => {
    frame();
}

thou_but.onclick = () => {
    model.x_tick(100);

    draw();
}

pp_but.onclick = () => {
    pause = !pause;
    if (!pause) {
        requestAnimationFrame(play);
        pp_but.innerText = "Pause";
    } else {
        pp_but.innerText = "Play";
    }
}

reset_but.onclick = () => {reset();};

r_min_slider.oninput = () => {
    model.set_r_min(r_min_slider.value);
    document.getElementById("r_min_label").textContent = "Minimal resistance (r_min): " + r_min_slider.value;
}

d_a_slider.oninput = () => {
    model.set_d_a(d_a_slider.value);
    document.getElementById("d_a_label").textContent = "Attention increase for interactions: " + d_a_slider.value;
}

s_o_slider.oninput = () => {
    model.set_s_o(s_o_slider.value);
    document.getElementById("s_o_label").textContent = "Sd noise opinion: " + s_o_slider.value;
}

s_i_slider.oninput = () => {
    model.set_s_i(s_i_slider.value);
    document.getElementById("s_i_label").textContent = "Sd noise information: " + s_i_slider.value;
}

decay_i_slider.oninput = () => {
    model.set_decay_i(decay_i_slider.value);
    document.getElementById("decay_i_label").textContent = "Decay information: " + decay_i_slider.value;
}

persuasion_slider.oninput = () => {
    model.set_persuasion(persuasion_slider.value);
    document.getElementById("persuasion_label").textContent = "Persuasion: " + persuasion_slider.value;
}

active_agents_slider.oninput = () => {
    model.set_active_agents(active_agents_slider.value);
    document.getElementById("active_agents_label").textContent = "% Active agents: " + active_agents_slider.value;
}

attention_init_slider.oninput = () => {
    document.getElementById("attention_init_label").textContent = "Attention init: " + attention_init_slider.value;
    attention_init= attention_init_slider.value;
}
attention_init_slider.onchange = () => {reset();};


information_init_slider.oninput = () => {
    document.getElementById("information_init_label").textContent = "Information init: " + information_init_slider.value;
    information_init= information_init_slider.value;
}
information_init_slider.onchange = () => {reset();};

opinion_radio.onchange = () => {draw();}
information_radio.onchange = () => {draw();}
attention_radio.onchange = () => {draw();}

reset();
