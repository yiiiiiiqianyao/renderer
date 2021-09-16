import { mat4, vec3 } from 'gl-matrix'
import { createProgram, bindAttriBuffer, bindUnifrom4fv } from '../../utils/gl'
export default class Plane {
    constructor(props) {

        this.gl = props.gl
        this.camera = props.camera
       
        this.width = 1
        this.height = 0.5
        this.position = props?.position || [0, 0, 0]
        this.rotation = [0, 0, 0]

        this.init()
    }

    init() {
        this.program = createProgram(this.gl, this.getRectVSHADER(), this.getRectFSHADER())
        this.gl.useProgram(this.program)

        var rectVertices = new Float32Array([ // 将纹理 st/uv 映射到顶点坐标
            -this.width/2, this.height/2,   //左上角
            -this.width/2, -this.height/2,  //左下角
            this.width/2, this.height/2,	 //右上角
            this.width/2, -this.height/2,   //右下角
        ])
        
        var rectUvs = new Float32Array([ // rect uvs
            0.0, 1.0,
            0.0, 0.0,
            1.0, 1.0,
            1.0, 0.0
        ])
        var FSIZE = rectVertices.BYTES_PER_ELEMENT

        this.modelMatrix = mat4.create()
        this.setMatrixs()

        bindAttriBuffer(this.gl, 'a_Position', rectVertices, 2, this.program)

        bindAttriBuffer(this.gl, 'a_TextCoord', rectUvs, 2, this.program)
        
    }

    setModelMatrix() {
        
        mat4.translate(this.modelMatrix, this.modelMatrix, this.position)
    }

    /**
     * 设置矩阵
     */
    setMatrixs() {
        this.projMatrix = this.camera.getPerspectiveMatrix()
        bindUnifrom4fv(this.gl, 'u_projMatrix', this.projMatrix, this.program)

        this.viewMatrix = this.camera.getViewMatrix()
        bindUnifrom4fv(this.gl, 'u_viewMatrix',  this.viewMatrix, this.program)

        this.setModelMatrix()
        bindUnifrom4fv(this.gl, 'u_modelMatrix', this.modelMatrix, this.program)
    }

    draw() {
        this.gl.useProgram(this.program)
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
    }

    getRectVSHADER(){
        return `
            uniform mat4 u_projMatrix;
            uniform mat4 u_viewMatrix;
            uniform mat4 u_modelMatrix;

            attribute vec4 a_Position;
            attribute vec2 a_TextCoord;
            varying vec2 v_TexCoord;
            void main(){
                v_TexCoord = a_TextCoord;

                gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;
           
            }
        `
    }
    getRectFSHADER(){
        return `
            precision mediump float;
            varying vec2 v_TexCoord;
            void main(){
                gl_FragColor =  vec4(v_TexCoord, 0.0, 1.0);
            }
        `
    }

    


}