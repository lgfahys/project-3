"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(require("./getDistance"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getSpeed=function getSpeed(start,end){var distanceFn=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_getDistance.default;var distance=distanceFn(start,end);var time=Number(end.time)-Number(start.time);var metersPerSecond=distance/time*1000;return metersPerSecond};var _default=getSpeed;exports.default=_default;