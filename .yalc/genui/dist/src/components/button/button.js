var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
var sizes = {
    mini: '0.78571429rem',
    tiny: '0.85714286rem',
    small: '0.92857143rem',
    medium: '1rem',
    large: '1.14285714rem',
    big: '1.28571429rem',
    huge: '1.42857143rem',
    massive: '1.71428571rem',
};
var size = function (_a) {
    var size = _a.size;
    if (size) {
        return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      font-size: ", ";\n    "], ["\n      font-size: ", ";\n    "])), sizes[size]);
    }
    return null;
};
var useIcon = function (_a) {
    var useIcon = _a.useIcon;
    if (useIcon) {
        return "\n      padding: 0.78571429em 0.78571429em 0.78571429em;\n\n      i,\n      svg {\n        height: 0.85714286em;\n        -webkit-transition: opacity 0.1s ease;\n        transition: opacity 0.1s ease;\n        opacity: 0.9;\n        margin: 0 !important;\n        vertical-align: top;\n      }\n    ";
    }
    return null;
};
var circular = function (_a) {
    var circular = _a.circular;
    if (circular) {
        return "\n      border-radius: 10em;\n\n      i,\n      svg {\n        width: 1em;\n        vertical-align: baseline;\n      }\n    ";
    }
    return null;
};
var color = function (_a) {
    var color = _a.color;
    switch (color) {
        case 'blue':
            return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        background-color: #2185d0;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "], ["\n        background-color: #2185d0;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "])));
        case 'red':
            return css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        background-color: #db2828;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "], ["\n        background-color: #db2828;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "])));
        case 'teal':
            return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        background-color: #00b5ad;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "], ["\n        background-color: #00b5ad;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "])));
        case 'green':
            return css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        background-color: #21ba45;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "], ["\n        background-color: #21ba45;\n        color: #fff;\n        text-shadow: none;\n        background-image: none;\n      "])));
        default:
            return null;
    }
};
var disabled = function (_a) {
    var disabled = _a.disabled;
    if (disabled) {
        return css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      cursor: default;\n      opacity: 0.45 !important;\n      background-image: none !important;\n      -webkit-box-shadow: none !important;\n      box-shadow: none !important;\n      pointer-events: none !important;\n    "], ["\n      cursor: default;\n      opacity: 0.45 !important;\n      background-image: none !important;\n      -webkit-box-shadow: none !important;\n      box-shadow: none !important;\n      pointer-events: none !important;\n    "])));
    }
    return null;
};
var StyledButton = styled.button(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 0.8rem;\n  cursor: pointer;\n  display: inline-block;\n  min-height: 1em;\n  outline: 0;\n  border: none;\n  vertical-align: baseline;\n  background: #e0e1e2 none;\n  color: rgba(0, 0, 0, 0.6);\n  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  margin: 0 0.25em 0 0;\n  padding: 0.78571429em 1.5em 0.78571429em;\n  text-transform: none;\n  text-shadow: none;\n  font-weight: 300;\n  line-height: 1em;\n  font-style: normal;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 0.28571429rem;\n  -webkit-box-shadow: 0 0 0 1px transparent inset,\n    0 0 0 0 rgba(34, 36, 38, 0.15) inset;\n  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-transition: opacity 0.1s ease, background-color 0.1s ease,\n    color 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;\n  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,\n    background 0.1s ease, -webkit-box-shadow 0.1s ease;\n  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,\n    box-shadow 0.1s ease, background 0.1s ease;\n  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,\n    box-shadow 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;\n  will-change: '';\n  -webkit-tap-highlight-color: transparent;\n  overflow: visible;\n\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n"], ["\n  font-size: 0.8rem;\n  cursor: pointer;\n  display: inline-block;\n  min-height: 1em;\n  outline: 0;\n  border: none;\n  vertical-align: baseline;\n  background: #e0e1e2 none;\n  color: rgba(0, 0, 0, 0.6);\n  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  margin: 0 0.25em 0 0;\n  padding: 0.78571429em 1.5em 0.78571429em;\n  text-transform: none;\n  text-shadow: none;\n  font-weight: 300;\n  line-height: 1em;\n  font-style: normal;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 0.28571429rem;\n  -webkit-box-shadow: 0 0 0 1px transparent inset,\n    0 0 0 0 rgba(34, 36, 38, 0.15) inset;\n  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-transition: opacity 0.1s ease, background-color 0.1s ease,\n    color 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;\n  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,\n    background 0.1s ease, -webkit-box-shadow 0.1s ease;\n  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,\n    box-shadow 0.1s ease, background 0.1s ease;\n  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,\n    box-shadow 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;\n  will-change: '';\n  -webkit-tap-highlight-color: transparent;\n  overflow: visible;\n\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n"])), disabled, color, circular, useIcon, size);
var Button = function (_a) {
    var children = _a.children, onClick = _a.onClick, other = __rest(_a, ["children", "onClick"]);
    return (React.createElement(StyledButton, __assign({ onClick: onClick }, other), children));
};
Button.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    circular: PropTypes.bool,
    useIcon: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};
Button.defaultProps = {
    useIcon: false,
    color: '',
    size: '',
    disabled: false,
    circular: false,
    onClick: function () { },
};
export default Button;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=button.js.map