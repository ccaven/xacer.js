
/**
 * The RenderPipeline class is reponsible for drawing everything.
 */
export default class RenderPipeline {

	/**
	 * Create a new instance of RenderPipeline
	 */
	constructor() {
		/**
		 * The canvas which stores the WebGL context
		 * @type {HTMLCanvasElement}
		 */
		this.glCanvas = document.createElement("CANVAS");
		this.gl = this.glCanvas.getContext("webgl2");

		/**
		 * The canvas which stores the CanvasRenderingContext2D element
		 * @type {HTMLCanvasElement}
		 */
		this.ctxCanvas = document.createElement("CANVAS");
		this.ctx = this.ctxCanvas.getContext("2d");

		document.body.appendChild(this.ctxCanvas);


	}

	/**
	 * Draw the WebGL canvas on the CTX canvas
	 */
	renderToScreen () {
		this.ctx.drawImage(this.glCanvas, 0, 0);
	}

}