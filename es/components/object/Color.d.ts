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
  type: string;
  r: number;
  g: number;
  b: number;
  a: number;
  constructor(props: string | undefined | IColor | number[]);
  handleStringColor(str: any): void;
  handle16Color(): void;
  getRGBA(): number[];
  getRGB(): number[];
}
