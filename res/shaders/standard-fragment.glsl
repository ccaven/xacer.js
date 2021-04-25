#version 300 es
precision highp float;

in vec4 v_position;
in vec2 v_texcoord;
in vec3 v_normal;

uniform sampler2D u_diffuse_map;
uniform sampler2D u_normal_map;
uniform sampler2D u_light_map;

out vec4 o_color;

void main () {

    o_color = sampler2D(u_diffuse_map, v_texcoord);

}