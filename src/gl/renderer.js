import Object3D from "./object.js"; // eslint-disable-line

/**
 * main renderer that renders scene from inputted sources
 */
export default class Renderer {
	/**
	 * constructor for renderer class
	 * @param {HTMLCanvasElement} canvas canvas that is used to get the webgl rendering context
	 */
	constructor(canvas) {
		const gl = canvas.getContext("webgl2");
		this.gl = gl;
		this.objects = [];
	}

	/**
	 * adds an object to this renderer
	 * @param {Object3D} obj object that is being added to this renderer
	 */
	addObject(obj) {
		obj.init(this.gl);
		this.objects.push(obj);
	}

	/**
	 * renders the scene
	 */
	render() {
		const gl = this.gl;
		gl.clearColor(0, 0, 0, 1);
		gl.clearDepth(1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		for (const obj of this.objects) {
			obj.render();
		}
	}
}