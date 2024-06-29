/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/javascripts/scripts.js":
/*!***************************************!*\
  !*** ./public/javascripts/scripts.js ***!
  \***************************************/
/***/ (() => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// If using Node.js\n\n$(document).ready(function () {\n  $(\"#DummieProPic\").click(function () {\n    $(\"#myModal\").modal(\"show\");\n  });\n});\nvar handleClick = /*#__PURE__*/function () {\n  function handleClick() {\n    _classCallCheck(this, handleClick);\n    this.userInterests = [];\n  }\n  return _createClass(handleClick, [{\n    key: \"indClickSub\",\n    value: function indClickSub(id) {\n      if ($('#' + id).css('visibility') === \"visible\") {\n        this.userInterests.pop(id);\n        $('#' + id).css('visibility', \"hidden\");\n      } else {\n        this.userInterests.push(id);\n        $('#' + id).css('visibility', \"visible\");\n      }\n      $('#indCount').html(this.userInterests.length);\n    }\n  }, {\n    key: \"intSubmit\",\n    value: function intSubmit() {\n      $.ajax({\n        type: \"POST\",\n        url: \"/save-user\",\n        data: {\n          interests: JSON.stringify(this.userInterests)\n        },\n        success: function success(value) {}\n      });\n    }\n  }]);\n}();\nwindow.indClick = new handleClick();\n\n//# sourceURL=webpack://what-s-popin/./public/javascripts/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/javascripts/scripts.js"]();
/******/ 	
/******/ })()
;