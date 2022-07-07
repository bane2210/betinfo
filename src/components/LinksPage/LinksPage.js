"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const LinksPage_module_css_1 = __importDefault(require("./LinksPage.module.css"));
const linksPage = (props) => {
    let content = ((0, jsx_runtime_1.jsx)("div", { className: LinksPage_module_css_1.default.allLinks, dangerouslySetInnerHTML: { __html: props.pageLinks } }));
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LinksPage_module_css_1.default.linksContainer }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: LinksPage_module_css_1.default.header }, { children: "Partners" })), content] })));
};
exports.default = linksPage;
