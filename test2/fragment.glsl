#version 300 es
precision highp float;

in vec2 v_position;

uniform vec3 u_camera;
uniform mat4 u_view;
uniform float u_time;

uniform vec2 u_resolution;

uniform sampler2D u_disk;

out vec4 o_color;

#define ANTI_ALIASING 0

#define RING_MIN 1.0
#define RING_MAX 4.0

// Noise
// https://github.com/ashima/webgl-noise/blob/master/src/noise3D.glsl
vec3 mod289(vec3 x) {
	return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
	return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
	return mod289(((x*34.0)+1.0)*x);
}
vec4 taylorInvSqrt(vec4 r) {
	return 1.79284291400159 - 0.85373472095314 * r;
}
float snoise(vec3 v) {
	const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
	const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

	// First corner
	vec3 i  = floor(v + dot(v, C.yyy) );
	vec3 x0 =   v - i + dot(i, C.xxx) ;

	// Other corners
	vec3 g = step(x0.yzx, x0.xyz);
	vec3 l = 1.0 - g;
	vec3 i1 = min( g.xyz, l.zxy );
	vec3 i2 = max( g.xyz, l.zxy );

	vec3 x1 = x0 - i1 + C.xxx;
	vec3 x2 = x0 - i2 + C.yyy;
	vec3 x3 = x0 - D.yyy;

	// Permutations
	i = mod289(i);
	vec4 p = permute( permute( permute(
			i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
		+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
		+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

	// Gradients: 7x7 points over a square, mapped onto an octahedron.
	// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
	float n_ = 0.142857142857; // 1.0/7.0
	vec3  ns = n_ * D.wyz - D.xzx;

	vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

	vec4 x_ = floor(j * ns.z);
	vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

	vec4 x = x_ *ns.x + ns.yyyy;
	vec4 y = y_ *ns.x + ns.yyyy;
	vec4 h = 1.0 - abs(x) - abs(y);

	vec4 b0 = vec4( x.xy, y.xy );
	vec4 b1 = vec4( x.zw, y.zw );

	vec4 s0 = floor(b0)*2.0 + 1.0;
	vec4 s1 = floor(b1)*2.0 + 1.0;
	vec4 sh = -step(h, vec4(0.0));

	vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
	vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

	vec3 p0 = vec3(a0.xy,h.x);
	vec3 p1 = vec3(a0.zw,h.y);
	vec3 p2 = vec3(a1.xy,h.z);
	vec3 p3 = vec3(a1.zw,h.w);

	//Normalise gradients
	vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
	p0 *= norm.x;
	p1 *= norm.y;
	p2 *= norm.z;
	p3 *= norm.w;

	// Mix final noise value
	vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
	m = m * m;
	return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
			dot(p2,x2), dot(p3,x3) ) );
}

// Raymarch variables
const int MAX_STEPS = 500;
const float EPSILON = 0.0001;

float ringDE (vec3 p, float ir, float or) {
	vec3 c = p;
	float m = length(p);
	m = clamp(m, ir, or);
	c *= m / max(length(c), 0.0001);
	c.z = 0.0;
	return length(p - c) * 0.99;
}

float ringDE2 (vec3 p) {

	vec3 c = p;

	// Constrain to plane
	c.z = 0.0;

	// Constrain circle
	float l = length(c.xy);
	l = clamp(l, RING_MIN, RING_MAX);
	c.xy = l * normalize(c.xy);

	return length(p - c) - 0.0001;
}

float DE (vec3 p) {

	float d = length(p) - 0.5;

	d = min(d, ringDE2(p));

	return d;

}

vec4 trace (vec2 uv) {

	vec3 p = u_camera;

	vec3 v = vec3(uv * 2.0 - 1.0, 0.8);

	v.xy *= u_resolution.xy / u_resolution.xx;

	v = normalize(mat3(u_view) * v);

	vec3 initialV = v;

	float m = 0.0;
	vec4 diskColor = vec4(0, 0, 0, 0.0);

	for (int i = 0; i < MAX_STEPS; i ++) {
		// Get length
		float d = DE(p);

		// Integrate


		for (int j = 0; j < 5; j ++) {
			float dt = d / 5.0 / length(v);
			vec3 a = -1.5 * p * pow(length(p), -6.0);
			p += v * dt;
			v += a * dt;
		}

		//p += v * d;

		// Determine if it's close enough
		if (d < EPSILON) {
			// Hit black hole

			if (length(p) <= 0.55) {
				m = 0.0;
				break;
			}
			else {

				// Hit disk
				float l = length(p.xy);
				float k = (l - RING_MIN) / (RING_MAX - RING_MIN);

				float a = -atan(p.y, p.x) / 3.1415926 * 0.5 + 0.5;

				//a += u_time

				vec4 c = texture(u_disk, vec2(a, k));

				// velocity of disk, in units/second
				vec3 velocityVector = vec3(p.y, -p.x, 0);

				// Comparison of velocity to the ray direction
				float shiftAmount = dot(velocityVector, normalize(v));

				shiftAmount = (shiftAmount > 0.0 ? 1.0 : -1.0) * (1.0 - exp(-abs(shiftAmount) * 0.1));

				shiftAmount = clamp(shiftAmount, -1.0, 1.0);

				// c.rgb = vec3(velocityVector / RING_MAX * 0.5 + 0.5);



				// shift red by subtracting green
				// effect is that gets more red
				float multiplier = 4.0;
				if (shiftAmount > 0.0) {
					c.g *= clamp(1.0 - shiftAmount * multiplier * 0.5, 0.0, 1.0);
					c.b *= clamp(1.0 - shiftAmount * multiplier, 0.0, 1.0);
				}

				// shift blue by adding blue :bigbrain:
				// effect is that it gets more white
				if (shiftAmount < 0.0) {
					c.r *= clamp(1.0 + shiftAmount * multiplier * 0.5, 0.0, 1.0);
					c.g *= clamp(1.0 + shiftAmount * multiplier * 0.25, 0.0, 1.0);
					//c.b += (1.0 - c.b) * shiftAmount;
				}


				//float transparency = 1.0;
				// if (diskColor.a > 100.0) break;
				float transparency = clamp(length(c.rg), 0.0, 1.0);

				diskColor.rgb += c.rgb * exp(-max(diskColor.a, 0.0));
				//diskColor.rgb = vec2(a, k).xxy;


				diskColor.a += transparency;

				// Keep moving
				p.z += 2.0 * EPSILON * (v.z > 0.0 ? 1.0 : -1.0);
			}
		}

		if (d > 125.0) {
			m = 1.0;
			break;
		}

	}

	// skybox color
	v = normalize(v);

	float sn = snoise(v * 50.0);
	vec3 skyboxColor = vec3((sn - min(sn, 0.8)) * 5.0);

	vec3 endColor = (m * skyboxColor) * clamp(exp(-diskColor.a), 0.0, 1.0) + diskColor.rgb;

	endColor = clamp(endColor, 0.0, 1.0);

	return vec4(endColor, 1);
}

void main () {
	vec2 uv = v_position;
	vec4 a = trace(uv);

	#if ANTI_ALIASING == 1
		vec2 uv2 = v_position + vec2(0.5, 0.5) / u_resolution.xy;
		vec2 uv3 = v_position - vec2(0.5, 0.5) / u_resolution.xy;
		vec2 uv4 = v_position + vec2(0.5, -0.5) / u_resolution.xy;
		vec2 uv5 = v_position - vec2(0.5, -0.5) / u_resolution.xy;

		vec4 b = trace(uv2);
		vec4 c = trace(uv3);
		vec4 d = trace(uv4);
		vec4 e = trace(uv5);

		o_color = a * 0.5 + (b + c + d + e) * 0.125;
	#else
		o_color = a;
	#endif
}