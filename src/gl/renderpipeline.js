
/**
 * The RenderPipeline class is reponsible for drawing everything.
 */
export default class RenderPipeline {

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


	}

	renderToScreen () {
		this.ctx.drawImage(this.glCanvas, 0, 0);
	}

}