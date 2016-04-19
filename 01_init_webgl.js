var gl; // A global variable for the WebGL context.

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

function init() {
    var canvas = document.getElementById("webgl");
    
    initWebGL(canvas);
    
    if (gl) {
        gl.clearColor(0.2, 0.2, 0.4, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}