var gl; // A global variable for the WebGL context.
var g_points = []; // The array for a mouse press.
var g_colors = []; // The array to store the color of a point.

var VSHADER_SOURCE = // Vertex shader program
"attribute vec4 a_Position;\n" +
"attribute float a_PointSize;\n" +
"void main() {\n" + 
"   gl_Position = a_Position;\n" + 
"   gl_PointSize = a_PointSize;\n" +
"}\n";

var FSHADER_SOURCE = // Fragment shader program
"precision mediump float;\n" +
"uniform vec4 u_FragColor;\n" +
"void main() {\n" +
"   gl_FragColor = u_FragColor;\n" +
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
    
    var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    if (a_PointSize < 0) {
        console.log("Failed to get the storage location of a_PointSize");
        return;
    }
    
    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (u_FragColor < 0) {
        console.log("Failed to get the storage location of u_FragColor");
        return;
    }
	
	// Register function (event handler) to be called on a mouse press.
	canvas.onmousedown = function (ev) { click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor); };
    
    gl.clearColor(0.2, 0.2, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor)
{
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    
    g_points.push([x, y]);
    
    if (x >= 0.0 && y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]); // red
    } else if (x < 0.0 && y < 0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0]); // green
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0]); // white
    }
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    for (var i = 0; i < g_points.length; ++i) {
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
        gl.vertexAttrib1f(a_PointSize, (i+1) * 2.0);
        gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}