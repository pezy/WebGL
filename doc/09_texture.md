## 纹理

### 纹理坐标

值得注意的是，WebGL 的纹理坐标，左下角是原点。一般用 `t`,`s` 来表示。由于图片坐标都是遵循左上角为原点， 故为了保持一致， 通常需要将纹理图像进行翻转，让 `t` 与 `y` 方向相同。

```javascript
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
```

### 配置与加载纹理

```javascript
// 1. 创建纹理对象
var texture = gl.createTexture();
// 2. 取得取样器
var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
// 3. 准备图像
var image = new Image();
image.onload = function() {loadTexture(); }; // 异步执行配置纹理
image.src = "resource/cat.png";
// in loadTexture:
// 4. 激活纹理单元
gl.activeTexture(gl.TEXTURE0); // 0 ~ 8
// 5. 绑定纹理对象
gl.bindTexture(gl.TEXTURE_2D, texture);
// 6. 配置纹理参数
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// 7. 配置纹理图像
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
// 8. 将纹理传给 shader
gl.uniformli(u_Sampler, 0); // 0 - 0 号纹理单元
```

和之前的 [顶点缓冲区](04_draw_triangle.md)一样，配置 texture 对象，并不是直接对 texture 对象进行操作，而是通过绑定到 `gl.TEXTURE_2D` 来操作；而 texture 对象和纹理单元的联系呢？**当前激活的**是哪个单元，texture 对象就绑定到哪个单元。最后纹理单元再通过采样器( u_Sampler) 来传入到 shader 中。

