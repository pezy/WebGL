##  translation, rotation, scaling

1. translation

   ```javascript
   x' = x + dx;
   y' = y + dy;
   z' = z + dz;
   ```

   $$
   \begin{bmatrix}
    x' \\ y' \\ z' \\ 1
   \end{bmatrix} 
   =
   \begin{bmatrix}
   1 & 0 & 0 & dx \\
   0 & 1 & 0 & dy \\
   0 & 0 & 1 & dz \\
   0 & 0 & 0 & 1
   \end{bmatrix}
   \times
   \begin{bmatrix}
   x \\ y \\ z \\ 1
   \end{bmatrix} \tag{1}
   $$


2. rotation

   ```javascript
   x' = x * cosB - y * sinB;
   y' = y * cosB + x * sinB;
   z' = z;
   ```

   $$
   \begin{bmatrix}
   x' \\ y' \\ z' \\ 1
   \end{bmatrix}
   = 
   \begin{bmatrix}
   cosB & -sinB & 0 & 0 \\
   sinB & cosB & 0 & 0 \\
   0 & 0 & 1 & 0\\
   0 & 0 & 0 & 1
   \end{bmatrix}
   \times
   \begin{bmatrix}
   x \\ y \\ z \\ 1
   \end{bmatrix} \tag{2}
   $$


3. scaling

   ```javascript
   x' = x * sx;
   y' = y * sy;
   z' = z * sz;
   ```

   $$
   \begin{bmatrix}
   x' \\ y' \\ z' \\ 1
   \end{bmatrix}
   = 
   \begin{bmatrix}
   sx & 0 & 0 & 0 \\
   0 & sy & 0 & 0 \\
   0 & 0 & sz & 0 \\
   0 & 0 & 0 & 1 
   \end{bmatrix}
   \times
   \begin{bmatrix}
   x \\ y \\ z \\ 1
   \end{bmatrix} \tag{3}
   $$

   ​

   ​