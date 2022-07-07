"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const saveButton_module_css_1 = __importDefault(require("./saveButton.module.css"));
const saveButton = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: saveButton_module_css_1.default.checkAllButton, onClick: props.save }, { children: "Save" })));
};
exports.default = saveButton;
