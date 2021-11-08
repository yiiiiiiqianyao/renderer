import Object from '../object/Object';
import { IColor } from '../object/Color';
export interface IMaterial {
  color: IColor;
  transparent: boolean;
  opacity: number;
  map?: any;
  texture?: WebGLTexture | null;
  init(gl: WebGLRenderingContext): void;
}
interface IBasicMaterialProps {
  transparent?: boolean;
  opacity?: number;
  color?: string;
  map?: any;
  image?: HTMLImageElement;
}
export default class BasicMaterial extends Object {
  color: IColor;
  opacity: number;
  transparent: boolean;
  map: any;
  image: HTMLImageElement;
  texture: WebGLTexture | null;
  constructor(props: IBasicMaterialProps);
  init(gl: WebGLRenderingContext): Promise<void>;
  initTexture(): void;
  destroy(): void;
}
export {};
