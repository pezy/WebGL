var VSHADER_SOURCE = // Vertex shader program
"attribute vec4 a_Position;\n" +
"attribute vec4 a_Color;\n" +
"varying vec4 v_Color;\n" +
"void main() {\n" + 
"   gl_Position = a_Position;\n" +
"   v_Color = a_Color;\n" + 
"}\n";

var FSHADER_SOURCE = // Fragment shader program
"precision mediump float;\n" +
"varying vec4 v_Color;\n" +
"void main() {\n" +
"   gl_FragColor = v_Color;\n" +
"}\n";

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
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    var verticesColor = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0
    ]);
    var n = 3;
    
    var vartexBuffer = gl.createBuffer();
    if (!vartexBuffer) {
        console.log("Failed to create the buffer object. ");
        return -1;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vartexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColor, gl.STATIC_DRAW);
    
    var FSIZE = verticesColor.BYTES_PER_ELEMENT;
    
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);
    
    var a_Color = gl.getAttribLocation(gl.program, "a_Color");
    if (a_Color < 0) {
        console.log("Failed to get the storage location of a_Color");
        return -1;
    }
    
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    
    return n;
}