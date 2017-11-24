attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
uniform float deltaT;

void main() {
	gl_Position =  uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*deltaT*0.1, 1.0);
}