import BasicMaterial from './BasicMaterial';

export default class BoxMaterial extends BasicMaterial {
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
            attribute vec4 a_Color;

            varying vec4 v_Color;
            void main(){
                v_Color = a_Color;

                gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;
           
            }
        `;
  }

  /**
   * 返回片元着色器代码
   * @returns
   */
  getFShader() {
    return `
            #ifdef GL_ES
            precision mediump float;
            #endif
            varying vec4 v_Color;
            void main(){
                gl_FragColor = v_Color;
                // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;
  }
}
