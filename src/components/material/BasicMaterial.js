import Material from "./Material"
import Color from "../object/Color"

export default class BasicMaterial extends Material{
    constructor(props) {
        super(props)
        this.gl = props.gl
        this.color = Color.isColor(props?.color) ?props?.color : new Color(props?.color)
        this.map = props?.map || undefined

        this.init()
    }

    async init() {
        if(this.map) {
            
            let { succeed, img } = await this.loadImage()
            if(succeed) {
                this.image = img
                this.initTexture()
            }
        }   
    }

    initTexture() {
        this.texture = this.gl.createTexture()
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1) // 对纹理图像进行 Y 轴反转 - 点精灵不需要翻转
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR); 
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);

        this.emit('loadImage', {
            texture: this.texture,
            img: this.image
        })
    }

    loadImage() {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.src = this.map
            img.crossOrigin = 'none'
            img.onload = () => {
                resolve({
                    succeed: true,
                    img
                })
                
            }
            img.onerror = (err) => {
                reject({
                    succeed: false,
                    img
                })
            }
        })
    }

    destroy() {

    }
}