// Import vec3 module
import * as vec3 from
	"https://cdn.jsdelivr.net/gh/ccaven/xacer3d/src/gl-matrix/vec3.js";

// Import vec4 module
import * as vec4 from
	"https://cdn.jsdelivr.net/gh/ccaven/xacer3d/src/gl-matrix/vec4.js";

// Import mat3 module
import * as mat3 from
	"https://cdn.jsdelivr.net/gh/ccaven/xacer3d/src/gl-matrix/mat3.js";

// Import mat4 module
import * as mat4 from
	"https://cdn.jsdelivr.net/gh/ccaven/xacer3d/src/gl-matrix/mat4.js";
// Import mesh module
import { StandardMesh } from
	"https://cdn.jsdelivr.net/gh/ccaven/xacer3d/src/x3d.js";

// Import WebGL wrapper modules
import { DisplayContext, Renderer } from
	"https://cdn.jsdelivr.net/gh/ccaven/xacer3d/src/xgl.js";

(async () => {

// Initialize display context
const displayContext = new DisplayContext({
	preserveDrawingBuffer: true,
	failIfMajorPerformanceCaveat: true,
	alpha: false
});

// Initialize renderer object
const renderer = new Renderer(displayContext, {
	vertex: document.getElementById("standard.vsh").text.trim(),
	fragment: (await fetch("./fragment.glsl").then(r => r.text())).trim()
});

// Create the mesh object
// The mesh is just a rectangle that covers the scree
const mesh = new StandardMesh(displayContext, [
	{ name: "position", size: 2 },
]);

// Set the vertex positions and triangles of the mesh
mesh.data.position = [-1, -1, -1, 1, 1, 1, 1, -1];
mesh.data.triangles = [0, 2, 1, 3, 2, 0];

// Send the resolution to the GPU
const resolution = [displayContext.width, displayContext.height];
renderer.setUniform("u_resolution", resolution);

// Delta time
const dt = 1 / 60;

// Create the camera variable
const camera = vec3.create();
camera[0] = 0;
camera[1] = 10;
camera[2] = 0.5;

const view = mat4.create();

// Send the mesh data to the GPU
mesh.setBuffers();
mesh.setAttibPointers(renderer);

/** @type {HTMLCanvasElement} */
const diskCanvas = document.createElement("CANVAS");

/** @type {WebGL2RenderingContext} */
let gl = displayContext.gl;

/** @type {CanvasRenderingContext2D} */
let diskCanvasCtx;
let diskRects = [];
let diskTexture = gl.createTexture();

function initializeDiskCanvas () {
	diskCanvas.width = 1500;
	diskCanvas.height = 1000;

	diskCanvasCtx = diskCanvas.getContext("2d");

	let c1 = {
		r: 255,
		g: 255,
		b: 255
	};

	let c2 = {
		r: 255,
		g: 200,
		b: 255,
	};

	let l = (k) => {
		return {
			r: c1.r + (c2.r - c1.r) * k,
			g: c1.g + (c2.g - c1.g) * k,
			b: c1.b + (c2.b - c1.b) * k
		};
	};

	for (let i = 0; i < 400; i ++) {
		diskRects[i] = {
			x: Math.random() * diskCanvas.width,
			y: Math.max(Math.min(Math.random(), 0.8), 0.2) * diskCanvas.height,
			width: Math.random() * 50 + 300,
			height: 20,
			color: l(Math.random())
		};
		diskRects[i].speed = 10 * (1 - (diskRects[i].y - 0.2) / diskCanvas.height);
	}

	//document.body.prepend(diskCanvas);
}

function updateDiskCanvas () {
	let ctx = diskCanvasCtx;

	// Draw rects
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, diskCanvas.width, diskCanvas.height);

	for (let diskRect of diskRects) {

		// Update speed
		diskRect.x += diskRect.speed;

		if (diskRect.x > diskCanvas.width) {
			diskRect.x = 0;
		}

		// Draw
		ctx.fillStyle = `rgba(${diskRect.color.r}, ${diskRect.color.g}, ${diskRect.color.b}, 255)`;

		// Main
		let w = Math.min(diskRect.width, diskCanvas.width - diskRect.x);
		ctx.fillRect(diskRect.x, diskRect.y, w, diskRect.height);

		// Check for x-wrap
		if (diskRect.x + diskRect.width > diskCanvas.width) {
			w = diskRect.x + diskRect.width - diskCanvas.width;
			ctx.fillRect(0, diskRect.y, w, diskRect.height);
		}
	}


}

function updateDiskCanvas2 () {

	let ctx = diskCanvasCtx;

	let im = new ImageData(diskCanvas.width, diskCanvas.height);

	const npi = Math.PI;
	const wings  = 5;
	const freq   = 20;
	const radius = 3.5;
	const pi2   = npi * 2;
	const xfac  = pi2 * wings;

	function ripple (x, y) {
		const nx = x * xfac;
		const ny = y * freq;

		const tr = Math.cos (nx + ny * ny * 0.1);

		return tr;
	}

	function amp (x, y) {
		return Math.sin (y * y * radius) * 255;
	}

	for (let x = 0; x < diskCanvas.width; x ++) {

		for (let y = 0; y < diskCanvas.height; y ++) {

			let l = x + y * diskCanvas.width << 2;

			let nx = x / diskCanvas.width;
			let ny = y / diskCanvas.height;

			const col = (ripple(nx, ny) * 0.5 + 0.5) * amp(nx, ny) | 0;

			im[l] = 255;
			im[l+1] = col * 255;
			im[l+2] = col * 255;
			im[l+3] = 255;
		}
	}

	ctx.putImageData(im, 0, 0);

}

initializeDiskCanvas();

const blurCanvas = (() => {

	/** @type {HTMLCanvasElement[]} */
	const canvii = [];

	/** @type {CanvasRenderingContext2D[]} */
	const ctxii = [];

	const iters = 6;

	let width = diskCanvas.width + 100;
	let height = diskCanvas.height;

	for (let i = 0; i < iters; i ++) {
		canvii[i] = document.createElement("CANVAS");

		canvii[i].width = width;
		canvii[i].height = height;

		width /= 2;
		height /= 2;

		ctxii[i] = canvii[i].getContext("2d");
	}

	return function () {

		// clear all
		for (let i = 0; i < iters; i ++) {
			ctxii[i].clearRect(0, 0, canvii[i].width, canvii[i].height);
		}

		ctxii[0].clearRect(0, 0, canvii[0].width, canvii[0].height);

		// initial draw

		// Main
		ctxii[0].drawImage(diskCanvas, 50, 0);

		// First edge
		ctxii[0].drawImage(diskCanvas,
			0, 0, 50, diskCanvas.height,
			diskCanvas.width + 50, 0, 50, diskCanvas.height);
		// Second edge
		ctxii[0].drawImage(diskCanvas,
			diskCanvas.width - 50, 0, 50, diskCanvas.height,
			0, 0, 50, diskCanvas.height);

		// downscale
		for (let i = 1; i < iters; i ++) {
			ctxii[i].drawImage(canvii[i - 1], 0, 0, canvii[i].width, canvii[i].height);
		}

		// upscale
		for (let i = iters - 1; i >= 1; i --) {
			ctxii[i - 1].drawImage(canvii[i], 0, 0, canvii[i - 1].width, canvii[i - 1].height);
		}

		// draw back on
		diskCanvasCtx.drawImage(canvii[0],
			50, 0, canvii[0].width - 100, diskCanvas.height,
			0, 0, diskCanvas.width, diskCanvas.height);
	}
})();

const keys = {};

document.onkeydown = function (e) {
	keys[e.key.toString()] = true;
	console.log(e.toString());
};
document.onkeyup = function (e) {
	keys[e.key.toString()] = false;
};

let pitch = 0.1;
let yaw = 0;

document.onmousemove = function (e) {
	pitch += 0.1 * e.movementY * dt;
	yaw += 0.1 * e.movementX * dt;
};

document.onmousedown = function (e) {
	gl.canvas.requestPointerLock();
};

// Animation loop
function render(now) {
	// Send the time to the GPU
	renderer.setUniform("u_time", now * 0.001);

	mat4.fromRotation(view, Math.PI / 2, [1, 0, 0]);
	mat4.rotate(view, view, yaw, [0, 1, 0]);
	mat4.rotate(view, view, pitch, [1, 0, 0]);

	camera[0] = Math.cos(yaw + Math.PI / 2) * Math.sin(-pitch + Math.PI / 2 );
	camera[1] = Math.sin(yaw + Math.PI / 2) * Math.sin(-pitch + Math.PI / 2);
	camera[2] = Math.cos(-pitch + Math.PI / 2);

	camera[0] *= 5;
	camera[1] *= 5;
	camera[2] *= 5;

	// Send the camera info to the GPU
	renderer.setUniform("u_camera", camera);
	renderer.setUniform("u_view", view);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, diskTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	updateDiskCanvas();
	blurCanvas();

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, diskCanvas);

	gl.uniform1i(
		gl.getUniformLocation(renderer.program, "u_disk"), 0);

	// Draw the mesh with the renderer
	mesh.render(renderer);

	// Call another animation frame
	requestAnimationFrame(render);
}

// Call the first animation frame
requestAnimationFrame(render);

}) ();