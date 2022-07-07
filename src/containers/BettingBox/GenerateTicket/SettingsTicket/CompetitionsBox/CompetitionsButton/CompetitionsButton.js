"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CompetitionsButton_module_css_1 = __importDefault(require("./CompetitionsButton.module.css"));
const correct_250_png_1 = __importDefault(require("../../../../../../assets/images/correct_250.png"));
const oddsTimeButton = (props) => {
    let style = CompetitionsButton_module_css_1.default.container;
    let name = props.name;
    if (props.value) {
        style = CompetitionsButton_module_css_1.default.container + " " + CompetitionsButton_module_css_1.default.Active;
    }
    let yesNo = "";
    if (props.value) {
        yesNo = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: CompetitionsButton_module_css_1.default.final }, { children: (0, jsx_runtime_1.jsx)("img", { className: CompetitionsButton_module_css_1.default.correct, src: correct_250_png_1.default, alt: "correct" }) })));
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: style, onClick: props.click }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: CompetitionsButton_module_css_1.default.content }, { children: name })), yesNo] })));
};
exports.default = oddsTimeButton;
