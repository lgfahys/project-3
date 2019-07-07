"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(require("./getDistance"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}var getPathLength=function getPathLength(points){var distanceFn=arguments.length>1&&arguments[1]!==undefined?arguments[1]:_getDistance.default;return points.reduce(function(acc,point){if(_typeof(acc)==="object"&&acc.last!==null){acc.distance+=distanceFn(point,acc.last)}acc.last=point;return acc},{last:null,distance:0}).distance};var _default=getPathLength;exports.default=_default;