import { mat4 } from 'gl-matrix'

export default class Group {
    constructor(props) {
        this.gl = props.gl
        this.position = props?.position || [0, 0, 0]
        this.rotation = props?.rotation || [0, 0, 0]
        this.scale = props?.scale || [1, 1, 1]
        
        this.childrens = []

        this.setModelMatrixs()
    }

    setModelMatrixs() {
        this.setTranslete(this.position)
        this.setRotateMatrix()
        this.setScaleMatrix()
    }

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
}