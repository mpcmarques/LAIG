#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;

void main() {
		gl_FragColor =  vec4(0.5,0.7,1, timeFactor);
}