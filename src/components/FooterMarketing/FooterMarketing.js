"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const FooterMarketing_module_css_1 = __importDefault(require("./FooterMarketing.module.css"));
const Marketing_1 = __importDefault(require("../Marketing/Marketing"));
const footerMarketing = ({ f }) => {
    // const conntent = '<div style="color: green; margin: 0px 10px;">Partners: </div><div style="min-width: 150px;"><a style="color: blue;" href="https://www.betexplorer.com/" target="_blank" title="Bet Explorer" alt="Bet Explorer" > Bet Explorer </a></div>';
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: FooterMarketing_module_css_1.default.footerMarketing }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: FooterMarketing_module_css_1.default.banerBox }, { children: (0, jsx_runtime_1.jsx)(Marketing_1.default, { m: f, type: "footer" }) })) })));
};
exports.default = footerMarketing;
