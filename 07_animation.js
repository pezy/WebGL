var VSHADER_SOURCE = // Vertex shader program
"attribute vec4 a_Position;\n" +
"uniform mat4 u_ModelMatrix;\n" +
"void main() {\n" + 
"   gl_Position = u_ModelMatrix * a_Position;\n" + 
"}\n";

var FSHADER_SOURCE = // Fragment shader program
"precision mediump float;\n" +
"uniform vec4 u_FragColor;\n" +
"void main() {\n" +
"   gl_FragColor = u_FragColor;\n" +
"}\n";

var ANGLE_STEP = 45.0;
var MOVE_OFFSET = 0.35;

function init() {
    var canvas = document.getElementById("webgl");
    
    var gl = initWebGL(canvas);
    
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL.');
        return;
    }
    
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to create shader program.');
        return;
    }
    
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    
    gl.clearColor(0.2, 0.2, 0.4, 1.0);
    
    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (u_FragColor < 0) {
        console.log("Failed to get the storage location of u_FragColor");
        return;
    }
    
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    
    var currentAngle = 0.0;
    var modelMatrix = initIndentity();
    
    var tick = function() {
        currentAngle = animate(currentAngle);
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);
    };
    tick();
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;
    
    var vartexBuffer = gl.createBuffer();
    if (!vartexBuffer) {
        console.log("Failed to create the buffer object. ");
        return -1;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vartexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    
    return n;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    modelMatrix = rotateAroundZAxis(modelMatrix, currentAngle);
    modelMatrix = translate(modelMatrix, MOVE_OFFSET, 0.0, 0.0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_last = Date.now();
function animate(angle) {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
}

function fast() {
  ANGLE_STEP += 10; 
}

function slow() {
  ANGLE_STEP -= 10; 
}

function right() {
    MOVE_OFFSET += 0.1;
}

function left() {
    MOVE_OFFSET -= 0.1;
}