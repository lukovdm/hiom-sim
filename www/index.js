import {init, Model} from "hiom-sim";
import {memory} from "hiom-sim/hiom_sim_bg";

var colormap = require('colormap');

init();

const SIZE = 200;
const MIN_O = -1.5;
const MAX_O = 1.5;
const MIN_I = -2.0;
const MAX_I = 2.0;
const MIN_A = -1.0;
const MAX_A = 1.0;
const NSHADES = 100;
const S_I = 0;
const T_O = 0;

const CELL_SIZE = 5; // px
let colors = colormap({
    colormap: 'picnic',
    nshades: NSHADES,
    format: 'hex',
    alpha: 1
})

const tick_but = document.getElementById("tick-but");
const pp_but = document.getElementById("pp-but");
const reset_but = document.getElementById("reset-but");

const agent_info_pre = document.getElementById("agent-info");
const update_info_pre = document.getElementById("update-info");

const d_a_slider = document.getElementById("d_a");
const a_star_slider = document.getElementById("a_star");
const r_min_slider = document.getElementById("r_min");
const persuasion_slider = document.getElementById("persuasion");

const opinion_radio = document.getElementById("opinion");
const information_radio = document.getElementById("information");
const attention_radio = document.getElementById("attention");

let model = Model.new(SIZE, a_star_slider.value, S_I, d_a_slider.value, persuasion_slider.value, r_min_slider.value, T_O);
const width = SIZE;
const height = SIZE;

let pause = true;
let mouse_x = null;
let mouse_y = null;

const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE) * height;
canvas.width = (CELL_SIZE) * width;

const ctx = canvas.getContext('2d');

canvas.addEventListener("click", event => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    model.add_activist(row, col);

    draw();
});

canvas.addEventListener("mousemove", event => {
    mouse_x = event.clientX;
    mouse_y = event.clientY;

    update_info();
});

tick_but.onclick = () => {
    frame();
}

pp_but.onclick = () => {
    pause = !pause;
    if (!pause) {
        requestAnimationFrame(play);
        pp_but.innerText = "pause";
    } else {
        pp_but.innerText = "play";
    }
}

reset_but.onclick = () => {
    model = Model.new(SIZE, a_star_slider.value, S_I, d_a_slider.value, persuasion_slider.value, r_min_slider.value, T_O);
    draw();
}

r_min_slider.oninput = () => {
    model.set_r_min(r_min_slider.value);
    document.getElementById("r_min_label").textContent = "r_min: " + r_min_slider.value;
}

d_a_slider.oninput = () => {
    model.set_d_a(d_a_slider.value);
    document.getElementById("d_a_label").textContent = "d_a: " + d_a_slider.value;
}

a_star_slider.oninput = () => {
    model.set_a_star(a_star_slider.value);
    document.getElementById("a_star_label").textContent = "a_star: " + a_star_slider.value;
}

persuasion_slider.oninput = () => {
    model.set_persuasion(persuasion_slider.value);
    document.getElementById("persuasion_label").textContent = "persuasion: " + persuasion_slider.value;
}

opinion_radio.onchange = () => {draw();}
information_radio.onchange = () => {draw();}
attention_radio.onchange = () => {draw();}


const getIndex = (row, column) => {
    return (row * width + column) * 3;
};

const draw = () => {
    drawCells();
    update_info();
}

const drawCells = () => {
    const networkPtr = model.cell_ptr();
    const agents = new Float32Array(memory.buffer, networkPtr, width * height * 3);

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            let offset = null;
            let MIN = null;
            let MAX = null;
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

            let op = (Math.min(Math.max(agents[idx + offset], MIN), MAX) - MIN) / (MAX - MIN);

            ctx.fillStyle = colors[NSHADES - 1 - Math.floor(op * NSHADES)];

            ctx.fillRect(
                col * (CELL_SIZE),
                row * (CELL_SIZE),
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
};

const update_info = () => {
    update_info_pre.textContent = "agents updated: " + model.count();

    if (mouse_x === null || mouse_y === null) {
        return
    }

    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (mouse_x - boundingRect.left) * scaleX;
    const canvasTop = (mouse_y - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    agent_info_pre.textContent = model.inspect_agent(row, col);
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

draw();
requestAnimationFrame(play);
