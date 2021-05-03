// Import necessary classes
import Scene from "../src/engine/scene.js";
import Player from "../src/engine/prefabs/player.js";

// Create the canvas
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

const scene = new Scene();

// Add all the initial gameObjects here
scene.createGameObject(Player);

// Initialize each component
scene.start();

function draw () {
	scene.update();
	window.requestAnimationFrame(draw);
}

draw();

/*
import Renderer from "../src/gl/renderer.js";
import Object3D from "../src/gl/object.js";

const renderer = new Renderer(canvas);

const cube = new Object3D('cube', 'simple');

renderer.addObject(cube);

let now = performance.now();

function draw() {
	cube.rotate((performance.now() - now) / 1000);
	now = performance.now();
	renderer.render();
	window.requestAnimationFrame(draw);
}

draw();
*/