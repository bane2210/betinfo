"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_module_css_1 = __importDefault(require("./Header.module.css"));
const Marketing_1 = __importDefault(require("../Marketing/Marketing"));
const header = (props) => {
    console.log(props.h);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ "data-testid": 'headerTest', className: Header_module_css_1.default.Header }, { children: props.h === "" ? null : (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Header_module_css_1.default.headerMarketing }, { children: (0, jsx_runtime_1.jsx)(Marketing_1.default, { m: props.h, type: "" }) })) })));
};
exports.default = header;
