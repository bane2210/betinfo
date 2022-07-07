"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ContactPage_module_css_1 = __importDefault(require("./ContactPage.module.css"));
const contactPage = () => {
    if (document.getElementById("backdrop") !== null &&
        document.getElementById("body") !== null) {
        document.getElementById("backdrop").style.display = "none";
        document.getElementById("body").style.display = "block";
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: ContactPage_module_css_1.default.contactPage }, { children: ["If you want to share some useful info, if you have some proposals or ideas, or you just have something to tell us, please do not hesitate, write to us\u2026", (0, jsx_runtime_1.jsx)("div", Object.assign({ className: ContactPage_module_css_1.default.Email }, { children: "marketing@betinfo.cc" }))] })));
};
exports.default = contactPage;
