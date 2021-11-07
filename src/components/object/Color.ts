// @ts-nocheck
const COLORS = ['red', 'yellow', 'blue', 'green', 'white', 'black'];

export interface IColor {
  type: string;
  r: number;
  g: number;
  b: number;
  a: number;

  handleStringColor(str: string): void;
  handle16Color(): void;
  getRGBA(): number[];
  getRGB(): number[];
}

export default class Color implements IColor {
  public type: string = 'Color';
  public r: number = 1;
  public g: number = 1;
  public b: number = 1;
  public a: number = 1;

  constructor(props: string | undefined | IColor | number[]) {
    if (typeof props === 'string') {
      this.handleStringColor(props);
    } else if (props instanceof Array) {
      this.r = props[0];
      this.g = props[1];
      this.b = props[2];
      this.a = props[3];
    } else if (Color.isColor(props)) {
      this.r = props.r;
      this.g = props.g;
      this.b = props.b;
      this.a = props.a;
    }
  }

  handleStringColor(str) {
    if (str.startsWith('#')) {
      this.handle16Color(str);
    } else {
      switch (str) {
        case 'red':
          this.r = 1;
          this.g = 0;
          this.b = 0;
          this.a = 1;
          break;
        case 'yellow':
          this.r = 1;
          this.g = 1;
          this.b = 0;
          this.a = 1;
          break;
        case 'blue':
          this.r = 0;
          this.g = 0;
          this.b = 1;
          this.a = 1;
          break;
        case 'green':
          this.r = 0;
          this.g = 1;
          this.b = 0;
          this.a = 1;
          break;
        case 'white':
          this.r = 1;
          this.g = 1;
          this.b = 1;
          this.a = 1;
          break;
        case 'black':
          this.r = 0;
          this.g = 0;
          this.b = 0;
          this.a = 1;
          break;
      }
    }
  }

  handle16Color() {
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
  }

  getRGBA() {
    return [this.r, this.g, this.b, this.a];
  }

  getRGB() {
    return [this.r, this.g, this.b];
  }
}

Color.isColor = function(object) {
  if (object && object.type && object.type === 'Color') {
    return true;
  } else {
    return false;
  }
};
