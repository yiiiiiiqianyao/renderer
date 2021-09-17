import { mat4 } from 'gl-matrix'
/**
 * 设置矩阵 modelMatrix 按照制定的旋转轴旋转制定的弧度 angle （PI）
 * @param {*} modelMatrix 
 * @param {*} angle 
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
export function setMatrixRotate(modelMatrix, angle, x, y, z) {
    var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
    e = mat4.create()
  
    s = Math.sin(angle);
    c = Math.cos(angle);
  
    if (0 !== x && 0 === y && 0 === z) {
      // Rotation around X axis
      if (x < 0) {
        s = -s;
      }
      e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
      e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
      e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    } else if (0 === x && 0 !== y && 0 === z) {
      // Rotation around Y axis
      if (y < 0) {
        s = -s;
      }
      e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
      e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
      e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    } else if (0 === x && 0 === y && 0 !== z) {
      // Rotation around Z axis
      if (z < 0) {
        s = -s;
      }
      e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
      e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
      e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    } else {
      // Rotation around another axis
      len = Math.sqrt(x*x + y*y + z*z);
      if (len !== 1) {
        rlen = 1 / len;
        x *= rlen;
        y *= rlen;
        z *= rlen;
      }
      nc = 1 - c;
      xy = x * y;
      yz = y * z;
      zx = z * x;
      xs = x * s;
      ys = y * s;
      zs = z * s;
  
      e[ 0] = x*x*nc +  c;
      e[ 1] = xy *nc + zs;
      e[ 2] = zx *nc - ys;
      e[ 3] = 0;
  
      e[ 4] = xy *nc - zs;
      e[ 5] = y*y*nc +  c;
      e[ 6] = yz *nc + xs;
      e[ 7] = 0;
  
      e[ 8] = zx *nc + ys;
      e[ 9] = yz *nc - xs;
      e[10] = z*z*nc +  c;
      e[11] = 0;
  
      e[12] = 0;
      e[13] = 0;
      e[14] = 0;
      e[15] = 1;
    }

    mat4.set(modelMatrix, ...e)
}

export function calMeshModelMatrix(mesh) {

}

export function calMeshWorldModelMatrix(mesh) {
    
}
