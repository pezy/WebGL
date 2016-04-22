// glut.js (c) 2016 pezy

/**
 * Get WebGL context
 * @param canvas <canvas> element
 * @returns the rendering context for WebGL
 */

function initWebGL(canvas) {
    var gl = null;
    
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {}
    
    if (!gl)
    {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }
    
    return gl;
}

/**
 * Create WebGL program.
 * @param gl WebGL context
 * @param vshader a vertex shader program(string)
 * @param fshader a fragment shader program(string)
 * @return true, if the program object was created and successfully made current.
 */

function initShaders(gl, vshader, fshader)
{
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vshader);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(vertexShader));
        return false;
    }
    
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fshader);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(fragmentShader));
        return false;
    }
    
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Unable to initialize the shader program.");
        return false;
    }
    
    gl.useProgram(shaderProgram);
    gl.program = shaderProgram;
    
    return true;
}