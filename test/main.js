import Renderer from "../src/gl/renderer.js";
import Object from "../src/gl/object.js";

const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.margin = "0px";
canvas.style.border = "0px";
canvas.style.padding = "0px";
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";

document.body.appendChild(canvas);

const renderer = new Renderer(canvas);

const cube = new Object();

renderer.addObject(cube);

renderer.render();
