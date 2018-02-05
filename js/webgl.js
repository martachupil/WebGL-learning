let initWebGL = () => {
    let VSText;
    let FSText;

    loadTextResource('/shaders/vertexShader.glsl')
        .then((result) => {
            VSText = result;
            return loadTextResource('/shaders/fragmentShader.glsl');
        })
        .then((result) => {
        FSText = result;
        return StartWebGL(VSText, FSText);
        })
        .catch((error) => {
          console.warn('Error with loading ' + error);
      }) 
}

let startWebGL = (vertexShaderText, fragmentShaderText) => {
    let canvas = document.getElementById('webgl-canvas');
    let gl = canvas.getContext('webgl');

    if (!gl) {
        console.warn('No Support WebGL');
        return;
    }

    console.log(gl);
};

document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
});