"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backendT = backendT;
exports.tParse = tParse;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// eslint-disable-next-line no-use-before-define
var parsers = {
  dateTime: function dateTime(data) {
    var val = data.val;
    var date = new Date(Number(val));
    var year = String(date.getFullYear());
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hour = String(date.getHours()).padStart(2, '0');
    var minute = String(date.getMinutes()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(minute);
  },
  trans: function trans(data, t, namespace) {
    var params = data.params,
        key = data.key;

    if (typeof key !== 'string') {
      throw new Error('Invalid key');
    }

    if (typeof params !== 'undefined' && (_typeof(params) !== 'object' || params === null)) {
      throw new Error('Invalid params');
    } // eslint-disable-next-line no-use-before-define


    return tParse(t, key, params, namespace);
  }
};

function parse(t, data, namespace) {
  if (!data || _typeof(data) !== 'object') throw new Error('Invalid data');
  var parser = data.parser;
  if (typeof parser !== 'string') throw new Error('Invalid parser type');

  if (Object.keys(parsers).includes(parser)) {
    return parsers[parser](data, t, namespace);
  }

  throw new Error("Unknown parser: ".concat(parser));
}

function tParse(t, key, params, namespace) {
  var parsedParams = {};
  var localParams = params;

  if (localParams) {
    Object.keys(localParams).forEach(function (param) {
      var val = localParams[param];

      if (val === null || _typeof(val) !== 'object') {
        parsedParams[param] = val;
        return;
      }

      parsedParams[param] = parse(t, val, namespace);
    });
  }

  if (!namespace) return t(key, parsedParams);
  var namespacedKey = key.includes(':') ? key : "".concat(namespace, ":").concat(key);
  return t(namespacedKey, parsedParams);
}

function backendT(t, _message, _trans, log) {
  var trans = _trans;
  var message = _message;

  if (_typeof(message) === 'object') {
    var _message2 = message;
    trans = _message2.trans;
    var _message3 = message;
    message = _message3.message;
  }

  if (!trans) {
    return message;
  }

  var _trans2 = trans,
      key = _trans2.key,
      params = _trans2.params;

  try {
    return tParse(t, key, params, 'backend');
  } catch (err) {
    if (log && typeof log === 'function') {
      log(err);
    } else if (log) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    return message;
  }
}