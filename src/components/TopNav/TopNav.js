"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TopNav_module_css_1 = __importDefault(require("./TopNav.module.css"));
const Logo_1 = __importDefault(require("../Logo/Logo"));
const TopNavItem_1 = __importDefault(require("../TopNavItem/TopNavItem"));
const react_router_dom_1 = require("react-router-dom");
const TopNav = () => {
    const [state, setState] = (0, react_1.useState)({
        open: false,
        close: false
    });
    const closeFun = () => {
        setState({ open: false, close: true });
    };
    const openFun = () => {
        setState({ open: true, close: false });
    };
    const toggleFun = () => {
        if (state.open) {
            setState({ open: false, close: true });
        }
        else {
            setState({ open: true, close: false });
        }
    };
    // window.scrollTo(0, 0);
    let classVar = TopNav_module_css_1.default.NavigationItems;
    if (state.open) {
        classVar = TopNav_module_css_1.default.NavigationItems + " " + TopNav_module_css_1.default.open;
    }
    else if (state.close) {
        classVar = TopNav_module_css_1.default.NavigationItems + " " + TopNav_module_css_1.default.close;
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: TopNav_module_css_1.default.TopNav }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: TopNav_module_css_1.default.topNavCont }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: TopNav_module_css_1.default.shortLogo }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: TopNav_module_css_1.default.Icon, onClick: toggleFun }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-bars" }) })), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: classVar }, { children: [(0, jsx_runtime_1.jsx)(TopNavItem_1.default, { icon: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-home", "aria-hidden": "true" }), link: "/", exact: true, name: "Home", click: closeFun }), (0, jsx_runtime_1.jsx)(TopNavItem_1.default, { icon: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-unlock-alt", "aria-hidden": "true" }), link: "/subscription", exact: true, name: "Subscribe", click: closeFun }), (0, jsx_runtime_1.jsx)(TopNavItem_1.default, { icon: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-envelope-o", "aria-hidden": "true" }), link: "/contact", exact: true, name: "Contact", click: closeFun }), (0, jsx_runtime_1.jsx)(TopNavItem_1.default, { icon: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-sign-in", "aria-hidden": "true" }), link: "/login", exact: true, name: "Login", click: closeFun })] }))] })) })));
};
exports.default = TopNav;
