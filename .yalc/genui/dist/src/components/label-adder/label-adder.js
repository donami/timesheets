var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import * as React from 'react';
import styled from 'styled-components';
import Icon from '../icon';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: #ccc 1px solid;\n  padding: 5px;\n  margin-bottom: 10px;\n"], ["\n  border: #ccc 1px solid;\n  padding: 5px;\n  margin-bottom: 10px;\n"])));
var Input = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border: none;\n  outline: none;\n"], ["\n  border: none;\n  outline: none;\n"])));
var LabelList = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var Label = function (_a) {
    var text = _a.text, onRemove = _a.onRemove, className = _a.className;
    return (React.createElement("div", { className: className || '' },
        React.createElement("span", null, text),
        React.createElement("a", { onClick: onRemove },
            React.createElement(Icon, { name: "fas fa-times" }))));
};
var StyledLabel = styled(Label)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 0.8rem;\n  display: inline-block;\n  background: #eee;\n  padding: 6px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  border-radius: 3px;\n\n  span {\n    margin-right: 10px;\n  }\n\n  a {\n    cursor: pointer;\n\n    &:hover {\n      opacity: 0.5;\n    }\n  }\n"], ["\n  font-size: 0.8rem;\n  display: inline-block;\n  background: #eee;\n  padding: 6px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  border-radius: 3px;\n\n  span {\n    margin-right: 10px;\n  }\n\n  a {\n    cursor: pointer;\n\n    &:hover {\n      opacity: 0.5;\n    }\n  }\n"])));
var LabelAdder = /** @class */ (function (_super) {
    __extends(LabelAdder, _super);
    function LabelAdder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Event handler for adding a label
         * Dispatches the onChange prop function with the updated label list
         */
        _this.handleAdd = function (e) {
            e.preventDefault();
            var label = _this.inputElem.value;
            _this.props.onChange && _this.props.onChange(_this.props.labels.concat(label));
            _this.inputElem.value = '';
        };
        /**
         * Event handler for removing a label
         */
        _this.handleRemove = function (index) {
            var newLabels = _this.props.labels.slice(0, index).concat(_this.props.labels.slice(index + 1));
            _this.props.onChange && _this.props.onChange(newLabels);
        };
        return _this;
    }
    LabelAdder.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, null,
            React.createElement(LabelList, null, this.props.labels.map(function (label, key) { return (React.createElement(StyledLabel, { text: label, key: key, onRemove: function () { return _this.handleRemove(key); } })); })),
            React.createElement("form", { onSubmit: this.handleAdd },
                React.createElement(Input, { innerRef: function (input) {
                        _this.inputElem = input;
                    }, placeholder: this.props.placeholder || 'Add new label here...' }))));
    };
    return LabelAdder;
}(React.Component));
export default LabelAdder;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=label-adder.js.map