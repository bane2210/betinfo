"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const NavDatesItem_module_css_1 = __importDefault(require("./NavDatesItem.module.css"));
const navDatesItem = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: parseInt(props.pos) === props.position
            ? NavDatesItem_module_css_1.default.activ
            : NavDatesItem_module_css_1.default.Items, onClick: () => props.change(props.date, props.pos) }, { children: props.name })));
};
exports.default = navDatesItem;
