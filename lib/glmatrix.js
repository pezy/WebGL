// glmatrix.js (c) 2016 pezy

/**
 * get an indentity matrix
 * @return indentity matrix
 */

function initIndentity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

/**
 * matrix * point
 * @param matrix
 * @param point
 * @return point
 */
function multiplyMatrixAndPoint(matrix, point) {
    var r0c0 = matrix[ 0], r1c0 = matrix[ 1], r2c0 = matrix[ 2], r3c0 = matrix[ 3];
    var r0c1 = matrix[ 4], r1c1 = matrix[ 5], r2c1 = matrix[ 6], r3c1 = matrix[ 7];
    var r0c2 = matrix[ 8], r1c2 = matrix[ 9], r2c2 = matrix[10], r3c2 = matrix[11];
    var r0c3 = matrix[12], r1c3 = matrix[13], r2c3 = matrix[14], r3c3 = matrix[15];
    
    var x = point[0], y = point[1], z = point[2], w = point[3];
    
    var rstX = r0c0 * x + r0c1 * y + r0c2 * z + r0c3 * w;
    var rstY = r1c0 * x + r1c1 * y + r1c2 * z + r1c3 * w;
    var rstZ = r2c0 * x + r2c1 * y + r2c2 * z + r2c3 * w;
    var rstW = r3c0 * x + r3c1 * y + r3c2 * z + r3c3 * w;
    
    return [rstX, rstY, rstZ, rstW];
}

/**
 * matrix * matrix
 * @param matrixA
 * @param matrixB
 * @return matrix
 */
function multiplyMatrices(matrixA, matrixB) {
    var column0 = [matrixB[ 0], matrixB[ 1], matrixB[ 2], matrixB[ 3]];
    var column1 = [matrixB[ 4], matrixB[ 5], matrixB[ 6], matrixB[ 7]];
    var column2 = [matrixB[ 8], matrixB[ 9], matrixB[10], matrixB[11]];
    var column3 = [matrixB[12], matrixB[13], matrixB[14], matrixB[15]];
    
    var rst0 = multiplyMatrixAndPoint(matrixA, column0);
    var rst1 = multiplyMatrixAndPoint(matrixA, column1);
    var rst2 = multiplyMatrixAndPoint(matrixA, column2);
    var rst3 = multiplyMatrixAndPoint(matrixA, column3);
    
    return [
        rst0[0], rst0[1], rst0[2], rst0[3],
        rst1[0], rst1[1], rst1[2], rst1[3],
        rst2[0], rst2[1], rst2[2], rst2[3],
        rst3[0], rst3[1], rst3[2], rst3[3]
    ];
}

/**
 * make translate
 * @param matrix
 * @param dx, dy, dz
 * @return translated matrix
 */
function translate(matrix, dx, dy, dz) {
    var translationMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        dx, dy, dz, 1.0
    ];
    return multiplyMatrices(translationMatrix, matrix);
}

/**
 * make scaling
 * @param matrix
 * @param sx, sy, sz
 * @return scaled matrix
 */
function scale(matrix, sx, sy, sz) {
    var scaleMatrix = [
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    return multiplyMatrices(scaleMatrix, matrix);
}

/**
 * make rotation
 * @param matrix
 * @param angle
 * @return rotated matrix
 */
function rotateAroundZAxis(matrix, angle) {
    var radian = Math.PI * angle / 180.0;
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    
    var rotationMatrix =  [
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];  
    
    return multiplyMatrices(rotationMatrix, matrix); 
}