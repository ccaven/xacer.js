import "./types.js";

const shaders = {
	SIMPLE_VS: `
		#version 300 es

		in vec4 aVertexPosition;
		in vec2 aTextureCoord;

		// uniform mat4 uNormalMatrix;
		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;

		out vec2 vTextureCoord;

		void main() {
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vTextureCoord = aTextureCoord;
		}
	`.trim(),

	SIMPLE_FS: `
		#version 300 es

		precision highp float;

		in vec2 vTextureCoord;

		out vec4 outColor;

		const vec3 color = vec3(0.0, 0.0, 1.0);

		void main() {
			outColor = vec4(color * (max(1.0, 0.0) + 0.3), 1.0);
		}
	`.trim(),
};

/**
 * wrapper object for webgl shaders
 */
export default class Shader {
	/**
	 * constructor for Shader class.
	 * @param {WebGLRenderingContext} gl rendering context used to compile shaders
	 * @param {ShaderType} shaderType type of shader, either fs or vs
	 * @param {ProgramType} programType type of program that is made
	 */
	constructor(gl, shaderType, programType) {
		let type;
		if (shaderType === 'fs') {
			type = gl.FRAGMENT_SHADER;
		} else {
			type = gl.VERTEX_SHADER;
		}
		const shader = gl.createShader(type);
		gl.shaderSource(shader, shaders[`${programType}_${shaderType}`.toUpperCase()]);
		gl.compileShader(shader);
		this.shader = shader;
	}
}