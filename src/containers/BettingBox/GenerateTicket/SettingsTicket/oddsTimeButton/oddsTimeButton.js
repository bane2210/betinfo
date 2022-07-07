"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const oddsTimeButton_module_css_1 = __importDefault(require("./oddsTimeButton.module.css"));
const correct_250_png_1 = __importDefault(require("../../../../../assets/images/correct_250.png"));
const oddsTimeButton = (props) => {
    let style = oddsTimeButton_module_css_1.default.container;
    let name = props.name;
    if (props.type === 2) {
        name = "Next " + props.name + "h";
    }
    if (props.yesNo) {
        style = oddsTimeButton_module_css_1.default.container + " " + oddsTimeButton_module_css_1.default.Active;
    }
    let yesNo = "";
    if (props.yesNo) {
        yesNo = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: oddsTimeButton_module_css_1.default.final }, { children: (0, jsx_runtime_1.jsx)("img", { className: oddsTimeButton_module_css_1.default.correct, src: correct_250_png_1.default, alt: "correct" }) })));
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: style, onClick: props.oddsTimeClick }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: oddsTimeButton_module_css_1.default.content }, { children: name })), yesNo] })));
};
exports.default = oddsTimeButton;
