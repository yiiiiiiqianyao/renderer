import { IScene } from '../scene';

export interface IMaterial {
  gl: WebGLRenderingContext;

  scene: IScene;

  on: (name: string, fn: (options: any) => any) => void;
  emit: (name: string, val: any) => void;
  off: (name: string, fn: (options: any) => any) => void;
}
export default class Material {
  private listeners: any;

  public gl: WebGLRenderingContext;
  public isAbort: boolean = false;

  constructor() {
    this.listeners = {};
  }

  abort() {
    this.isAbort = true;
  }

  on(name: string, fn: (options: any) => any) {
    if (this.isAbort) {
      this.isAbort = false;
      return;
    }
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
