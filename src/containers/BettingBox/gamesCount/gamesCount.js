"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const gamesCount_module_css_1 = __importDefault(require("./gamesCount.module.css"));
const gamesCount = (props) => {
    let style = "17px";
    if (props.isBig) {
        style = "22px";
    }
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: style }, className: gamesCount_module_css_1.default.gamesCount }, { children: props.count }));
};
exports.default = gamesCount;
