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
import styled from 'styled-components';
var StyledLabel = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: 'Roboto', sans-serif;\n  display: inline-block;\n  padding: 2px 6px;\n  border-radius: 20px;\n  color: #fff;\n  font-size: 0.8rem;\n  background: #00b5ad;\n  margin: 0 3px;\n\n  ", ";\n"], ["\n  font-family: 'Roboto', sans-serif;\n  display: inline-block;\n  padding: 2px 6px;\n  border-radius: 20px;\n  color: #fff;\n  font-size: 0.8rem;\n  background: #00b5ad;\n  margin: 0 3px;\n\n  ", ";\n"])), function (props) { return props.color === 'orange' && 'background: #cf590c !important;'; });
var Label = function (_a) {
    var children = _a.children, other = __rest(_a, ["children"]);
    return React.createElement(StyledLabel, __assign({}, other), children);
};
Label.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
};
// Label.defaultProps = {
//   color: null,
// };
export default Label;
var templateObject_1;
//# sourceMappingURL=label.js.map