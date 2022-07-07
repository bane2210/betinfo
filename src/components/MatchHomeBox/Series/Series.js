"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Series_module_css_1 = __importDefault(require("./Series.module.css"));
const TittleTemplateBox_1 = __importDefault(require("../TittleTemplateBox/TittleTemplateBox"));
const OverallButton_1 = __importDefault(require("../OverallButton/OverallButton"));
const Series = (props) => {
    const [state, setState] = (0, react_1.useState)({
        single: false,
        all: true
    });
    const setAll = () => {
        setState(prevState => {
            return Object.assign(Object.assign({}, prevState), { all: true, single: false });
        });
    };
    const setSingle = () => {
        setState(prevState => {
            return Object.assign(Object.assign({}, prevState), { all: false, single: true });
        });
    };
    const compare = (a, b) => {
        if (a.count > b.count) {
            return -1;
        }
        if (a.count < b.count) {
            return 1;
        }
        return 0;
    };
    let arr = [];
    let ccc = true;
    if (state.single) {
        arr = props.single;
    }
    else {
        arr = props.all;
    }
    let seriesOBJ = [
        { count: arr.btsSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.btsSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Both teams to score (BTTS)" }))] }), "btsSER") },
        { count: arr.winSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.winSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Win" }))] }), "winSER") },
        { count: arr.drawSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.drawSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw" }))] }), "drawSER") },
        { count: arr.loseSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.loseSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Lose" }))] }), "loseSER") },
        { count: arr.win3SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.win3SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Win and over 2.5 goals" }))] }), "win3SER") },
        { count: arr.draw3SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.draw3SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw and over 2.5 goals" }))] }), "draw3SER") },
        { count: arr.lose3SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.lose3SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Lose and over 2.5 goals" }))] }), "lose3SER") },
        { count: arr.btts3SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.btts3SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "BTTS and over 2.5 goals" }))] }), "btts3SER") },
        { count: arr.sinFHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.sinFHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Scored in first half" }))] }), "sinFHSER") },
        { count: arr.btsFHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.btsFHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "BTTS in the first-half" }))] }), "btsFHSER") },
        { count: arr.cleanSSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.cleanSSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Clean sheets" }))] }), "cleanSSER") },
        { count: arr.soemSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.soemSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team scored" }))] }), "soemSER") },
        { count: arr.stgoemSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.stgoemSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team scored twice" }))] }), "stgoemSER") },
        { count: arr.sibhSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.sibhSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Scored in both halves" }))] }), "sibhSER") },
        { count: arr.gibhSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.gibhSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Goal in both halves" }))] }), "gibhSER") },
        { count: arr.leadHTSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.leadHTSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team led at half-time" }))] }), "leadHTSER") },
        { count: arr.loseHTSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.loseHTSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team lost at half-time" }))] }), "loseHTSER") },
        { count: arr.drawHTSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.drawHTSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw at half-time" }))] }), "drawHTSER") },
        { count: arr.over_1_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_1_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 1.5 goals" }))] }), "over_1_5SER") },
        { count: arr.over_2_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_2_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 2.5 goals" }))] }), "over_2_5SER") },
        { count: arr.over_3_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_3_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 3.5 goals" }))] }), "over_3_5SER") },
        { count: arr.over_4_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_4_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 4.5 goals" }))] }), "over_4_5SER") },
        { count: arr.over_5_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_5_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 5.5 goals" }))] }), "over_5_5SER") },
        { count: arr.under_1_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.under_1_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Under 1.5 goals" }))] }), "under_1_5SER") },
        { count: arr.under_2_5SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.under_2_5SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Under 2.5 goals" }))] }), "under_2_5SER") },
        { count: arr.over_0_5_HTSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_0_5_HTSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 0.5 goals at HT" }))] }), "over_0_5_HTSER") },
        { count: arr.over_1_5_HTSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_1_5_HTSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 1.5 goals at HT" }))] }), "over_1_5_HTSER") },
        { count: arr.over_2_5_HTSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_2_5_HTSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 2.5 goals at HT" }))] }), "over_2_5_HTSER") },
        { count: arr.win_BTTSSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.win_BTTSSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team won and BTTS" }))] }), "win_BTTSSER") },
        { count: arr.draw_BTTSSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.draw_BTTSSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw and BTTS" }))] }), "draw_BTTSSER") },
        { count: arr.lose_BTTSSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.lose_BTTSSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team lost and BTTS" }))] }), "lose_BTTSSER") },
        { count: arr.home_homeSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.home_homeSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Win HT - Win FT" }))] }), "home_homeSER") },
        { count: arr.home_drawSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.home_drawSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Win HT - Draw FT" }))] }), "home_drawSER") },
        { count: arr.home_awaySER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.home_awaySER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Win HT - Lose FT" }))] }), "home_awaySER") },
        { count: arr.draw_homeSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.draw_homeSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw HT - Win FT" }))] }), "draw_homeSER") },
        { count: arr.draw_drawSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.draw_drawSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw HT - Draw FT" }))] }), "draw_drawSER") },
        { count: arr.draw_awaySER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.draw_awaySER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw HT - Lose FT" }))] }), "draw_awaySER") },
        { count: arr.away_homeSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.away_homeSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Lose HT - Win FT" }))] }), "away_homeSER") },
        { count: arr.away_drawSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.away_drawSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Lose HT - Draw FT" }))] }), "away_drawSER") },
        { count: arr.away_awaySER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.away_awaySER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Lose HT - Lose FT" }))] }), "away_awaySER") },
        { count: arr.win2SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.win2SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Win and over 1.5 goals" }))] }), "win2SER") },
        { count: arr.draw2SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.draw2SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Draw and over 1.5 goals" }))] }), "draw2SER") },
        { count: arr.lose2SER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.lose2SER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Lose and over 1.5 goals" }))] }), "lose2SER") },
        { count: arr.over_0_5_SHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_0_5_SHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 0.5 goals second half" }))] }), "over_0_5_SHSER") },
        { count: arr.over_1_5_SHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_1_5_SHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 1.5 goals second half" }))] }), "over_1_5_SHSER") },
        { count: arr.over_2_5_SHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.over_2_5_SHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Over 2.5 goals second half" }))] }), "over_2_5_SHSER") },
        { count: arr.BTTS_SHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.BTTS_SHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "BTTS in the second half" }))] }), "BTTS_SHSER") },
        { count: arr.sinSHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.sinSHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "Team Scored over 0.5 in SH" }))] }), "sinSHSER") },
        { count: arr.more_FHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.more_FHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "More goals in the first half" }))] }), "more_FHSER") },
        { count: arr.more_SHSER, content: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.Series }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.count }, { children: arr.more_SHSER })), (0, jsx_runtime_1.jsx)("i", { style: { margin: "5px" }, className: "fa fa-long-arrow-right", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.txt }, { children: "More goals in the second half" }))] }), "more_SHSER") },
    ];
    seriesOBJ.sort(compare);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.SeriesBox }, { children: [(0, jsx_runtime_1.jsx)(TittleTemplateBox_1.default, { name: "Series" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Series_module_css_1.default.overallButtons }, { children: [(0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.all, click: setAll, name: "All" }), (0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.single, click: setSingle, name: props.home_away })] })), seriesOBJ.map(element => {
                if (element.count > 3) {
                    ccc = false;
                    return element.content;
                }
                else
                    return null;
            }), ccc ? (0, jsx_runtime_1.jsx)("div", Object.assign({ className: Series_module_css_1.default.noSeries }, { children: "No interesting series at this moment." })) : null] })));
};
exports.default = Series;
