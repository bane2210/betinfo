"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const percCount_module_css_1 = __importDefault(require("./percCount.module.css"));
const percCount = (props) => {
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: percCount_module_css_1.default.percCount }, { children: props.text }));
};
exports.default = percCount;
