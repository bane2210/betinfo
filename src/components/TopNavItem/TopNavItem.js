"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const TopNavItem_module_css_1 = __importDefault(require("./TopNavItem.module.css"));
const react_router_dom_1 = require("react-router-dom");
const topNavItem = (props) => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: props.link, className: isActive => "nav-link" + (isActive ? " " + TopNavItem_module_css_1.default.active : "") }, { children: (0, jsx_runtime_1.jsxs)("li", Object.assign({ className: TopNavItem_module_css_1.default.NavigationItem, onClick: props.click }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginRight: "10px", color: "orange" } }, { children: props.icon })), props.name] })) })));
};
exports.default = topNavItem;
