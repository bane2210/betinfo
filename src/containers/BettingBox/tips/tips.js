"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tips_module_css_1 = __importDefault(require("./tips.module.css"));
const gamesCount_1 = __importDefault(require("../gamesCount/gamesCount"));
const tips = (props) => {
    let style = tips_module_css_1.default.TipBlock;
    if (props.current === props.name) {
        style = tips_module_css_1.default.TipBlock + " " + tips_module_css_1.default.Active;
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: style, onClick: props.click }, { children: [props.name, (0, jsx_runtime_1.jsx)(gamesCount_1.default, { isBig: true, count: props.gamesCount })] })));
};
exports.default = tips;
