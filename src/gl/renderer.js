import 'https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js';

/* globals mat4 */

export default class Renderer {
	constructor(canvas) {
		const gl = canvas.getContext("webgl2");
		this.gl = gl;
		this.objects = [];
	}

	addObject(obj) {
		obj.init(this.gl);
		this.objects.push(obj);
		this.bindObj(obj);
	}

	bindObj(obj) {
		const gl = this.gl;
		const program = obj.material.program;
		program.use();
		for (const name in obj.buffers) {
			const bufferInfo = obj.buffers[name];
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.buffer);
			gl.vertexAttribPointer(program.getAttribLocation(name), bufferInfo.size, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(name);
		}
	}

	renderObj(obj) {
		const gl = this.gl;
		const program = obj.material.program;
		program.use();

		const fieldOfView = 45 * Math.PI / 180; // in radians
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();

		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		const modelViewMatrix = mat4.create();

		const cubeRotation = 10;

		mat4.translate(modelViewMatrix, modelViewMatrix, [ 0.0, 0.0, -6.0 ]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [ 0, 0, 1 ]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 0.7, [ 0, 1, 0 ]);

		gl.uniformMatrix4fv(this.objects[0].material.program.getUniformLocation('uProjectionMatrix'), false, projectionMatrix);
		gl.uniformMatrix4fv(this.objects[0].material.program.getUniformLocation('uModelViewMatrix'), false, modelViewMatrix);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBuffer);

		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
	}

	render( /* dt */ ) {
		const gl = this.gl;
		gl.clearColor(0, 0, 0, 1);
		gl.clearDepth(1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		for (const obj of this.objects) {
			this.renderObj(obj);
		}
	}
}