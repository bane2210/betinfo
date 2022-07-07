"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PageCenter_module_css_1 = __importDefault(require("./PageCenter.module.css"));
const react_redux_1 = require("react-redux");
const Sidebar_1 = __importDefault(require("../sidebar/Sidebar"));
const ContentBox_1 = __importDefault(require("../contentBox/ContentBox"));
const Backdrop_1 = __importDefault(require("../../components/Backdrop/Backdrop"));
const PageCenter = ({ s, m, h, f }) => {
    const stateBase = (0, react_redux_1.useSelector)((state) => {
        return state.globalState;
    });
    if (stateBase.backVis === 0) {
        window.scrollTo(0, stateBase.yPos * -1);
    }
    else if (stateBase.backVis === 1) {
        window.scrollTo(0, 0);
    }
    let content = "";
    let content2 = "";
    if (stateBase.backVis === 1 &&
        stateBase.backdrop.date !== "" &&
        stateBase.backdrop.time !== "") {
        content = ((0, jsx_runtime_1.jsx)(Backdrop_1.default, { date: stateBase.backdrop.date, t: stateBase.backdrop.time, h: stateBase.backdrop.home, a: stateBase.backdrop.away, country: stateBase.backdrop.country, comp: stateBase.backdrop.competition, simpleDate: stateBase.backdrop.simpleDate, yPos: stateBase.yPos }));
    }
    else {
        content = (0, jsx_runtime_1.jsx)(Sidebar_1.default, { s: s });
        content2 = (0, jsx_runtime_1.jsx)(ContentBox_1.default, { m: m, h: h, f: f });
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: PageCenter_module_css_1.default.pageCenter }, { children: [content, content2] })));
};
exports.default = PageCenter;
