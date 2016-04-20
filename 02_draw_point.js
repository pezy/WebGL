var gl; // A global variable for the WebGL context.

var VSHADER_SOURCE = // Vertex shader program
"attribute vec4 a_Position;\n" +
"attribute float a_PointSize;\n" +
"void main() {\n" + 
"   gl_Position = a_Position;\n" + 
"   gl_PointSize = a_PointSize;\n" +
"}\n";

var FSHADER_SOURCE = // Fragment shader program
"void main() {\n" +
"   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
"}\n";

function initWebGL(canvas) {
    gl = null;
    
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
        
    }
    
    if (!gl)
    {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }
}

function initShaders()
{
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(vertexShader));
    }
    
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, FSHADER_SOURCE);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(fragmentShader));
    }
    
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }
    
    gl.useProgram(shaderProgram);
    gl.program = shaderProgram;
}

function init() {
    var canvas = document.getElementById("webgl");
    
    initWebGL(canvas);
    
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL.');
        return;
    }
    
    initShaders();
    
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
    }
    
    gl.vertexAttrib3f(a_Position, 0.1, 0.2, 0.3);
    
    var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    if (a_PointSize < 0) {
        console.log("Failed to get the storage location of a_PointSize");
        return;
    }
    
    gl.vertexAttrib1f(a_PointSize, 5.0);
    
    gl.clearColor(0.2, 0.2, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.POINTS, 0, 1);
}