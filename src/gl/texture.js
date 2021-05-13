import RenderPipeline from "./renderpipeline.js";

/**
 * The Texture class represents an image that is also sent to the GPU
 */
export default class Texture {

	/**
	 * Create a new Texture
	 * @param {RenderPipeline} renderPipeline
	 * @param {Number} width
	 * @param {Number} height
	 */
	constructor(renderPipeline, width, height) {

		this.gl = renderPipeline.gl;

		this.width = width;
		this.height = height;

		this.texture = this.gl.createTexture();

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
	}
}