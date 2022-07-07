"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Sidebar_module_css_1 = __importDefault(require("./Sidebar.module.css"));
const Marketing_1 = __importDefault(require("../../components/Marketing/Marketing"));
const react_router_dom_1 = require("react-router-dom");
const Logo_1 = __importDefault(require("../../components/Logo/Logo"));
const Sidebar = ({ s }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Sidebar_module_css_1.default.Sidebar }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Sidebar_module_css_1.default.SidebarTop }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Sidebar_module_css_1.default.logoImg }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) })) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/livescore" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Sidebar_module_css_1.default.livescore }, { children: "Livescore" })) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/dropping-odds" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Sidebar_module_css_1.default.livescore }, { children: "Dropping Odds" })) })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, Object.assign({ to: "/partner-links" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Sidebar_module_css_1.default.livescore }, { children: "Partners" })), (0, jsx_runtime_1.jsx)("br", {})] })), s === "" ? null : (0, jsx_runtime_1.jsx)(Marketing_1.default, { m: s, type: "" })] })));
};
exports.default = Sidebar;
