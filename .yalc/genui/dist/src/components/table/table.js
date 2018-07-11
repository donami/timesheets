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
import * as _ from 'lodash';
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.render = function () {
        var _a = this.props, headings = _a.headings, items = _a.items;
        return (React.createElement(StyledTable, null,
            React.createElement("thead", null,
                React.createElement("tr", null, headings.map(function (heading) { return React.createElement("th", { key: heading }, heading); }))),
            React.createElement("tbody", null, items.map(function (item, index) {
                return (React.createElement("tr", { key: index }, headings.map(function (heading, index) {
                    var headingKey = _.camelCase(heading);
                    if (!item[headingKey]) {
                        console.warn('Missing item property mapped in table component.');
                    }
                    var cellContent = item[headingKey];
                    if (typeof item[headingKey] === 'function') {
                        cellContent = item[headingKey](item);
                        return React.createElement("td", { key: index }, item[headingKey](item));
                    }
                    return React.createElement("td", { key: index }, cellContent || '');
                })));
            }))));
    };
    return Table;
}(React.Component));
var StyledTable = styled.table(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: #ccc 1px solid;\n  margin-bottom: 20px;\n  width: 100%;\n  border-radius: 0.3rem;\n  text-align: left;\n  border-collapse: collapse;\n\n  a {\n    color: #0366d6;\n    text-decoration: none;\n  }\n\n  th,\n  td {\n    padding: 0.8em;\n  }\n\n  th {\n    background: #f9fafb;\n    border-bottom: 1px solid #ccc;\n  }\n"], ["\n  border: #ccc 1px solid;\n  margin-bottom: 20px;\n  width: 100%;\n  border-radius: 0.3rem;\n  text-align: left;\n  border-collapse: collapse;\n\n  a {\n    color: #0366d6;\n    text-decoration: none;\n  }\n\n  th,\n  td {\n    padding: 0.8em;\n  }\n\n  th {\n    background: #f9fafb;\n    border-bottom: 1px solid #ccc;\n  }\n"])));
export default Table;
var templateObject_1;
//# sourceMappingURL=table.js.map