import { Model, init } from "hiom-sim";
import { memory } from "hiom-sim/hiom_sim_bg";
var colormap = require('colormap');

init();

const SIZE = 50;
const MIN_O = -1.5;
const MAX_O = 1.5;
const NSHADES = 100;

const CELL_SIZE = 20; // px
const GRID_COLOR = "#CCCCCC";
let colors = colormap({
    colormap: 'picnic',
    nshades: NSHADES,
    format: 'hex',
    alpha: 1
})

const model = Model.new(SIZE, 0, 0.2, 1, 0.5, 0);
const width = SIZE;
const height = SIZE;

let pause = true;

const tick_but = document.getElementById("tick-but");
const pp_but = document.getElementById("pp-but");

const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

tick_but.onclick = function() {
    frame();
}

pp_but.onclick = function () {
    pause = !pause;
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

const frame = () => {
    model.tick();

    drawGrid();
    drawCells();
}

const play = () => {
    if (!pause) {
        frame();
    }
    requestAnimationFrame(play)
}

requestAnimationFrame(play);
