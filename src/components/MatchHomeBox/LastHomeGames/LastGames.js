"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const LastGames_module_css_1 = __importDefault(require("./LastGames.module.css"));
const OverallButton_1 = __importDefault(require("../OverallButton/OverallButton"));
const TittleTemplateBox_1 = __importDefault(require("../TittleTemplateBox/TittleTemplateBox"));
const LastGames = (props) => {
    const [state, setState] = react_1.default.useState({
        all: true,
        single: false,
        start: 0,
        end: 8,
        minHeight: 0,
    });
    const reference = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setState(prevState => {
            return Object.assign(Object.assign({}, prevState), { minHeight: reference.current.offsetHeight });
        });
    }, []);
    const setStateDefault = (start, end) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { start: start, end: end });
        });
    };
    const load8less = () => {
        const max = state.all ? props.all.length : props.home.length;
        if (state.end > 8 && state.end !== max) {
            const start = state.start - 8;
            const end = state.end - 8;
            setStateDefault(start, end);
        }
        else if (state.end === max) {
            const start = state.start - 8;
            let end = state.end - (max % 8);
            if (max % 8 === 0) {
                end = state.end - 8;
            }
            setStateDefault(start, end);
        }
    };
    const load8more = () => {
        const max = state.all ? props.all.length : props.home.length;
        if (state.end + 8 < max) {
            const start = state.start + 8;
            const end = state.end + 8;
            setStateDefault(start, end);
        }
        else if (state.end !== max) {
            const start = state.start + 8;
            const end = max;
            setStateDefault(start, end);
        }
    };
    const setAll = () => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { all: true, single: false, start: 0, end: 8 });
        });
    };
    const setHome = () => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { all: false, single: true, start: 0, end: 8 });
        });
    };
    let temp = "";
    let contentForm = "";
    let contentFormNext = "";
    let dateTemp = null;
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const teamName = props.name;
    let day = "";
    const max = state.all ? props.all.length : props.home.length;
    if (state.all) {
        let arr = props.all;
        if (arr.length > 0) {
            if (arr.length > 8) {
                contentForm = arr
                    .slice(state.start, state.end)
                    .map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.homeTeam === teamName) {
                        if (element.winnerFT === "h") {
                            temp = LastGames_module_css_1.default.W + " " + LastGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastGames_module_css_1.default.D + " " + LastGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastGames_module_css_1.default.L + " " + LastGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName + " " + LastGames_module_css_1.default.b }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName }, { children: element.awayTeam }))] }), index));
                    }
                    else {
                        if (element.winnerFT === "a") {
                            temp = LastGames_module_css_1.default.W + " " + LastGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastGames_module_css_1.default.D + " " + LastGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastGames_module_css_1.default.L + " " + LastGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName + " " + LastGames_module_css_1.default.b }, { children: element.awayTeam }))] }), index));
                    }
                });
                contentFormNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: LastGames_module_css_1.default.nextPrev, onClick: load8more }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: LastGames_module_css_1.default.nextPrev, onClick: load8less }, { children: "Next >>" }))] })));
            }
            else {
                contentForm = arr.map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.homeTeam === teamName) {
                        if (element.winnerFT === "h") {
                            temp = LastGames_module_css_1.default.W + " " + LastGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastGames_module_css_1.default.D + " " + LastGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastGames_module_css_1.default.L + " " + LastGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName + " " + LastGames_module_css_1.default.b }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName }, { children: element.awayTeam }))] }), index));
                    }
                    else {
                        if (element.winnerFT === "a") {
                            temp = LastGames_module_css_1.default.W + " " + LastGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastGames_module_css_1.default.D + " " + LastGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastGames_module_css_1.default.L + " " + LastGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName + " " + LastGames_module_css_1.default.b }, { children: element.awayTeam }))] }), index));
                    }
                });
            }
        }
        else {
            contentForm = (0, jsx_runtime_1.jsx)("div", { children: "No matches played." });
        }
    }
    else {
        let arr = props.home;
        if (arr.length > 0) {
            if (arr.length > 8) {
                contentForm = arr
                    .slice(state.start, state.end)
                    .map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.winnerFT === "h") {
                        temp = LastGames_module_css_1.default.W + " " + LastGames_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = LastGames_module_css_1.default.D + " " + LastGames_module_css_1.default.s;
                    }
                    else {
                        temp = LastGames_module_css_1.default.L + " " + LastGames_module_css_1.default.s;
                    }
                    day =
                        dateTemp.getDate() < 10
                            ? "0" + dateTemp.getDate()
                            : dateTemp.getDate().toString();
                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName + " " + LastGames_module_css_1.default.b }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                    " (" +
                                    element.homeScoreFirstHalf +
                                    "-" +
                                    element.awayScoreFirstHalf +
                                    ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName }, { children: element.awayTeam }))] }), index));
                });
                contentFormNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: LastGames_module_css_1.default.nextPrev, onClick: load8more }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: LastGames_module_css_1.default.nextPrev, onClick: load8less }, { children: "Next >>" }))] })));
            }
            else {
                contentForm = arr.map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.winnerFT === "h") {
                        temp = LastGames_module_css_1.default.W + " " + LastGames_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = LastGames_module_css_1.default.D + " " + LastGames_module_css_1.default.s;
                    }
                    else {
                        temp = LastGames_module_css_1.default.L + " " + LastGames_module_css_1.default.s;
                    }
                    day =
                        dateTemp.getDate() < 10
                            ? "0" + dateTemp.getDate()
                            : dateTemp.getDate().toString();
                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName + " " + LastGames_module_css_1.default.b }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                    " (" +
                                    element.homeScoreFirstHalf +
                                    "-" +
                                    element.awayScoreFirstHalf +
                                    ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastGames_module_css_1.default.teamName }, { children: element.awayTeam }))] }), index));
                });
            }
        }
        else {
            contentForm = (0, jsx_runtime_1.jsx)("div", { children: "No matches played." });
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.lastGamesBox }, { children: [(0, jsx_runtime_1.jsx)(TittleTemplateBox_1.default, { name: "Previous Results" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastGames_module_css_1.default.overallButtons }, { children: [(0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.all, click: setAll, name: "All" }), (0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.single, click: setHome, name: "Home" })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: reference, className: LastGames_module_css_1.default.lastGamesAllLines, style: { height: state.minHeight ? state.minHeight : "auto" } }, { children: contentForm })), contentFormNext] })));
};
exports.default = LastGames;
