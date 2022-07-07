"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const BackdropClose_module_css_1 = __importDefault(require("./BackdropClose.module.css"));
const red_cross_png_1 = __importDefault(require("../../assets/images/red-cross.png"));
const BackdropClose = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "closeButton", className: BackdropClose_module_css_1.default.CloseButton, onClick: props.click }, { children: (0, jsx_runtime_1.jsx)("img", { className: BackdropClose_module_css_1.default.CloseSign, src: red_cross_png_1.default, alt: "close" }) })));
};
exports.default = BackdropClose;
