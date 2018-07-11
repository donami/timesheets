var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled from 'styled-components';
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.render = function () {
        var _a = this.props, title = _a.title, children = _a.children;
        return (React.createElement(StyledBox, null,
            React.createElement(BoxTitle, null, title),
            React.createElement(BoxContent, null, children)));
    };
    return Box;
}(React.Component));
var StyledBox = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: 'Roboto', sans-serif;\n  border: #ccc 1px solid;\n  margin-bottom: 20px;\n"], ["\n  font-family: 'Roboto', sans-serif;\n  border: #ccc 1px solid;\n  margin-bottom: 20px;\n"])));
var BoxTitle = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px;\n  text-transform: uppercase;\n  font-weight: 300;\n  border-bottom: 2px solid #007dcc;\n"], ["\n  padding: 10px;\n  text-transform: uppercase;\n  font-weight: 300;\n  border-bottom: 2px solid #007dcc;\n"])));
var BoxContent = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 10px;\n"], ["\n  padding: 10px;\n"])));
export default Box;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=box.js.map