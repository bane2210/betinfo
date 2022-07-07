"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Marketing_module_css_1 = __importDefault(require("./Marketing.module.css"));
const marketing = ({ m }) => {
    //        <div className={classes.baner} dangerouslySetInnerHTML={{__html: props.m}} />
    return ((0, jsx_runtime_1.jsx)("div", { className: Marketing_module_css_1.default.baner, dangerouslySetInnerHTML: { __html: m } }));
};
exports.default = marketing;
