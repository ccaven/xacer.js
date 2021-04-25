#version 300 es
precision highp float;

in vec4 a_position;
in vec2 a_texcoord;
in vec3 a_normal;

uniform mat4 u_model;
uniform mat4 u_projection;

out vec4 v_position;
out vec2 v_texcoord;
out vec3 v_normal;

void main () {

    v_position = u_projection * u_model * a_position;
    v_texcoord = a_texcoord;
    v_normal = a_normal;

    gl_Position = v_position;

}