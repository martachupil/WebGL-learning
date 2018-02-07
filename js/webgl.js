let initWebGL = () => {
    let VSText;
    let FSText;

    fetch('/shaders/vertexShader.glsl')
        .then(r => r.text())
        .then((result) => {
            VSText = result;
            return fetch('/shaders/fragmentShader.glsl');
        })
        .then(r => r.text())
        .then((result) => {
        FSText = result;
        return StartWebGL(VSText, FSText);
        })
        .catch((error) => {
          console.error('Error with loading ' + error);
      }) 
}

let StartWebGL = (vertexShaderText, fragmentShaderText) => {
    let canvas = document.getElementById('webgl-canvas');
    let gl = canvas.getContext('webgl');

    if (!gl) {
        console.error('No Support WebGL');
        return;
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

//gl.shaderSource(vertexShader,);

};

document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
});