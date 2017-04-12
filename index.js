'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Computed = exports.Provider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var proxy = {
    update: function update() {}
};

var Provider = exports.Provider = function (_Component) {
    _inherits(Provider, _Component);

    function Provider(props) {
        _classCallCheck(this, Provider);

        return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this));
    }

    _createClass(Provider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { proxy: proxy };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            Object.defineProperty(proxy, 'update', {
                value: function () {
                    this.forceUpdate();
                }.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.Children.only(this.props.children);
        }
    }]);

    return Provider;
}(_react.Component);

Provider.childContextTypes = {
    proxy: _propTypes2.default.object.isRequired
};

var Computed = exports.Computed = function Computed() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (args.length === 3 && typeof args[2].value === 'function') {
        return handle.apply(undefined, args);
    } else {
        return function () {
            return handle.apply(undefined, Array.prototype.slice.call(arguments).concat([args]));
        };
    }

    function bind(fn, context) {
        if (fn.bind) {
            return fn.bind(context);
        } else {
            return function __autobind__() {
                return fn.apply(context, arguments);
            };
        }
    }

    function handle(target, key, _ref, _args) {
        var _fn = _ref.value,
            configurable = _ref.configurable,
            enumerable = _ref.enumerable;

        return {
            configurable: configurable,
            enumerable: enumerable,

            get: function get() {
                var fn = function fn() {
                    _fn.bind(this).apply(undefined, arguments);
                    proxy.update();
                };

                var boundFn = bind(fn, this);

                Object.defineProperty(this, key, {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: boundFn
                });

                return boundFn;
            }
        };
    }
};
