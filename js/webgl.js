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

gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fragmentShaderText);

gl.compileShader(vertexShader);

if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Error', gl.getShaderInfoLog(vertexShader));
}

gl.compileShader(fragmentShader);

if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Error', gl.getShaderInfoLog(fragmentShader));
}

let program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.validateProgram(program);

 if(!gl.getProgramParameter(parameter, gl.VALIDATE_STATUS)) {
    console.log('Error', gl.getProgramInfoLog(program));

    return;
  }

  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  let vertexArray = [
      0.0, 0.5,
      0.5, -0.5,
      -0.5, -0.5
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);

  let positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');

  gl.vertexAttribPointer(
      positionAttribLocation,
      2,
      gl.FLOAT,
      gl.FALSE,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0 * Float32Array.BYTES_PER_ELEMENT
  );
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.clearColor(0.75, 0.9, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

};

document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
});