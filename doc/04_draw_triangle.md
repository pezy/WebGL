## Draw basic triangle

比起上一个画点的例子, 这个例子略显烦闷, 因为几乎所有的 OpenGL 教材的第一课, 都会出现这个三角形. 对, 没错, 我说的就是[红宝书](https://github.com/pezy/opengl-redbook).



但实际上, 从单独画一个点, 到画三角形, 中间会有大致三个步骤的演化:

1. 首先我们从单点, 想到画多点, 是利用一个全局的数组(如 03_click_point ), 记录鼠标点击的每一个坐标. 然后通过一个循环, 反复给 shader 中传新的位置, 并反复调用 `drawArrays`.
2. 然后我们发现 WebGL 中, 其实有更聪明简单的做法. 但需要理解并应用**缓冲区**的概念(buffer).  缓冲区大致上分为两种: 存具体顶点坐标, 与存顶点序号. 在这个例子中, 我们使用前者. 利用此法, 可绘制三点.
3. 既然多点问题解决, 换成画三角就很简单了, 只需要更改 `drawArrays` 的第一个参数即可.



针对第二部, 我们引入了一个新的概念, 就是如何创建这个顶点坐标缓冲区的问题: 

```js
// 首先是创建缓冲区
var buffer = gl.createBuffer();
// 绑定缓冲区到 GL -> 可以理解为 SetBufferToGL
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 绑定数据到 GL 的缓冲区 -> 可以理解为 SetDataToGLBuffer
var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 最后一个参数指定数据运用方式
// 传参到 shader -> 可以理解为 SetGLBufferToShader
gl.vertexAttribPointer(a_Position, 2, gl.FlOAT, false, 0, 0); // 起始位置, 步长, 类型, 是否归一化, 起始偏移量, 步偏移量
// 打开启用 shader attribute 的开关.
gl.enableVertexAttribArray(a_Position);
```

从创建, 到最后生效. 数据的传递过程实际是: data -> GL -> shader 的顺序. 而无论是哪里的传递, 都是"先铺路, 后走数". 然后, 要记住, 不必走回头路. 譬如数据已经在 GL 的 Array buffer 中了, 那么往 shader 中传的过程, 就与最早的数据无关了.