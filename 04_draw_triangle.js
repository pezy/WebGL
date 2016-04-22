var VSHADER_SOURCE = // Vertex shader program
"attribute vec4 a_Position;\n" +
"void main() {\n" + 
"   gl_Position = a_Position;\n" + 
"}\n";

var FSHADER_SOURCE = // Fragment shader program
"precision mediump float;\n" +
"uniform vec4 u_FragColor;\n" +
"void main() {\n" +
"   gl_FragColor = u_FragColor;\n" +
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
    
    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (u_FragColor < 0) {
        console.log("Failed to get the storage location of u_FragColor");
        return;
    }
    
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
	
	gl.clearColor(0.2, 0.2, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.TRIANGLES, 0, n);
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