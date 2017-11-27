attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition * (timeFactor * 0.1 + 0.9), 1.0);

	vTextureCoord = aTextureCoord;
}

