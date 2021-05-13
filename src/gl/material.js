import RenderPipeline from "./renderpipeline.js";
import Shader from "./shader.js";
import Texture from "./texture.js";

/**
 * The Material class represents any material.
 */
export default class Material {

	/**
	 * Create a new Material object
	 * @param {RenderPipeline} renderpipeline
	 * @param {Shader} shader
	 */
	constructor (renderpipeline, shader) {
		this.renderpipeline = renderpipeline;

		this.shader = shader;
	}

}
