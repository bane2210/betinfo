"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Logo_module_css_1 = __importDefault(require("./Logo.module.css"));
const logo_png_1 = __importDefault(require("../../assets/images/logo.png"));
const logo = () => {
    return ((0, jsx_runtime_1.jsx)("img", { className: Logo_module_css_1.default.logo, src: logo_png_1.default, alt: "logo" }));
};
exports.default = logo;
