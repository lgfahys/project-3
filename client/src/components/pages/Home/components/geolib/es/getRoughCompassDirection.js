"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var getRoughCompassDirection=function getRoughCompassDirection(exact){if(/^NNE|NE|NNW|N$/.test(exact)){return"N"}if(/^ENE|E|ESE|SE$/.test(exact)){return"E"}if(/^SSE|S|SSW|SW$/.test(exact)){return"S"}if(/^WSW|W|WNW|NW$/.test(exact)){return"W"}};var _default=getRoughCompassDirection;exports.default=_default;