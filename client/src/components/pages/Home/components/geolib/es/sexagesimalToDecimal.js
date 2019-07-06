"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _constants=require("./constants");var sexagesimalToDecimal=function sexagesimalToDecimal(sexagesimal){var data=new RegExp(_constants.sexagesimalPattern).exec(sexagesimal);if(typeof data==="undefined"||data===null){throw new Error("Given value is not in sexagesimal format")}var min=Number(data[2])/60||0;var sec=Number(data[4])/3600||0;var decimal=parseFloat(data[1])+min+sec;return["S","W"].includes(data[7])?-decimal:decimal};var _default=sexagesimalToDecimal;exports.default=_default;