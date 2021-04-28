/**
 * Type of shader that is used, vertex shader or fragment shader
 * @typedef {("fs"|"vs")} ShaderType
 */

/**
 * Type of program
 * @typedef {("simple")} ProgramType
 */

/**
 * Type of a primitive
 * @typedef {("cube")} ObjectType
 */

/**
 * object that contains all the buffer informations
 * @typedef {Object} BufferInfo
 * @property {Number} size size of the each element of the buffer
 * @property {[Number]} data the data needed to make the buffer
 * @property {WebGLBuffer} buffer the actual buffer
 */