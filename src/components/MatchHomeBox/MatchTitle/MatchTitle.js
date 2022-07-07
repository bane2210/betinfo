"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MatchTitle_module_css_1 = __importDefault(require("./MatchTitle.module.css"));
const CountryLogo_1 = __importDefault(require("../../CountryLogo/CountryLogo"));
const matchTitle = (props) => {
    const todayDate = new Date(props.date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // monday tuesday wednesday thursday friday saturday sunday
    //const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayDay = todayDate.getDate();
    const todayMonth = months[todayDate.getMonth()];
    const todayYear = todayDate.getFullYear();
    //const weekDay = weekDays[d.getDay()];
    const str = todayDay + " " + todayMonth + ", " + todayYear;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchTitle_module_css_1.default.mainTitle }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchTitle_module_css_1.default.leftTeam }, { children: props.h })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchTitle_module_css_1.default.middleTitle }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchTitle_module_css_1.default.line }, { children: [" ", (0, jsx_runtime_1.jsx)(CountryLogo_1.default, { co: props.co })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchTitle_module_css_1.default.line + " " + MatchTitle_module_css_1.default.wrap }, { children: [" ", props.co + ", " + props.comp, " "] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchTitle_module_css_1.default.line + " " + MatchTitle_module_css_1.default.d }, { children: [" Date: ", str, " "] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchTitle_module_css_1.default.line + " " + MatchTitle_module_css_1.default.d }, { children: [" Kick-off: ", props.t, " "] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchTitle_module_css_1.default.vs }, { children: "vs" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchTitle_module_css_1.default.rightTeam }, { children: props.a }))] })));
};
exports.default = matchTitle;
