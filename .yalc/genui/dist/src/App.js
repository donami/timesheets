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
import { injectGlobal } from 'styled-components';
import './App.css';
import logo from './logo.svg';
injectGlobal(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  html {\n    height: 100%;\n  }\n  body {\n    height: 100%;\n    font-size: 12px;\n    font-family: 'Roboto', sans-serif;\n    margin: 0;\n    padding: 0;\n  }\n  #root {\n    height: 100%;\n  }\n"], ["\n  html {\n    height: 100%;\n  }\n  body {\n    height: 100%;\n    font-size: 12px;\n    font-family: 'Roboto', sans-serif;\n    margin: 0;\n    padding: 0;\n  }\n  #root {\n    height: 100%;\n  }\n"])));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", { className: "App" },
            React.createElement("header", { className: "App-header" },
                React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
                React.createElement("h1", { className: "App-title" }, "Welcome to React")),
            React.createElement("p", { className: "App-intro" },
                "To get started, edit ",
                React.createElement("code", null, "src/App.tsx"),
                " and save to reload.")));
    };
    return App;
}(React.Component));
export default App;
var templateObject_1;
//# sourceMappingURL=App.js.map