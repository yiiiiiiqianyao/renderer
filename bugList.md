- 当加载贴图纹理的时候，不打开 animate 重复渲染，在单次渲染的时候会出现渲染错误，但是在 scene 的 renderScene 当法中取消 this.gl.clear(this.gl.COLOR_BUFFER_BIT) 就不会有问题 ？？？
    fixed: 在执行 clear 的时候，需要同时清除深度缓冲，否则后续绘制中无法写入
