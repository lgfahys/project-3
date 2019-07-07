"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _constants=require("./constants");var convertDistance=function convertDistance(meters){var targetUnit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"m";var factor=_constants.distanceConversion[targetUnit];if(factor){return meters*factor}throw new Error("Invalid unit used for distance conversion.")};var _default=convertDistance;exports.default=_default;