"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistanceFromLine=_interopRequireDefault(require("./getDistanceFromLine"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isPointNearLine=function isPointNearLine(point,start,end,distance){return(0,_getDistanceFromLine.default)(point,start,end)<distance};var _default=isPointNearLine;exports.default=_default;