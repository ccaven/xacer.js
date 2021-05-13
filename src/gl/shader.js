import RenderPipeline from "./renderpipeline";

/**
 * Create a WebGL shader
 * @param {WebGL2RenderingContext} gl - The WebGL context
 * @param {Number} type - The type of the shader
 * @param {String} source - The shader code
 * @returns {WebGLShader}
 */
function createShader (gl, type, source) {

	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if (success) return shader;

	console.error(gl.getShaderInfoLog(shader));

	gl.deleteShader(shader);
}

/**
 *
 * @param {WebGL2RenderingContext} gl - The WebGL context
 * @param {String} vsSource - The vertex shader code
 * @param {String} fsSource - The fragment shader code
 * @returns {WebGLProgram}
 */
function createProgram (gl, vsSource, fsSource) {

	const vShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
	const fShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

	const program = gl.createProgram();
	gl.attachShader(program, vShader);
	gl.attachShader(program, fShader);

	gl.linkProgram(program);

	const success = gl.getProgramParameter(program, gl.LINK_STATUS);

	if (success) return program;

}

export default class Shader {

	/**
	 * Create a new Shader object
	 * @param {RenderPipeline} rp
	 * @param {String} vsSource
	 * @param {String} fsSource
	 */
	constructor (rp, vsSource, fsSource) {
		this.gl = rp.gl;
		this.program = createProgram(this.gl, vsSource, fsSource);

		// Get locations
		this.locations = {};
		this.types = {};

		const numUniforms = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
		const numAttributes = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES);

		for (let i = 0; i < numUniforms; i ++) {
			const info = this.gl.getActiveUniform(this.program, i);

			this.locations[info.name] = this.gl.getUniformLocation(this.program, info.name);
			this.types[info.name] = info.type;
		}

		for (let i = 0; i < numAttributes; i ++) {
			const info = this.gl.getActiveAttrib(this.program, i);

			this.locations[info.name] = this.gl.getAttribLocation(this.program, info.name);
			this.types[info.name] = info.type;
		}
	}

	/**
	 * Set a shader uniform variable
	 * @param {String} name - The name of the uniform variable
	 * @param {Object} value - The value you want to set it to
	 */
	setUniform (name, value) {
		this.gl.useProgram(this.program);

        let location = this.locations[name];

        if (!location) return;

        let type = this.types[name];

        switch (type) {
            case this.gl.FLOAT:
                this.gl.uniform1f(location, value);
                break;
            case this.gl.INT:
                this.gl.uniform1i(location, value);
                break;
            case this.gl.FLOAT_VEC2:
                this.gl.uniform2fv(location, value);
                break;
            case this.gl.INT_VEC2:
                this.gl.uniform2iv(location, value);
                break;
            case this.gl.FLOAT_VEC3:
                this.gl.uniform3fv(location, value);
                break;
            case this.gl.INT_VEC3:
                this.gl.uniform3fv(location, value);
                break;
            case this.gl.FLOAT_VEC4:
                this.gl.uniform4fv(location, value);
                break;
            case this.gl.INT_VEC4:
                this.gl.uniform4fv(location, value);
                break;
            case this.gl.FLOAT_MAT3:
                this.gl.uniformMatrix3fv(location, false, value);
                break;
            case this.gl.FLOAT_MAT4:
                this.gl.uniformMatrix4fv(location, false, value);
                break;
            default:
                console.error(`Unknown input type: ${value.constructor.name}!`);
        }
	}
}
