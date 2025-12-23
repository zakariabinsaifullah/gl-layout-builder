/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ }),

/***/ "./src/blocks/marque/block.json":
/*!**************************************!*\
  !*** ./src/blocks/marque/block.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gutenlayouts/marque","version":"0.1.0","title":"marque","category":"gutenlayouts","description":"Add a customizable svg icon to your content.","supports":{"anchor":true,"html":false,"align":["wide","full"],"spacing":{"margin":true,"padding":true}},"attributes":{"speed":{"type":"number","default":30},"direction":{"type":"string","default":"left"},"pauseOnHover":{"type":"boolean","default":false},"gap":{"type":"number","default":40},"backgroundColor":{"type":"string"},"textColor":{"type":"string"},"orientation":{"type":"string","default":"horizontal"},"height":{"type":"number"}},"textdomain":"gutenlayouts","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/blocks/marque/edit.js":
/*!***********************************!*\
  !*** ./src/blocks/marque/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/marque/editor.scss");
/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inspector */ "./src/blocks/marque/inspector.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function Edit({
  attributes,
  setAttributes,
  isSelected
}) {
  const {
    gap,
    orientation,
    height
  } = attributes;
  const blockStyle = {};
  if (orientation === 'vertical' && height) {
    blockStyle.height = `${height}px`;
  }
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: `marquee-wrapper marquee-${orientation || 'horizontal'}`,
    style: blockStyle
  });
  const TEMPLATE = [['core/paragraph']];
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useInnerBlocksProps)({
    className: `gutenlayouts-marquee-items`,
    style: {
      gap: `${gap}px`
    }
  }, {
    template: TEMPLATE,
    orientation: orientation || 'horizontal'
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      ...blockProps,
      children: [isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_inspector__WEBPACK_IMPORTED_MODULE_3__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        ...innerBlocksProps
      })]
    })
  });
}

/***/ }),

/***/ "./src/blocks/marque/editor.scss":
/*!***************************************!*\
  !*** ./src/blocks/marque/editor.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/marque/index.js":
/*!************************************!*\
  !*** ./src/blocks/marque/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/marque/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/marque/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/marque/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/marque/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




const inlineIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 -960 960 960",
  width: "24px",
  fill: "currentColor",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "M480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm-14 50v146.23q0 13.31 12.5 16.04 12.5 2.73 18.19-8.96l99.46-226.62q3.85-9.23-1.45-17.96T579.69-530H500v-149.38q0-13.31-12.5-16.35-12.5-3.04-18.19 8.65L365.23-456.69q-3.84 9.84 1.08 18.27 4.92 8.42 14.77 8.42H466Z"
  })
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  icon: inlineIcon,
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/marque/inspector.js":
/*!****************************************!*\
  !*** ./src/blocks/marque/inspector.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components */ "./src/components/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const Inspector = props => {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    speed,
    direction,
    pauseOnHover,
    gap,
    orientation,
    height
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Marquee Settings', 'gutenlayouts'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.NativeToggleGroupControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Orientation', 'gutenlayouts'),
          value: orientation,
          onChange: value => setAttributes({
            orientation: value
          }),
          options: [{
            value: 'horizontal',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal', 'gutenlayouts')
          }, {
            value: 'vertical',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical', 'gutenlayouts')
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.NativeToggleGroupControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Direction', 'gutenlayouts'),
          value: direction,
          onChange: value => setAttributes({
            direction: value
          }),
          options: [{
            value: 'left',
            label: orientation === 'vertical' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Up', 'gutenlayouts') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Left', 'gutenlayouts')
          }, {
            value: 'right',
            label: orientation === 'vertical' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Down', 'gutenlayouts') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Right', 'gutenlayouts')
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.NativeRangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Speed', 'gutenlayouts'),
          value: speed,
          onChange: value => setAttributes({
            speed: value
          }),
          min: 1,
          max: 200,
          step: 1,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Higher values = Slower scrolling', 'gutenlayouts')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.NativeRangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gap between items (px)', 'gutenlayouts'),
          value: gap,
          onChange: value => setAttributes({
            gap: value
          }),
          min: 1,
          max: 100,
          step: 1
        }), orientation === 'vertical' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.NativeRangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical Height', 'gutenlayouts'),
          value: height || 500,
          onChange: value => setAttributes({
            height: value
          }),
          min: 200,
          max: 1000,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Set the visible height for vertical scrolling', 'gutenlayouts')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_3__.NativeToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pause on Hover', 'gutenlayouts'),
          checked: pauseOnHover,
          onChange: value => setAttributes({
            pauseOnHover: value
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ }),

/***/ "./src/blocks/marque/save.js":
/*!***********************************!*\
  !*** ./src/blocks/marque/save.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {});
}

/***/ }),

/***/ "./src/blocks/marque/style.scss":
/*!**************************************!*\
  !*** ./src/blocks/marque/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/borderbox-control/index.js":
/*!***************************************************!*\
  !*** ./src/components/borderbox-control/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const NativeBorderBoxControl = ({
  label,
  value,
  onChange
}) => {
  const themeColors = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getSettings().colors || [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.BorderBoxControl, {
    __next40pxDefaultSize: true,
    colors: themeColors,
    label: label,
    onChange: v => onChange(v),
    value: value
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeBorderBoxControl);

/***/ }),

/***/ "./src/components/box-control/index.js":
/*!*********************************************!*\
  !*** ./src/components/box-control/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const NativeBoxControl = ({
  label,
  value,
  onChange,
  allowReset = false
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "native-control-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.BoxControl, {
      label: label,
      values: value,
      onChange: v => onChange(v),
      allowReset: allowReset
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeBoxControl);

/***/ }),

/***/ "./src/components/color-control/index.js":
/*!***********************************************!*\
  !*** ./src/components/color-control/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * WordPress dependencies.
 */





/**
 * Resolve a raw selection from ColorPalette against the provided
 * colorGradientSettings to see if it corresponds to a theme/preset color.
 *
 * @param {string|Object} rawColor
 * @param {Array}         colorGradientSettings - the array you get from useMultipleOriginColorsAndGradients()
 * @return {{ color: string|undefined, slug: string|undefined }} Object containing the selected color value and its slug if it matches a preset otherwise, both properties are undefined.
 */

function resolveColorSelection(rawColor, colorGradientSettings) {
  let pickedColor = '';
  if (typeof rawColor === 'object') {
    pickedColor = rawColor.color || rawColor;
  } else if (typeof rawColor === 'string') {
    pickedColor = rawColor;
  }
  if (!pickedColor) {
    return {
      color: undefined,
      slug: undefined
    };
  }
  const normalize = c => String(c).trim().toLowerCase();
  const target = normalize(pickedColor);
  const palettes = Array.isArray(colorGradientSettings?.colors) ? colorGradientSettings.colors : [];
  for (const palette of palettes) {
    if (!Array.isArray(palette.colors)) {
      continue;
    }
    for (const entry of palette.colors) {
      if (!entry || !entry.color) {
        continue;
      }
      if (normalize(entry.color) === target) {
        return {
          color: pickedColor,
          slug: entry.slug
        };
      }

      // crude handling for function-style colors like color-mix
      if (entry.color.includes('color-mix') && target.includes(entry.color.replace(/\s+/g, '').toLowerCase())) {
        return {
          color: pickedColor,
          slug: entry.slug
        };
      }
    }
  }
  return {
    color: pickedColor,
    slug: undefined
  };
}

/**
 * Renders a color control dropdown for selecting colors.
 *
 * @param {Object}   props               - The component props.
 * @param {string}   props.label         - The label for the color control.
 * @param {Object}   props.colorValue    - The current color values. Should include `default` and optionally `hover` (if `hasHover` is true).
 * @param {Function} props.onChangeColor - Callback function to handle color changes. Accepts an object with updated color values.
 * @param {boolean}  props.hasHover      - Determines if hover color support is enabled. If true, a tab for hover colors is displayed.
 * @param {boolean}  props.hasActive     - Determines if active color support is enabled. If true, a tab for active colors is displayed.
 *
 * @return {JSX.Element} The rendered ColorControlDropdown component.
 */
function ColorControlDropdown({
  label,
  colorValue = {},
  onChangeColor,
  hasHover = false,
  hasActive = false
}) {
  const colorGradientSettings = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.__experimentalUseMultipleOriginColorsAndGradients)();
  const handleChange = (tabName, rawColor) => {
    const normalized = resolveColorSelection(rawColor, colorGradientSettings);
    onChangeColor({
      ...colorValue,
      [tabName]: normalized
    });
  };
  const defaultIndicator = colorValue.default || '';
  const hoverIndicator = hasHover ? colorValue.hover : null;
  const activeIndicator = hasActive ? colorValue.active : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
    popoverProps: {
      placement: 'left-start',
      offset: 36,
      shift: true
    },
    contentClassName: "native-dropdown",
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('native-color-btn', {
        ['isOpen']: isOpen
      }),
      "aria-expanded": isOpen,
      onClick: onToggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
        justify: "left",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalZStack, {
          offset: 10,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorIndicator, {
            colorValue: defaultIndicator
          }), hasHover && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorIndicator, {
            colorValue: hoverIndicator
          }), hasActive && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorIndicator, {
            colorValue: activeIndicator
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalText, {
          children: label
        })]
      })
    }),
    renderContent: () => hasHover || hasActive ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
      tabs: [{
        name: 'default',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'gutenlayouts')
      }, {
        name: 'hover',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover', 'gutenlayouts')
      }, {
        name: 'active',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Active', 'gutenlayouts')
      }],
      children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
        __experimentalIsRenderedInSidebar: true,
        value: colorValue[tab.name] || '',
        onChange: color => handleChange(tab.name, color),
        ...colorGradientSettings,
        enableAlpha: true
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
      className: "native-color-palette-container",
      __experimentalIsRenderedInSidebar: true,
      value: colorValue.default || '',
      onChange: color => {
        onChangeColor({
          ...colorValue,
          default: color
        });
        console.log(color);
      },
      ...colorGradientSettings,
      enableAlpha: true
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorControlDropdown);

// const colorControls = [
//     {
//         key: 'tableColor',
//         state: tableColor,
//         label: __('Table Color', 'gutenlayouts')
//     },
//     {
//         key: 'tableBg',
//         state: tableBg,
//         label: __('Table Background', 'gutenlayouts')
//     }
// ];

// {colorControls.map(({ key, state, label }) => {
//     const value = state || {};
//     const hasValue = [value.default, value.hover, value.active].some(Boolean);
//     return (
//         <ToolsPanelItem
//             key={key}
//             label={label}
//             className="native-tools-panel-item"
//             panelId={clientId}
//             isShownByDefault
//             hasValue={() => hasValue}
//             onDeselect={() => {
//                 setAttributes({ [key]: undefined });
//             }}
//             resetAllFilter={() => setAttributes({ [key]: undefined })}
//         >
//             <ColorControlDropdown
//                 label={label}
//                 colorValue={value}
//                 onChangeColor={newColor =>
//                     setAttributes({
//                         [key]: { ...value, ...newColor }
//                     })
//                 }
//                 hasHover={false}
//                 hasActive={false}
//             />
//         </ToolsPanelItem>
//     );
// })}

/***/ }),

/***/ "./src/components/editor.scss":
/*!************************************!*\
  !*** ./src/components/editor.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/icon-picker-control/icons.json":
/*!*******************************************************!*\
  !*** ./src/components/icon-picker-control/icons.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('[{"label":"Close","terms":["close","x","cancel","exit"],"svg":{"solid":{"width":16,"path":"M4.64645 4.64645C4.84171 4.45118 5.15829 4.45118 5.35355 4.64645L8 7.29289L10.6464 4.64645C10.8417 4.45118 11.1583 4.45118 11.3536 4.64645C11.5488 4.84171 11.5488 5.15829 11.3536 5.35355L8.70711 8L11.3536 10.6464C11.5488 10.8417 11.5488 11.1583 11.3536 11.3536C11.1583 11.5488 10.8417 11.5488 10.6464 11.3536L8 8.70711L5.35355 11.3536C5.15829 11.5488 4.84171 11.5488 4.64645 11.3536C4.45118 11.1583 4.45118 10.8417 4.64645 10.6464L7.29289 8L4.64645 5.35355C4.45118 5.15829 4.45118 4.84171 4.64645 4.64645Z"}}},{"label":"Check","terms":["check","tick","done","complete"],"svg":{"solid":{"width":16,"path":"M12.7365 3.96967C13.0255 3.67678 13.4942 3.67678 13.7832 3.96967C14.0687 4.25897 14.0722 4.72582 13.7937 5.01947L7.88025 12.0097C7.87456 12.0169 7.86848 12.0238 7.86205 12.0303C7.573 12.3232 7.10437 12.3232 6.81532 12.0303L3.21678 8.38388C2.92774 8.09099 2.92774 7.61612 3.21678 7.32322C3.50583 7.03033 3.97446 7.03033 4.26351 7.32322L7.31638 10.4167L12.7169 3.9921C12.723 3.98424 12.7295 3.97674 12.7365 3.96967Z"}}},{"label":"Double Check","terms":["double","check","verified","approved"],"svg":{"solid":{"width":16,"path":"M8.96963 4.96967C9.26253 4.67678 9.7374 4.67678 10.0303 4.96967C10.3196 5.25897 10.3231 5.72582 10.0409 6.01947L6.04873 11.0097C6.04297 11.0169 6.03682 11.0238 6.03029 11.0303C5.7374 11.3232 5.26253 11.3232 4.96963 11.0303L2.32319 8.38388C2.03029 8.09099 2.03029 7.61612 2.32319 7.32322C2.61608 7.03033 3.09095 7.03033 3.38385 7.32322L5.47737 9.41674L8.94974 4.9921C8.95592 4.98424 8.96256 4.97674 8.96963 4.96967Z M8.04921 10.1099L8.96963 11.0303C9.26253 11.3232 9.7374 11.3232 10.0303 11.0303C10.0368 11.0238 10.043 11.0169 10.0487 11.0097L14.0409 6.01947C14.3231 5.72582 14.3196 5.25897 14.0303 4.96967C13.7374 4.67678 13.2625 4.67678 12.9696 4.96967C12.9626 4.97674 12.9559 4.98424 12.9497 4.9921L9.47737 9.41674L8.99202 8.9314L8.04921 10.1099Z"}}},{"label":"Plus","terms":["plus","add","new","create"],"svg":{"solid":{"width":16,"path":"M8 4C8.27614 4 8.5 4.22386 8.5 4.5V7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H8.5V11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5V8.5H4.5C4.22386 8.5 4 8.27614 4 8C4 7.72386 4.22386 7.5 4.5 7.5H7.5V4.5C7.5 4.22386 7.72386 4 8 4Z"}}},{"label":"Minus","terms":["minus","subtract","remove","delete"],"svg":{"solid":{"width":16,"path":"M4 8C4 7.72386 4.22386 7.5 4.5 7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H4.5C4.22386 8.5 4 8.27614 4 8Z"}}},{"label":"Plus Circle","terms":["plus","circle","add","new"],"svg":{"solid":{"width":16,"path":"M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z M8 4C8.27614 4 8.5 4.22386 8.5 4.5V7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H8.5V11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5V8.5H4.5C4.22386 8.5 4 8.27614 4 8C4 7.72386 4.22386 7.5 4.5 7.5H7.5V4.5C7.5 4.22386 7.72386 4 8 4Z"}}},{"label":"Minus Circle","terms":["minus","circle","remove","subtract"],"svg":{"solid":{"width":16,"path":"M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z M4 8C4 7.72386 4.22386 7.5 4.5 7.5H11.5C11.7761 7.5 12 7.72386 12 8C12 8.27614 11.7761 8.5 11.5 8.5H4.5C4.22386 8.5 4 8.27614 4 8Z"}}},{"label":"Slash Circle","terms":["slash","circle","block","forbidden"],"svg":{"solid":{"width":16,"path":"M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z M11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645L4.64645 10.6464C4.45118 10.8417 4.45118 11.1583 4.64645 11.3536C4.84171 11.5488 5.15829 11.5488 5.35355 11.3536L11.3536 5.35355C11.5488 5.15829 11.5488 4.84171 11.3536 4.64645Z M15 8C15 11.866 11.866 15 8 15C6.24696 15 4.64443 14.3556 3.41637 13.2907L13.2907 3.41637C14.3556 4.64443 15 6.24696 15 8ZM2.70926 12.5836L12.5836 2.70926C11.3556 1.64441 9.75304 1 8 1C4.13401 1 1 4.13401 1 8C1 9.75304 1.64441 11.3556 2.70926 12.5836ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"}}},{"label":"Close Circle","terms":["close","circle","cancel","remove"],"svg":{"solid":{"width":16,"path":"M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z M4.64645 4.64645C4.84171 4.45118 5.15829 4.45118 5.35355 4.64645L8 7.29289L10.6464 4.64645C10.8417 4.45118 11.1583 4.45118 11.3536 4.64645C11.5488 4.84171 11.5488 5.15829 11.3536 5.35355L8.70711 8L11.3536 10.6464C11.5488 10.8417 11.5488 11.1583 11.3536 11.3536C11.1583 11.5488 10.8417 11.5488 10.6464 11.3536L8 8.70711L5.35355 11.3536C5.15829 11.5488 4.84171 11.5488 4.64645 11.3536C4.45118 11.1583 4.45118 10.8417 4.64645 10.6464L7.29289 8L4.64645 5.35355C4.45118 5.15829 4.45118 4.84171 4.64645 4.64645Z"}}},{"label":"Check Circle","terms":["check","circle","done","verified"],"svg":{"solid":{"width":16,"path":"M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z M10.9697 4.96967C10.9626 4.97674 10.9559 4.98423 10.9498 4.9921L7.4774 9.41674L5.38388 7.32322C5.09098 7.03033 4.61611 7.03033 4.32322 7.32322C4.03032 7.61612 4.03032 8.09099 4.32322 8.38388L6.96966 11.0303C7.26256 11.3232 7.73743 11.3232 8.03032 11.0303C8.03685 11.0238 8.043 11.0169 8.04876 11.0097L12.041 6.01947C12.3232 5.72582 12.3196 5.25897 12.0303 4.96967C11.7374 4.67678 11.2626 4.67678 10.9697 4.96967Z"}}},{"label":"Minus Circle Fill","terms":["minus","circle","filled","solid"],"svg":{"solid":{"width":16,"path":"M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H11.5C11.7761 8.5 12 8.27614 12 8C12 7.72386 11.7761 7.5 11.5 7.5H4.5Z"}}},{"label":"Plus Circle Fill","terms":["plus","circle","filled","solid"],"svg":{"solid":{"width":16,"path":"M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8.5 4.5C8.5 4.22386 8.27614 4 8 4C7.72386 4 7.5 4.22386 7.5 4.5V7.5H4.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H7.5V11.5C7.5 11.7761 7.72386 12 8 12C8.27614 12 8.5 11.7761 8.5 11.5V8.5H11.5C11.7761 8.5 12 8.27614 12 8C12 7.72386 11.7761 7.5 11.5 7.5H8.5V4.5Z"}}}]');

/***/ }),

/***/ "./src/components/icon-picker-control/index.js":
/*!*****************************************************!*\
  !*** ./src/components/icon-picker-control/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons.json */ "./src/components/icon-picker-control/icons.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const IconPicker = ({
  iconsPanel = false,
  setIconsPanel,
  value,
  onChange,
  customIcons = null
}) => {
  const [filterIcons, setFilterIcons] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [searchText, setSearchText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const iconsSource = customIcons || _icons_json__WEBPACK_IMPORTED_MODULE_3__;
  const allSvgItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return iconsSource.map(icon => ({
      label: icon.label,
      svg: icon.svg,
      terms: icon.terms
    }));
  }, [iconsSource]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let displayIcons = allSvgItems;
    if (searchText) {
      displayIcons = displayIcons.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()) || item.terms.some(term => term.toLowerCase().includes(searchText.toLowerCase())));
      if (displayIcons.length === 0) {
        displayIcons = [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No Icons Found', 'svg-icon-block'),
          svg: {
            solid: {
              width: 512,
              height: 512,
              path: 'M256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm0 480C132.48 480 32 379.52 32 256S132.48 32 256 32s224 100.48 224 224-100.48 224-224 224zM336 192H176a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm-16 64H192v-32h128z'
            }
          }
        }];
      }
    }
    setFilterIcons(displayIcons);
  }, [allSvgItems, searchText]);
  const generateIcon = icon => {
    let iconCat;
    if (icon.svg.solid) {
      iconCat = 'solid';
    } else if (icon.svg.brands) {
      iconCat = 'brands';
    } else if (icon.svg.regular) {
      iconCat = 'regular';
    }
    const svgData = icon.svg[iconCat];
    const width = svgData.width || 16;
    const height = svgData.height || width; // height না থাকলে width use করবে

    // viewBox সঠিকভাবে set করা
    const viewBox = `0 0 ${width} ${height}`;
    const svgRaw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor"><path d="${svgData.path}" /></svg>`;
    return svgRaw;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "svgib-icon-picker",
      children: iconsPanel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
        className: "svgib__modal",
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Icon', 'svg-icon-block'),
        onRequestClose: () => setIconsPanel(false),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "search__input",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SearchControl, {
            __nextHasNoMarginBottom: true,
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search Icon', 'svg-icon-block'),
            onChange: e => setSearchText(e),
            value: searchText
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "svgib-modal__wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "svgib-icons-wrap",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "svgib__icons-container",
              children: filterIcons.map((item, index) => {
                const generatedIcon = generateIcon(item);
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
                  className: `single__icon ${value === generatedIcon ? 'active' : ''}`,
                  onClick: () => {
                    onChange(generatedIcon);
                    setIconsPanel(false); // modal close করার জন্য
                  },
                  title: item.label,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, {
                    className: "single__icon_svg",
                    children: generatedIcon
                  })
                }, index);
              })
            })
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconPicker);

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorControlDropdown: () => (/* reexport safe */ _color_control__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   CustomiconModal: () => (/* reexport safe */ _svg_modal__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   IconPicker: () => (/* reexport safe */ _icon_picker_control__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   NativeBorderBoxControl: () => (/* reexport safe */ _borderbox_control__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   NativeBoxControl: () => (/* reexport safe */ _box_control__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   NativeProNotice: () => (/* reexport safe */ _pro_notice__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   NativeRangeControl: () => (/* reexport safe */ _range_control__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   NativeSelectControl: () => (/* reexport safe */ _select_control__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   NativeTextControl: () => (/* reexport safe */ _text_control__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   NativeToggleControl: () => (/* reexport safe */ _toggle_control__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   NativeToggleGroupControl: () => (/* reexport safe */ _toggle_group_control__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   NativeUnitControl: () => (/* reexport safe */ _unit_control__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   PanelColorControl: () => (/* reexport safe */ _panel_color_control__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   StarRating: () => (/* reexport safe */ _star_rating__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/components/editor.scss");
/* harmony import */ var _pro_notice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pro-notice */ "./src/components/pro-notice/index.js");
/* harmony import */ var _color_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-control */ "./src/components/color-control/index.js");
/* harmony import */ var _panel_color_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panel-color-control */ "./src/components/panel-color-control/index.js");
/* harmony import */ var _star_rating__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./star-rating */ "./src/components/star-rating/index.js");
/* harmony import */ var _borderbox_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./borderbox-control */ "./src/components/borderbox-control/index.js");
/* harmony import */ var _toggle_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toggle-control */ "./src/components/toggle-control/index.js");
/* harmony import */ var _toggle_group_control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toggle-group-control */ "./src/components/toggle-group-control/index.js");
/* harmony import */ var _icon_picker_control__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icon-picker-control */ "./src/components/icon-picker-control/index.js");
/* harmony import */ var _svg_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./svg-modal */ "./src/components/svg-modal/index.js");
/* harmony import */ var _range_control__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./range-control */ "./src/components/range-control/index.js");
/* harmony import */ var _select_control__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./select-control */ "./src/components/select-control/index.js");
/* harmony import */ var _unit_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./unit-control */ "./src/components/unit-control/index.js");
/* harmony import */ var _text_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./text-control */ "./src/components/text-control/index.js");
/* harmony import */ var _box_control__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./box-control */ "./src/components/box-control/index.js");
















/***/ }),

/***/ "./src/components/panel-color-control/index.js":
/*!*****************************************************!*\
  !*** ./src/components/panel-color-control/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const PanelColorControl = ({
  label,
  colorSettings
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "native-panel-color-control",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.PanelColorSettings, {
      title: label,
      initialOpen: false,
      colorSettings: colorSettings
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PanelColorControl);

/***/ }),

/***/ "./src/components/pro-notice/index.js":
/*!********************************************!*\
  !*** ./src/components/pro-notice/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const NativeProNotice = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "native-pro-notice",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalText, {
      isBlock: true,
      size: "15rem",
      lineHeight: "1.6",
      weight: "500",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Native Table Resources', 'gutenlayouts')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ExternalLink, {
      href: "https://wpnativeblocks.com/table-builder/pricing",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Native Table Pro', 'gutenlayouts')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ExternalLink, {
      href: "https://wpnativeblocks.com/table-builder/demos",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Explore Demos', 'gutenlayouts')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ExternalLink, {
      href: "https://wpnativeblocks.com/table-builder/vidoes",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tutorial Videos', 'gutenlayouts')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ExternalLink, {
      href: "https://wpnativeblocks.com/table-builder/blog",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Blog Posts', 'gutenlayouts')
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeProNotice);

/***/ }),

/***/ "./src/components/range-control/index.js":
/*!***********************************************!*\
  !*** ./src/components/range-control/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const NativeRangeControl = ({
  label,
  value,
  onChange,
  min,
  max,
  step
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "native-control-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RangeControl, {
      label: label,
      value: value,
      onChange: v => onChange(v),
      min: min,
      max: max,
      step: step,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeRangeControl);

/***/ }),

/***/ "./src/components/select-control/index.js":
/*!************************************************!*\
  !*** ./src/components/select-control/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const NativeSelectControl = ({
  label,
  value,
  onChange,
  options,
  width = ''
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "native-control-wrapper",
    style: {
      '--max-width': width
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: label,
      value: value,
      options: options,
      onChange: v => onChange(v),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeSelectControl);

/***/ }),

/***/ "./src/components/star-rating/index.js":
/*!*********************************************!*\
  !*** ./src/components/star-rating/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Internal dependencies
 */

const StarRating = ({
  total = 5,
  rating
}) => {
  const fraction = Math.round((rating - Math.floor(rating)) * 10) / 10;
  const filled = Math.floor(rating);
  const empty = total - Math.ceil(rating);
  let fillItems = [];
  for (let i = 0; i < filled; i++) {
    fillItems.push(i);
  }
  let emptyItems = [];
  for (let j = 0; j < empty; j++) {
    emptyItems.push(j);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "gutenlayout-star-rating",
    children: [filled > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: fillItems && fillItems.map((item, index) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
          id: "Layer_1",
          "data-name": "Layer 1",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 49.23 48.44",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z",
            transform: "translate(-0.39 -0.78)"
          })
        }, index);
      })
    }), fraction > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [fraction === 0.1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.62,31.78,9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.49-15a1.89,1.89,0,0,0-.53-1.67L7,24.33V19.08l10.05-1.51a1.93,1.93,0,0,0,1.45-1.08L25,2.83,31.5,16.5A1.94,1.94,0,0,0,33,17.57l14.58,2.19Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.2 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.62,31.78,9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15-13-7a1.88,1.88,0,0,0-1.84,0L11.5,46.94V44.76l2.09-12.65a1.89,1.89,0,0,0-.53-1.67L11.5,28.86V18.4l5.55-.83a1.93,1.93,0,0,0,1.45-1.08L25,2.83,31.5,16.5A1.94,1.94,0,0,0,33,17.57l14.58,2.19Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.3 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15-13-7a1.88,1.88,0,0,0-1.84,0L16,44.49V17.73l1.05-.16a1.93,1.93,0,0,0,1.45-1.08L25,2.83,31.5,16.5A1.94,1.94,0,0,0,33,17.57l14.58,2.19Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.4 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15-13-7a1.88,1.88,0,0,0-1.84,0L20.5,42V12.28L25,2.83,31.5,16.5A1.94,1.94,0,0,0,33,17.57l14.58,2.19Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.5 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15-13-7a1.89,1.89,0,0,0-.92-.24v-37L31.5,16.5A1.94,1.94,0,0,0,33,17.57l14.58,2.19Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.6 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15L29.5,42V12.31l2,4.19A1.94,1.94,0,0,0,33,17.57l14.58,2.19Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.7 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1ZM36.94,30.44a1.89,1.89,0,0,0-.53,1.67l2.49,15L34,44.49V17.73l13.53,2Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.8 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.51,19.1A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2L38.36,31.85,49.05,21.06A1.9,1.9,0,0,0,49.51,19.1Zm-11,9.77V18.4l9,1.36Z",
          transform: "translate(-0.39 -0.78)"
        })
      }), fraction === 0.9 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 49.23 48.44",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Zm-6,3.25V19.08l4.52.68Z",
          transform: "translate(-0.39 -0.78)"
        })
      })]
    }), empty > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: emptyItems && emptyItems.map((item, index) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
          id: "Layer_1",
          "data-name": "Layer 1",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 49.23 48.44",
          className: "empty-star",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z",
            transform: "translate(-0.49 -0.53)"
          })
        }, index);
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StarRating);

/***/ }),

/***/ "./src/components/svg-modal/index.js":
/*!*******************************************!*\
  !*** ./src/components/svg-modal/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const CustomiconModal = ({
  customiconPanel,
  setCustomiconPanel,
  onInsert,
  value
}) => {
  const [code, setCode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value || '');
  const [size, setSize] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(30);
  if (!customiconPanel) return null;
  const handleInsert = () => {
    if (code.trim() === '') {
      wp.data.dispatch('core/notices').createNotice('error', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please enter SVG code', 'gutenlayouts'), {
        isDismissible: true
      });
      return;
    }
    onInsert(code);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    className: "svgib__modal custom-svg",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom SVG', 'gutenlayouts'),
    onRequestClose: () => setCustomiconPanel(false),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "svg-controls",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SVG Preview Size', 'gutenlayouts'),
        value: size,
        onChange: v => setSize(v),
        min: 20,
        max: 150
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "svgib-modal__wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "svg-code",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SVG Code', 'gutenlayouts'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Paste your SVG code here.', 'gutenlayouts'),
          value: code,
          onChange: v => setCode(v),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<svg>...</svg>', 'gutenlayouts'),
          rows: 10
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "svg-preview",
        style: {
          width: size,
          height: size
        },
        children: code ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          dangerouslySetInnerHTML: {
            __html: code
          }
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "preview-text",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SVG Preview', 'gutenlayouts')
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "insert-svg",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleInsert,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Insert SVG', 'gutenlayouts')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomiconModal);

/***/ }),

/***/ "./src/components/text-control/index.js":
/*!**********************************************!*\
  !*** ./src/components/text-control/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const NativeTextControl = ({
  label,
  value,
  onChange,
  placeholder = ''
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "native-control-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: label,
      value: value,
      placeholder: placeholder,
      onChange: v => onChange(v),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeTextControl);

/***/ }),

/***/ "./src/components/toggle-control/index.js":
/*!************************************************!*\
  !*** ./src/components/toggle-control/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const NativeToggleControl = ({
  label,
  checked,
  onChange
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToggleControl, {
    label: label,
    checked: checked,
    onChange: onChange,
    __nextHasNoMarginBottom: true
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeToggleControl);

/***/ }),

/***/ "./src/components/toggle-group-control/index.js":
/*!******************************************************!*\
  !*** ./src/components/toggle-group-control/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const NativeToggleGroupControl = ({
  label,
  value,
  onChange,
  options = []
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "native-control-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControl, {
      label: label,
      value: value,
      onChange: v => onChange(v),
      isBlock: true,
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      children: options && options.map(option => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControlOption, {
        value: option.value,
        label: option.label
      }, option.value))
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeToggleGroupControl);

/***/ }),

/***/ "./src/components/unit-control/index.js":
/*!**********************************************!*\
  !*** ./src/components/unit-control/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const NativeUnitControl = ({
  label,
  value,
  onChange,
  mb = '',
  placeholder = '',
  units = [{
    label: 'px',
    value: 'px'
  }, {
    label: 'em',
    value: 'em'
  }, {
    label: 'rem',
    value: 'rem'
  }]
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('native-control-wrapper', {
      [`mb-0`]: mb !== ''
    }),
    style: {
      '--max-width': '80px'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalUnitControl, {
      label: label,
      value: value,
      onChange: value => onChange(value),
      labelPosition: "edge",
      placeholder: placeholder,
      __next40pxDefaultSize: true,
      units: units
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeUnitControl);

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/marque/index": 0,
/******/ 			"blocks/marque/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkgutenlayouts"] = globalThis["webpackChunkgutenlayouts"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/marque/style-index"], () => (__webpack_require__("./src/blocks/marque/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map