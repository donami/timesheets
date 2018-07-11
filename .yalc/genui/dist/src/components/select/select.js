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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { Transition } from 'react-transition-group';
import styled, { withProps, css } from '../../styled/styled-components';
import Icon from '../icon';
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selected: [],
            active: false,
            filter: '',
            expanded: false,
            dirty: false,
        };
        _this.clickListener = function (event) {
            if (event.target.classList.contains('menu-item') ||
                event.target.classList.contains('select-input')) {
                return;
            }
            if (_this.state.expanded) {
                _this.setState({
                    expanded: false,
                });
            }
        };
        _this.handleSelect = function (item) {
            var selected = _this.state.selected;
            var indexOf = selected
                .map(function (item) { return item.value; })
                .indexOf(item.value);
            var newState = {};
            // If item already is selected, it should be de-selected
            if (indexOf > -1) {
                newState.selected = _this.state.selected.slice(0, indexOf).concat(_this.state.selected.slice(indexOf + 1));
            }
            else {
                // Add item value to selected
                newState.selected = _this.state.selected.concat([item]);
            }
            _this.setState(__assign({}, _this.state, newState, { dirty: true, filter: '' }), function () {
                _this.props.onChange && _this.props.onChange(_this.state.selected);
            });
            _this.inputElem.value = '';
            _this.inputElem.focus();
        };
        _this.handleInputChange = function () {
            _this.setState({ filter: _this.inputElem.value });
        };
        _this.searchFilter = function (item) {
            if (!_this.state.filter.length) {
                return true;
            }
            return (item.label.toLowerCase().indexOf(_this.state.filter.toLowerCase()) > -1);
        };
        return _this;
    }
    Select.prototype.componentWillMount = function () {
        if (this.props.defaultSelected && !this.state.dirty) {
            this.setState({
                selected: this.props.defaultSelected,
            });
        }
    };
    Select.prototype.componentDidMount = function () {
        document.body.addEventListener('click', this.clickListener, false);
    };
    Select.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('click', this.clickListener, false);
    };
    Select.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.defaultSelected && !this.state.dirty) {
            this.setState({
                selected: nextProps.defaultSelected,
            });
        }
    };
    Select.prototype.handleExpand = function (show) {
        this.setState({ expanded: show });
    };
    Select.prototype.render = function () {
        var _this = this;
        var _a = this.state, expanded = _a.expanded, selected = _a.selected, filter = _a.filter, active = _a.active;
        var _b = this.props, items = _b.items, placeholder = _b.placeholder;
        var filteredItems = items.filter(this.searchFilter);
        return (React.createElement(Container, { expanded: expanded, active: active, className: "select-container" },
            selected.map(function (item) { return (React.createElement(Label, { key: item.value, onClick: function () { return _this.handleSelect(item); }, className: "label" },
                item.label,
                " ",
                React.createElement(Icon, { name: "fas fa-times" }))); }),
            React.createElement(Input, { type: "text", className: "select-input", innerRef: function (value) {
                    _this.inputElem = value;
                }, onChange: this.handleInputChange, onFocus: function () {
                    _this.handleExpand(true);
                    _this.setState({ active: true });
                }, onBlur: function () {
                    _this.setState({ active: false });
                } }),
            !selected.length &&
                !filter.length && (React.createElement(Text, { active: active, className: "default-text", onClick: function () {
                    _this.inputElem.focus();
                } }, placeholder ? (React.createElement(React.Fragment, null, placeholder)) : (React.createElement(React.Fragment, null, "Filter...")))),
            React.createElement(HiddenSelect, { name: this.props.name || '', multiple: true, onChange: function () { }, value: this.state.selected.map(function (item) { return item.value; }) }, items.map(function (item, index) { return (React.createElement("option", { value: item.value, key: index }, item.label)); })),
            React.createElement(Transition, { in: expanded, timeout: 500 }, function (state) { return (React.createElement(Menu, { expanded: expanded, active: active, transitionState: state, className: "menu" },
                !filteredItems.length && (React.createElement(NoResults, null, "No results found.")),
                filteredItems.map(function (item, index) { return (React.createElement(MenuItem, { selected: selected.map(function (item) { return item.value; }).indexOf(item.value) > -1, key: index, className: "menu-item", onClick: function () { return _this.handleSelect(item); } }, item.label)); }))); })));
    };
    return Select;
}(React.Component));
var Container = withProps(styled.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  position: relative;\n  border: 1px solid rgba(34, 36, 38, 0.15);\n  border-radius: 5px;\n  margin-bottom: 10px;\n  height: 30px;\n\n  ", "\n  ", "\n"], ["\n  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  position: relative;\n  border: 1px solid rgba(34, 36, 38, 0.15);\n  border-radius: 5px;\n  margin-bottom: 10px;\n  height: 30px;\n\n  ",
    "\n  ",
    "\n"])), function (props) {
    if (props.expanded) {
        return "\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n      ";
    }
    return null;
}, function (props) {
    if (props.active) {
        return "\n        border-color: #96c8da;\n        -webkit-box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);\n        box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);\n      ";
    }
    return "\n      &:hover {\n        border-color: rgba(34, 36, 38, .35);\n      }\n    ";
});
var Label = styled.a(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  display: inline-block;\n  vertical-align: middle;\n  white-space: normal;\n  font-size: 0.7rem;\n  padding: 0.5em 0.8em;\n  margin: 0.14285714rem 0.28571429rem 0.14285714rem 0;\n  -webkit-box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;\n  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;\n  cursor: pointer;\n  -webkit-transition: background 0.1s ease;\n  transition: background 0.1s ease;\n  color: rgba(0, 0, 0, 0.6);\n  text-transform: none;\n  border: 0 solid transparent;\n  border-radius: 0.28571429rem;\n  background-color: #e8e8e8;\n  line-height: 1;\n\n  &:first-of-type {\n    margin-left: 5px;\n  }\n"], ["\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  display: inline-block;\n  vertical-align: middle;\n  white-space: normal;\n  font-size: 0.7rem;\n  padding: 0.5em 0.8em;\n  margin: 0.14285714rem 0.28571429rem 0.14285714rem 0;\n  -webkit-box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;\n  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;\n  cursor: pointer;\n  -webkit-transition: background 0.1s ease;\n  transition: background 0.1s ease;\n  color: rgba(0, 0, 0, 0.6);\n  text-transform: none;\n  border: 0 solid transparent;\n  border-radius: 0.28571429rem;\n  background-color: #e8e8e8;\n  line-height: 1;\n\n  &:first-of-type {\n    margin-left: 5px;\n  }\n"])));
var Input = styled.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: static;\n  top: 0;\n  left: 0;\n  border: 0;\n  outline: none;\n\n  margin-left: 10px;\n  line-height: 100%;\n  background: #fff;\n  height: calc(100% - 2px);\n"], ["\n  position: static;\n  top: 0;\n  left: 0;\n  border: 0;\n  outline: none;\n\n  margin-left: 10px;\n  line-height: 100%;\n  background: #fff;\n  height: calc(100% - 2px);\n"])));
var NoResults = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 0.78571429rem 1.14285714rem !important;\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 0.8rem;\n"], ["\n  padding: 0.78571429rem 1.14285714rem !important;\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 0.8rem;\n"])));
var Text = withProps(styled.div)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  cursor: text;\n  position: absolute;\n  top: 0;\n  left: 10px;\n  color: rgba(191, 191, 191, 0.87);\n  height: 30px;\n  line-height: 30px;\n  font-size: 0.8rem;\n\n  ", "\n"], ["\n  cursor: text;\n  position: absolute;\n  top: 0;\n  left: 10px;\n  color: rgba(191, 191, 191, 0.87);\n  height: 30px;\n  line-height: 30px;\n  font-size: 0.8rem;\n\n  ",
    "\n"])), function (props) {
    if (props.active) {
        return "\n        color: rgba(115, 115, 115, .87);\n      ";
    }
    return "";
});
var Menu = withProps(styled.div)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  position: absolute;\n  background: #fff;\n  width: 100%;\n  border: 1px solid rgba(34, 36, 38, 0.15);\n  border-radius: 5px;\n  border-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  left: -1px;\n  margin-top: 1px;\n  max-height: 0px;\n  overflow: hidden;\n\n  ", "\n\n  ", "\n  \n  ", "\n"], ["\n  position: absolute;\n  background: #fff;\n  width: 100%;\n  border: 1px solid rgba(34, 36, 38, 0.15);\n  border-radius: 5px;\n  border-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  left: -1px;\n  margin-top: 1px;\n  max-height: 0px;\n  overflow: hidden;\n\n  ",
    "\n\n  ",
    "\n  \n  ",
    "\n"])), function (_a) {
    var expanded = _a.expanded;
    return expanded && css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      border: none;\n    "], ["\n      border: none;\n    "])));
}, function (_a) {
    var transitionState = _a.transitionState;
    if (transitionState === 'entering') {
        return css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        opacity: 1;\n        transition: max-height 0.3s ease-in;\n      "], ["\n        opacity: 1;\n        transition: max-height 0.3s ease-in;\n      "])));
    }
    if (transitionState === 'entered') {
        return css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n        max-height: 1000px;\n        opacity: 1;\n        transition: max-height 0.3s ease-in;\n      "], ["\n        max-height: 1000px;\n        opacity: 1;\n        transition: max-height 0.3s ease-in;\n      "])));
    }
    if (transitionState === 'exiting') {
        return css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        max-height: 0;\n        transition: max-height 0.3s ease-out;\n      "], ["\n        max-height: 0;\n        transition: max-height 0.3s ease-out;\n      "])));
    }
    if (transitionState === 'exited') {
        return css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n        max-height: 0;\n        transition: max-height 0.3s ease-out;\n        border: none;\n      "], ["\n        max-height: 0;\n        transition: max-height 0.3s ease-out;\n        border: none;\n      "])));
    }
    return null;
}, function (_a) {
    var active = _a.active;
    return active && css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      border-color: #96c8da;\n      -webkit-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n    "], ["\n      border-color: #96c8da;\n      -webkit-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n    "])));
});
var MenuItem = withProps(styled.a)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  border: none;\n  height: auto;\n  text-align: left;\n  line-height: 1em;\n  font-size: 0.8rem;\n  text-transform: none;\n  font-weight: 400;\n  box-shadow: none;\n  border-top: 1px solid #fafafa;\n  white-space: normal;\n  word-wrap: normal;\n  padding: .78571429rem 1.14285714rem !important;\n  display: block;\n  cursor: pointer;\n  color: rgba(0, 0, 0, .87);\n\n  &:hover {\n    background: rgba(0,0,0,.05);\n    color: rgba(0,0,0,.95);\n  }\n\n  &:first-of-type {\n    border-top: none;\n  }\n\n  ", "\n"], ["\n  border: none;\n  height: auto;\n  text-align: left;\n  line-height: 1em;\n  font-size: 0.8rem;\n  text-transform: none;\n  font-weight: 400;\n  box-shadow: none;\n  border-top: 1px solid #fafafa;\n  white-space: normal;\n  word-wrap: normal;\n  padding: .78571429rem 1.14285714rem !important;\n  display: block;\n  cursor: pointer;\n  color: rgba(0, 0, 0, .87);\n\n  &:hover {\n    background: rgba(0,0,0,.05);\n    color: rgba(0,0,0,.95);\n  }\n\n  &:first-of-type {\n    border-top: none;\n  }\n\n  ",
    "\n"])), function (props) {
    if (props.selected) {
        return "\n        background: rgba(0,0,0,.03);\n        color: rgba(0,0,0,.95);\n      ";
    }
    return "";
});
var HiddenSelect = styled.select(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  display: none !important;\n"], ["\n  display: none !important;\n"])));
export default Select;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
//# sourceMappingURL=select.js.map