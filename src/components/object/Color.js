const COLORS = [
    'red',
    'yellow',
    'blue',
    'green',
    'white',
    'black'
]
export default class Color {
    constructor(props) {
        this.type = 'Color'
        if(typeof props === 'string') {
            this.handleStringColor(props)
        } else {
            this.r = props?.r || 1
            this.g = props?.g || 1
            this.b = props?.b || 1
            this.a = props?.a || 1
        }
    }

    handleStringColor(str) {
        if(str.startsWith('#')) {
            this.handle16Color(str)
        } else {
            switch(str) {
                case 'red':
                    this.r = 1
                    this.g = 0
                    this.b = 0
                    this.a = 1
                    break;
                case 'yellow':
                    this.r = 1
                    this.g = 1
                    this.b = 0
                    this.a = 1
                    break;
                case 'blue':
                    this.r = 0
                    this.g = 0
                    this.b = 1
                    this.a = 1
                    break;
                case 'green':
                    this.r = 0
                    this.g = 1
                    this.b = 0
                    this.a = 1
                    break;
                case 'white':
                    this.r = 1
                    this.g = 1
                    this.b = 1
                    this.a = 1
                    break;
                case 'black':
                    this.r = 0
                    this.g = 0
                    this.b = 0
                    this.a = 1
                    break;
            }
        }
    }

    handle16Color() {
        this.r = 1
        this.g = 1
        this.b = 1
        this.a = 1
    }
}

Color.isColor = function(object) {
    if(object.type && object.type === 'Color') {
        return true;
    } else {
        return false;
    }
}