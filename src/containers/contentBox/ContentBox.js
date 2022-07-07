"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ContentBox_module_css_1 = __importDefault(require("./ContentBox.module.css"));
const react_router_dom_1 = require("react-router-dom");
const MainPage_1 = __importDefault(require("../MainPage/MainPage"));
const SubscribePage_1 = __importDefault(require("../../components/SubscribePage/SubscribePage"));
const ContactPage_1 = __importDefault(require("../../components/ContactPage/ContactPage"));
const Livescore_1 = __importDefault(require("../../components/Livescore/Livescore"));
const Header_1 = __importDefault(require("../../components/Header/Header"));
const LinksPage_1 = __importDefault(require("../../components/LinksPage/LinksPage"));
const ContentBox = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: ContentBox_module_css_1.default.ContentBox }, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, { h: props.h }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(MainPage_1.default, Object.assign({}, props)) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/subscription", element: (0, jsx_runtime_1.jsx)(SubscribePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/contact", element: (0, jsx_runtime_1.jsx)(ContactPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { textAlign: "center" } }, { children: [" ", "You don't need to login at the moment!"] })) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/livescore", element: (0, jsx_runtime_1.jsx)(Livescore_1.default, { content: "livescore" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dropping-odds", element: (0, jsx_runtime_1.jsx)(Livescore_1.default, { content: "odds" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/partner-links", element: (0, jsx_runtime_1.jsx)(LinksPage_1.default, { pageLinks: props.f }) })] })] })));
};
exports.default = ContentBox;
