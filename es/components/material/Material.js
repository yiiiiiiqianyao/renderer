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
var Material = /*#__PURE__*/ (function() {
  function Material() {
    _classCallCheck(this, Material);

    this.listeners = {};
  }

  _createClass(Material, [
    {
      key: 'on',
      value: function on(name, fn) {
        if (!this.listeners[name]) {
          this.listeners[name] = [];
        }

        this.listeners[name].push(fn);
      },
    },
    {
      key: 'emit',
      value: function emit(name, val) {
        if (this.listeners[name]) {
          this.listeners[name].map(function(fn) {
            fn(val);
          });
        }
      },
    },
    {
      key: 'off',
      value: function off(name, fn) {
        if (this.listeners[name]) {
          if (fn) {
            var index = this.listeners[name].indexOf(fn);

            if (index > -1) {
              this.listeners[name].splice(index, 1);
            }
          } else {
            this.listeners[name].length = 0; //设长度为0比obj[name] = []更优，因为如果是空数组则又开辟了一个新空间，设长度为0则不必开辟新空间
          }
        }
      },
    },
  ]);

  return Material;
})();

export { Material as default };
