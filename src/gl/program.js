import Shader from './shader.js';

export default class Program {
	constructor(gl) {
		let vs = `
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
		`.trim();

		let fs = `
			#version 300 es

			precision highp float;

			in vec2 vTextureCoord;

			out vec4 outColor;

			const vec3 color = vec3(0.0, 0.0, 1.0);

			void main() {
				outColor = vec4(color * (max(1.0, 0.0) + 0.3), 1.0);
			}
		`.trim();

		this.gl = gl;
		fs = new Shader(gl, gl.FRAGMENT_SHADER, fs);
		vs = new Shader(gl, gl.VERTEX_SHADER, vs);

		const program = gl.createProgram();

		gl.attachShader(program, fs.shader);
		gl.attachShader(program, vs.shader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Link failed: ' + gl.getProgramInfoLog(program));
			console.error('vs info-log: ' + gl.getShaderInfoLog(vs.shader));
			console.error('fs info-log: ' + gl.getShaderInfoLog(fs.shader));
		}

		this.program = program;
	}

	getAttribLocation(attribName) {
		return this.gl.getAttribLocation(this.program, attribName);
	}

	getActiveAttrib(index) {
		return this.gl.getActiveAttrib(this.program, index);
	}

	getUniformLocation(uniformName) {
		return this.gl.getUniformLocation(this.program, uniformName);
	}

	getActiveUniform(index) {
		return this.gl.getActiveUniform(this.program, index);
	}

	getProgramParameter(parameter) {
		return this.gl.getProgramParameter(this.program, parameter);
	}

	use() {
		this.gl.useProgram(this.program);
	}
}