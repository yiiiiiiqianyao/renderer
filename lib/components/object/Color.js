'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// @ts-nocheck
var COLORS = ['red', 'yellow', 'blue', 'green', 'white', 'black'];

var Color = /*#__PURE__*/ (function() {
  function Color(props) {
    _classCallCheck(this, Color);

    this.type = 'Color';
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;

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

  _createClass(Color, [
    {
      key: 'handleStringColor',
      value: function handleStringColor(str) {
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
      },
    },
    {
      key: 'handle16Color',
      value: function handle16Color() {
        this.r = 1;
        this.g = 1;
        this.b = 1;
        this.a = 1;
      },
    },
    {
      key: 'getRGBA',
      value: function getRGBA() {
        return [this.r, this.g, this.b, this.a];
      },
    },
    {
      key: 'getRGB',
      value: function getRGB() {
        return [this.r, this.g, this.b];
      },
    },
  ]);

  return Color;
})();

exports.default = Color;

Color.isColor = function(object) {
  if (object && object.type && object.type === 'Color') {
    return true;
  } else {
    return false;
  }
};
