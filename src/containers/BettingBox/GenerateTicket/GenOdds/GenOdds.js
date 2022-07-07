"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const GenOdds_module_css_1 = __importDefault(require("./GenOdds.module.css"));
const genOdds = (props) => {
    const name = props.name;
    const content = props.content;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: GenOdds_module_css_1.default.genOdds, onClick: props.click }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenOdds_module_css_1.default.topOdds }, { children: name })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenOdds_module_css_1.default.bottomOdds }, { children: content }))] })));
};
exports.default = genOdds;
