export default class Material {
    constructor() { 
        this.listeners = {}
    }

    on(name, fn) {
        if(!this.listeners[name]){
            this.listeners[name] = [];
        }
        this.listeners[name].push(fn);
    }

    emit(name,val) {
        if(this.listeners[name]){
            this.listeners[name].map((fn)=>{
                fn(val);
            });
        }
    }

    off(name,fn) {
        if(this.listeners[name]){
            if(fn){
                let index = this.listeners[name].indexOf(fn);
                if(index > -1){
                    this.listeners[name].splice(index,1);
                }          
            }else{
                this.listeners[name].length = 0;
                //设长度为0比obj[name] = []更优，因为如果是空数组则又开辟了一个新空间，设长度为0则不必开辟新空间
            } 
        }
    }
}