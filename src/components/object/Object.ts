export interface IObject {
  gl: WebGLRenderingContext;
  program: WebGLProgram;

  on: (name: string, fn: (options: any) => any) => void;
  emit: (name: string, val: any) => void;
  off: (name: string, fn: (options: any) => any) => void;
}
export default class Object {
  private listeners: any;

  public gl: WebGLRenderingContext;
  public program: WebGLProgram;

  constructor() {
    this.listeners = {};
  }

  on(name: string, fn: (options: any) => any) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(fn);
  }

  emit(name: string, val: any) {
    if (this.listeners[name]) {
      this.listeners[name].map((fn: (options: any) => any) => {
        fn(val);
      });
    }
  }

  off(name: string, fn: (options: any) => any) {
    if (this.listeners[name]) {
      if (fn) {
        let index = this.listeners[name].indexOf(fn);
        if (index > -1) {
          this.listeners[name].splice(index, 1);
        }
      } else {
        this.listeners[name].length = 0;
        //设长度为0比obj[name] = []更优，因为如果是空数组则又开辟了一个新空间，设长度为0则不必开辟新空间
      }
    }
  }
}
