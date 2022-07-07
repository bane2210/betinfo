"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CountrySingle_module_css_1 = __importDefault(require("./CountrySingle.module.css"));
const CountryLogo_1 = __importDefault(require("../CountryLogo/CountryLogo"));
const countrySingle = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: CountrySingle_module_css_1.default.Container }, { children: [(0, jsx_runtime_1.jsx)(CountryLogo_1.default, { co: props.co }), props.c] })));
};
exports.default = countrySingle;
