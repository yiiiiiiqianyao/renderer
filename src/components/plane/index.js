import { mat4, vec3 } from 'gl-matrix'
// import { createProgram, bindAttriBuffer, bindUnifrom4fv, setUnifrom4fv } from '../../utils/gl'
import * as glUtils from '../../utils/gl'
import { SHADER_PARAMS } from '../../utils/name'
import { setMatrixRotate } from '../../utils/math'
export default class Plane {
    constructor(props) {

        this.gl = props.gl
        this.camera = props.camera
       
        this.width = 1
        this.height = 0.5
        this.position = props?.position || [0, 0, 0]
        this.rotation = props?.rotation || [0, 0, 0]
        this.scale = props?.scale || [1, 1, 1]
        // this.angle = props?.angle || [0, 0, 0]

        this.shaderUnifroms = []

        this.init()
    }

    init() {
        this.program = glUtils.createProgram(this.gl, this.getRectVSHADER(), this.getRectFSHADER())
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

        
        this.setMatrixs()

        let { attr: a_PositionLocation } = glUtils.bindAttriBuffer(this.gl, 'a_Position', rectVertices, 2, this.program)
        let { attr: a_TextCoordLocation } = glUtils.bindAttriBuffer(this.gl, 'a_TextCoord', rectUvs, 2, this.program)
    }

    setModelMatrixs() {
        this.setTransleteMatrix()
        this.setRotateMatrix()
        this.setScaleMatrix()
    }

    // 设置平移
    setTransleteMatrix() {
        this.translateMatrix = mat4.create()
        mat4.translate(this.translateMatrix, this.translateMatrix, this.position)
    }

    setRotateMatrix() {
        this.rotateMatrix = mat4.create()

        setMatrixRotate(this.rotateMatrix, this.rotation[0], 1, 0, 0)
        setMatrixRotate(this.rotateMatrix, this.rotation[1], 0, 1, 0)
        setMatrixRotate(this.rotateMatrix, this.rotation[2], 0, 0, 1)
    }

    setScaleMatrix() {
        this.scaleMatrix = mat4.create()
    }

    getModelMatrix() {
       return mat4.multiply(
            mat4.create(),
            this.scaleMatrix, 
            mat4.multiply(
                    mat4.create(),
                    this.translateMatrix, 
                    this.rotateMatrix)
            )
    }

    updateModelMatrix() {
        mat4.multiply(
            this.modelMatrix, 
            this.scaleMatrix, 
            mat4.multiply(
                mat4.create(), 
                this.translateMatrix, 
                this.rotateMatrix))
    }

    /**
     * 设置网格 Y 轴的旋转角度
     * @param {*} rotateY 
     */
    setRotationY(rotateY) {
        setMatrixRotate(this.rotateMatrix, rotateY, 0, 1, 0)
        this.rotation[1] = rotateY
        this.updateModelMatrix()
    }

    /**
     * 设置网格绕轴旋转
     * @param {*} rotateValues 
     */
    rotate(rotateValues) {
        this.rotation[0] += rotateValues[0]
        this.rotation[1] += rotateValues[1]
        this.rotation[2] += rotateValues[2]

        mat4.rotateX(this.modelMatrix, this.modelMatrix, rotateValues[0])
        mat4.rotateY(this.modelMatrix, this.modelMatrix, rotateValues[1])
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, rotateValues[2])
    }

    /**
     * 设置矩阵
     */
    setMatrixs() {
        this.projMatrix = this.camera.getPerspectiveMatrix()
        let u_projMatrixLocaion = glUtils.bindUnifrom4fv(this.gl, 'u_projMatrix', this.projMatrix, this.program)
        this.addShaderUnifroms(u_projMatrixLocaion, SHADER_PARAMS.UNIFROM, this.projMatrix)

        this.viewMatrix = this.camera.getViewMatrix()
        let u_viewMatrixLocation = glUtils.bindUnifrom4fv(this.gl, 'u_viewMatrix',  this.viewMatrix, this.program)
        this.addShaderUnifroms(u_viewMatrixLocation, SHADER_PARAMS.UNIFROM, this.viewMatrix)

        
        this.setModelMatrixs()
        this.modelMatrix = this.getModelMatrix()
        let u_modelMatrixLocation = glUtils.bindUnifrom4fv(this.gl, 'u_modelMatrix', this.modelMatrix, this.program)
        this.addShaderUnifroms(u_modelMatrixLocation, SHADER_PARAMS.UNIFROM, this.modelMatrix)
    }

    /**
     * 更新 shader 的 uniform 变量的值
     */
    updateShaderUnifroms() {
        this.shaderUnifroms.map(({location, currentDataLocation}) => {
            glUtils.setUnifrom4fv(this.gl, location, currentDataLocation)
        })
    }

    /**
     * 存储当前网格对象的 unifrom 变量
     * @param {*} location 
     * @param {*} type 
     * @param {*} currentDataLocation 
     */
    addShaderUnifroms(location, type, currentDataLocation) {
        this.shaderUnifroms.push({
            location, type, currentDataLocation
        })
    }

    draw() {
        this.gl.useProgram(this.program)

        // console.log(this.modelMatrix)
        this.updateShaderUnifroms()

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