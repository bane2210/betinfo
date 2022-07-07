"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const OverallButton_module_css_1 = __importDefault(require("./OverallButton.module.css"));
const overallButton = (props) => {
    let cls = OverallButton_module_css_1.default.button;
    if (props.o) {
        cls = OverallButton_module_css_1.default.button + " " + OverallButton_module_css_1.default.active;
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: cls, onClick: props.click }, { children: props.name })));
};
exports.default = overallButton;
