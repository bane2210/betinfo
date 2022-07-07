"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SortBy_module_css_1 = __importDefault(require("./SortBy.module.css"));
const sortBy = (props) => {
    let style = SortBy_module_css_1.default.element;
    if (props.current === props.br) {
        style = SortBy_module_css_1.default.element + " " + SortBy_module_css_1.default.Active;
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: style, onClick: props.click }, { children: props.name })));
};
exports.default = sortBy;
