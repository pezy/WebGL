## 光栅化

光栅化的原理, 借助以前的像素游戏, 更方便理解. OpenGL 的光栅化过程, 如下图所示:

![rasterization](img/rasterization.png)



在我们的[例子](../08_rasterization.html)里面, 给定了三个点的颜色(红绿蓝三原色), 光栅化最直接的效果就是, 对颜色进行了插值(interpolation process).

----

另外一个值得一提的 point 在于:

颜色, 是借助 vertex shader 传入 fragment shader 的, 中间的枢纽很重要. 需用 shader 中的 `varying` 变量实现. 在 vertex shader 中对其进行赋值, 在 fragment shader 中声明一个一模一样的变量即可直接使用.

实际上这两个 shader 间的传递过程, 正是光栅化过程, 也恰是**内插**的过程. 