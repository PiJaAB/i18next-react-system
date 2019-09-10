"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_i18next["default"] // pass the i18n instance to react-i18next.
.use(_reactI18next.initReactI18next);

var _default = _i18next["default"];
exports["default"] = _default;