import { Model, init } from "hiom-sim";
import { memory } from "hiom-sim/hiom_sim_bg";
var colormap = require('colormap');

init();

const SIZE = 200;
const MIN_O = -1.5;
const MAX_O = 1.5;
const NSHADES = 100;

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
let colors = colormap({
    colormap: 'picnic',
    nshades: NSHADES,
    format: 'hex',
    alpha: 1
})

const model = Model.new(SIZE, 0, 0.2, 2, 0.1, 0);
const width = SIZE;
const height = SIZE;

let pause = true;

const tick_but = document.getElementById("tick-but");
const pp_but = document.getElementById("pp-but");
const act_but = document.getElementById("act-but");

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

    drawGrid();
    drawCells();
});

tick_but.onclick = () => {
    frame();
}

pp_but.onclick = () => {
    pause = !pause;
    if (!pause) {
        requestAnimationFrame(play);
    }
}

const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for(let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for(let i = 0; i <= height; i++) {
        ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, i * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
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

            ctx.fillStyle = colors[Math.round(op * NSHADES)];

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
    drawGrid();
    drawCells();
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
