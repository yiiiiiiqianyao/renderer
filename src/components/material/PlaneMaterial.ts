import BasicMaterial from './BasicMaterial';

export default class PlaneMaterial extends BasicMaterial {
  /**
   * 返回顶点着色器代码
   * @returns
   */
  getVShader() {
    return `
        uniform mat4 u_projMatrix;
        uniform mat4 u_viewMatrix;
        uniform mat4 u_modelMatrix;
    
        attribute vec4 a_Position;
        attribute vec2 a_TextCoord;
        varying vec2 v_uv;
        void main(){
            v_uv = a_TextCoord;
    
            gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;
       
        }
    `;
  }

  getFShader() {
    let firstLine = 'precision mediump float;\n';
    let gl_FragColorLine = 'gl_FragColor = vec4(u_color, u_opacity);\n';

    let unifromLines = ['uniform float u_opacity;\n', 'uniform vec3 u_color;'];
    if (this.map) {
      this.imgLoading = true;
      unifromLines.push('uniform sampler2D u_Sampler;\n');

      this.on('loadImage', ({ texture, img }) => {
        this.gl.useProgram(this.program);

        // TODO: cache texture
        this.texture = texture;

        this.gl.activeTexture(this.gl.TEXTURE0); // 激活0号纹理单元
        this.texture && this.gl.bindTexture(this.gl.TEXTURE_2D, texture); // 绑定纹理单元

        var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
        this.gl.uniform1i(u_Sampler, 0);

        this.imgLoading = false;

        this.scene && this.scene.renderScene();
      });
      gl_FragColorLine = 'gl_FragColor = texture2D(u_Sampler, v_uv);\n';
    }
    // TODO: 拼装 shader
    const shader =
      firstLine +
      unifromLines.join('') +
      `
          varying vec2 v_uv;
          void main(){
            ${gl_FragColorLine}
            gl_FragColor.a *= u_opacity;
          }
          `;
    return shader;
  }
}
