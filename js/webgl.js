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

    console.log(gl);
};

document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
});