export function calMeshModelMatrix(mesh) {}
export function calMeshWorldModelMatrix(mesh) {}
export var generateUUID = (function() {
  var lut = [];

  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
  }

  return function generateUUID() {
    var d0 = (Math.random() * 0xffffffff) | 0;
    var d1 = (Math.random() * 0xffffffff) | 0;
    var d2 = (Math.random() * 0xffffffff) | 0;
    var d3 = (Math.random() * 0xffffffff) | 0;
    var uuid =
      lut[d0 & 0xff] +
      lut[(d0 >> 8) & 0xff] +
      lut[(d0 >> 16) & 0xff] +
      lut[(d0 >> 24) & 0xff] +
      '-' +
      lut[d1 & 0xff] +
      lut[(d1 >> 8) & 0xff] +
      '-' +
      lut[((d1 >> 16) & 0x0f) | 0x40] +
      lut[(d1 >> 24) & 0xff] +
      '-' +
      lut[(d2 & 0x3f) | 0x80] +
      lut[(d2 >> 8) & 0xff] +
      '-' +
      lut[(d2 >> 16) & 0xff] +
      lut[(d2 >> 24) & 0xff] +
      lut[d3 & 0xff] +
      lut[(d3 >> 8) & 0xff] +
      lut[(d3 >> 16) & 0xff] +
      lut[(d3 >> 24) & 0xff]; // .toUpperCase() here flattens concatenated strings to save heap memory space.

    return uuid.toUpperCase();
  };
})();
export function isPowerOfTwo(value) {
  return (value & (value - 1)) === 0 && value !== 0;
}
export function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}
export function distance(point1, point2) {
  var r1 = Math.pow(point1[0] - point2[0], 2);
  var r2 = Math.pow(point1[1] - point2[1], 2);
  var r3 = Math.pow(point1[2] - point2[2], 2);
  return Math.sqrt(r1 + r2 + r3);
}
