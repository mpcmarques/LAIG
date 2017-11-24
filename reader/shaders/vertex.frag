#ifdef GL_ES
precision highp float;
#endif

uniform float deltaT;

void main() {
		gl_FragColor =  vec4(0.0,0.0,1, deltaT);
}