
import { mat4 } from 'gl-matrix'
import { setMatrixRotate } from '../../utils/math'
// 场景类 主要是管理场景中所有的网格
export default class Scene {
    constructor(props) {
        this.gl = props.gl
        this.position = props?.position || [0, 0, 0]
        this.rotation = props?.rotation || [0, 0, 0]
        this.scale = props?.scale || [1, 1, 1]
        
        this.childrens = []

        this.setModelMatrixs()
        this.modelMatrix = this.initModelMatrix()
    }

    initModelMatrix() {
        return mat4.multiply(
             mat4.create(),
             this.scaleMatrix, 
             mat4.multiply(
                     mat4.create(),
                     this.translateMatrix, 
                     this.rotateMatrix)
             )
     }

    setModelMatrixs() {
        this.setTranslete(this.position)
        this.setRotateMatrix()
        this.setScaleMatrix()
    }

    // 设置平移
    setTranslete(position) {
        this.translateMatrix = mat4.create()
        mat4.translate(this.translateMatrix, this.translateMatrix, position)
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

    /**
     * 更新模型网格本身的模型矩阵、同时应用父级的模型矩阵
     */
    updateModelMatrix() {
        mat4.multiply(
            this.modelMatrix, 
            this.scaleMatrix, 
            mat4.multiply(
                mat4.create(), 
                this.translateMatrix, 
                this.rotateMatrix))
        let parentMatrix = this?.parent?.modelMatrix || mat4.create()
        mat4.multiply(this.modelMatrix, parentMatrix, this.modelMatrix)
        this.childrens.map(child => child.updateModelMatrix())
    }

    /**
     * 设置网格绕轴旋转
     * @param {*} rotateValues 
     */
    rotate(rotateValues) {
        // 更新网格本身记录的旋转角度
        this.rotation[0] += rotateValues[0]
        this.rotation[1] += rotateValues[1]
        this.rotation[2] += rotateValues[2]

        // 更新旋转矩阵
        mat4.rotateX(this.rotateMatrix, this.rotateMatrix, rotateValues[0])
        mat4.rotateY(this.rotateMatrix, this.rotateMatrix, rotateValues[1])
        mat4.rotateZ(this.rotateMatrix, this.rotateMatrix, rotateValues[2])

        // 更新模型矩阵
        this.updateModelMatrix()
    }

    addChildren(mesh) {
        mesh.setParent(this)
        this.childrens.push(mesh)
    }

    removeMesh(meshId) {
        // this.childrens.
    } 

    renderScene() {
        this.childrens.map(mesh => mesh.draw())
    }
}