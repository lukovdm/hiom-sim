import {init, Model} from "hiom-sim";
import {memory} from "hiom-sim/hiom_sim_bg";

var colormap = require('colormap');

init();

const SIZE = 200;
const MIN_O = -1.5;
const MAX_O = 1.5;
const NSHADES = 100;
const S_I = 0;
const T_O = 0;

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
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
const r_min_slider = document.getElementById("r_min");
const persuasion_slider = document.getElementById("persuasion");

let model = Model.new(SIZE, S_I, d_a_slider.value, persuasion_slider.value, r_min_slider.value, T_O);
const width = SIZE;
const height = SIZE;

let pause = true;
let mouse_x = null;
let mouse_y = null;

const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

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
    model = Model.new(SIZE, S_I, d_a_slider.value, persuasion_slider.value, r_min_slider.value, T_O);
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

persuasion_slider.oninput = () => {
    model.set_persuasion(persuasion_slider.value);
    document.getElementById("persuasion_label").textContent = "persuasion: " + persuasion_slider.value;
}

const getIndex = (row, column) => {
    return (row * width + column) * 3;
};

const drawCells = () => {
    const networkPtr = model.cell_ptr();
    const agents = new Float32Array(memory.buffer, networkPtr, width * height * 3);

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            let op = (Math.min(Math.max(agents[idx], MIN_O), MAX_O) + 1.5) / 3;

            ctx.fillStyle = colors[NSHADES - 1 - Math.floor(op * NSHADES)];

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
};

const draw = () => {
    // drawGrid();
    drawCells();
    update_info();
}

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
