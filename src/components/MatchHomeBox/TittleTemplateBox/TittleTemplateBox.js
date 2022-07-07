"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const TittleTemplateBox_module_css_1 = __importDefault(require("./TittleTemplateBox.module.css"));
const tittleTemplateBox = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: TittleTemplateBox_module_css_1.default.tittleTemplateBox }, { children: [(0, jsx_runtime_1.jsx)("i", { style: { fontSize: "13px" }, className: "fa fa-futbol-o", "aria-hidden": "true" }), " ", props.name] })));
};
exports.default = tittleTemplateBox;
