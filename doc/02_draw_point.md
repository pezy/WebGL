## click point notes

- `WebGL: INVALID_VALUE: getAttribLocation: no object or object deleted`

This error cause by `var a_Position = gl.getAttribLocation(gl.program, "a_Position");`.
and solution is adding `gl.program = shaderProgram` at the last of `initShaders()`.

