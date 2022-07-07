"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tipSingle_module_css_1 = __importDefault(require("./tipSingle.module.css"));
const gamesCount_1 = __importDefault(require("../../gamesCount/gamesCount"));
const TipSingle = (props) => {
    let style = tipSingle_module_css_1.default.TipBlock;
    if (props.current === props.nameSQL) {
        style = tipSingle_module_css_1.default.TipBlock + " " + tipSingle_module_css_1.default.Active;
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: style, onClick: props.click }, { children: [props.name, (0, jsx_runtime_1.jsx)(gamesCount_1.default, { isBig: false, count: props.br })] })));
};
exports.default = TipSingle;
