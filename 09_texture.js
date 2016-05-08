var VSHADER_SOURCE = // Vertex shader program
"attribute vec4 a_Position;\n" +
"attribute vec2 a_TexCoord;\n" +
"varying vec2 v_TexCoord;\n" +
"void main() {\n" + 
"   gl_Position = a_Position;\n" +
"   v_TexCoord = a_TexCoord;\n" + 
"}\n";

var FSHADER_SOURCE = // Fragment shader program
"precision mediump float;\n" +
"uniform sampler2D u_Sampler0;\n" +
"uniform sampler2D u_Sampler1;\n" +
"varying vec2 v_TexCoord;\n" +
"void main() {\n" +
"   vec4 color0 = texture2D(u_Sampler0, v_TexCoord);\n" +
"   vec4 color1 = texture2D(u_Sampler1, v_TexCoord);\n" +
"   gl_FragColor = color0 * color1;\n" +
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
    
    if (!initTextures(gl, n)) {
        console.log('Failed to intialize the texture.');
        return;
    }
}

function initVertexBuffers(gl) {
    var verticesTexCoords = new Float32Array([
        -0.5,  0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
         0.5,  0.5, 1.0, 1.0,
         0.5, -0.5, 1.0, 0.0
    ]);
    var n = 4;
    
    var vartexTexCoordBuffer = gl.createBuffer();
    if (!vartexTexCoordBuffer) {
        console.log("Failed to create the buffer object. ");
        return -1;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vartexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
    
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);
    
    var a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");
    if (a_TexCoord < 0) {
        console.log("Failed to get the storage location of a_Color");
        return -1;
    }
    
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);
    
    return n;
}

function initTextures(gl, n) {
    var texture0 = gl.createTexture();
    var texture1 = gl.createTexture();
    if (!texture0 || !texture1) {
        console.log('Failed to create the texture object');
        return false;
    }

    // Get the storage location of u_Sampler
    var u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    var u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler0 || !u_Sampler1) {
        console.log('Failed to get the storage location of u_Sampler0 or u_Sampler1');
        return false;
    }
    
    var image0 = new Image();
    var image1 = new Image();
    if (!image0 || !image1) {
        console.log('Failed to create the image object');
        return false;
    }
    // Register the event handler to be called on loading an image
    image0.onload = function(){ loadTexture(gl, n, texture0, u_Sampler0, image0, 0); };
    image1.onload = function(){ loadTexture(gl, n, texture1, u_Sampler1, image1, 1); };
    // Tell the browser to load an image
    image0.src = 'resources/cat.jpg';
    image1.src = 'resources/circle.gif';

    return true;
}

var g_texUnit0 = false, g_texUnit1 = false;
function loadTexture(gl, n, texture, u_Sampler, image, texUnit) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    
    if (texUnit === 0) {
        gl.activeTexture(gl.TEXTURE0);
        g_texUnit0 = true;
    } else {
        gl.activeTexture(gl.TEXTURE1);
        g_texUnit1 = true;
    }
    
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // Set the texture unit 0 to the sampler
    gl.uniform1i(u_Sampler, texUnit);

    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.clearColor(0.2, 0.2, 0.4, 1.0);

    if (g_texUnit0 && g_texUnit1) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle   
    }
}