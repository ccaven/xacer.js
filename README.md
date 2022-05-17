# xacer.js

[xacer.js](https://github.com/ccaven/xacer.js) is a WebGL-based game engine.

This is an incomplete side project meant to learn the basics of how Entity-Component frameworks function.

## Overview
A component-based engine, xacer.js is built to be flexible yet powerful. <br>
Components should extend the `Component` class. <br>
Prefabs (pre-built game objects) should extend the `GameObject` class.

## Examples
Draw a cube
```js
/* Import modules */
import Renderer from "../src/gl/renderer.js";
import Object3D from "../src/gl/object.js";

/* Create canvas display */
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

/* Initialize renderer and cube */
const renderer = new Renderer(canvas);

const cube = new Object3D('cube', 'simple');

renderer.addObject(cube);

/* globals performance */
let now = performance.now();

/* Animation loop */
function draw() {
	cube.rotate((performance.now() - now) / 1000);
	now = performance.now();
	renderer.render();
	window.requestAnimationFrame(draw);
}

draw();
```

## Contributors

 - [xacer](https://github.com/ccaven)
 - [dkareh](https://github.com/dkareh)
 - [Phi](https://github.com/Phi-001)
 - [Ethan Kim](https://github.com/EthanKim8683)

