"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const LastAwayGames_module_css_1 = __importDefault(require("./LastAwayGames.module.css"));
const OverallButton_1 = __importDefault(require("../../MatchHomeBox/OverallButton/OverallButton"));
const TittleTemplateBox_1 = __importDefault(require("../../MatchHomeBox/TittleTemplateBox/TittleTemplateBox"));
const LastAwayGames = (props) => {
    const [state, setState] = (0, react_1.useState)({
        all: true,
        single: false,
        start: 0,
        end: 8,
        minHeight: 0,
    });
    const reference = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // console.log(reference);
        let temp = 0;
        if (reference.current !== null) {
            temp = reference.current.offsetHeight;
        }
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { minHeight: temp });
        });
    }, []);
    const setStateDefault = (start, end) => {
        setState((s) => {
            return Object.assign(Object.assign({}, s), { start: start, end: end });
        });
    };
    const load8less = () => {
        const max = state.all ? props.all.length : props.away.length;
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
        const max = state.all ? props.all.length : props.away.length;
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
        setState((state) => {
            return Object.assign(Object.assign({}, state), { all: true, single: false, start: 0, end: 8 });
        });
    };
    const setAway = () => {
        setState((state) => {
            return Object.assign(Object.assign({}, state), { all: false, single: true, start: 0, end: 8 });
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
    const max = state.all ? props.all.length : props.away.length;
    if (state.all) {
        let arr = props.all;
        if (arr.length > 0) {
            if (arr.length > 8) {
                contentForm = arr
                    .slice(state.start, state.end)
                    .map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.awayTeam === teamName) {
                        if (element.winnerFT === "a") {
                            temp = LastAwayGames_module_css_1.default.W + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastAwayGames_module_css_1.default.D + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastAwayGames_module_css_1.default.L + " " + LastAwayGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName + " " + LastAwayGames_module_css_1.default.b }, { children: element.awayTeam }))] }), index));
                    }
                    else {
                        if (element.winnerFT === "h") {
                            temp = LastAwayGames_module_css_1.default.W + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastAwayGames_module_css_1.default.D + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastAwayGames_module_css_1.default.L + " " + LastAwayGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName + " " + LastAwayGames_module_css_1.default.b }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName }, { children: element.awayTeam }))] }), index));
                    }
                });
                contentFormNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: LastAwayGames_module_css_1.default.nextPrev, onClick: load8more }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: LastAwayGames_module_css_1.default.nextPrev, onClick: load8less }, { children: "Next >>" }))] })));
            }
            else {
                contentForm = arr.map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.awayTeam === teamName) {
                        if (element.winnerFT === "a") {
                            temp = LastAwayGames_module_css_1.default.W + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastAwayGames_module_css_1.default.D + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastAwayGames_module_css_1.default.L + " " + LastAwayGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName + " " + LastAwayGames_module_css_1.default.b }, { children: element.awayTeam }))] }), index));
                    }
                    else {
                        if (element.winnerFT === "h") {
                            temp = LastAwayGames_module_css_1.default.W + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else if (element.winnerFT === "d") {
                            temp = LastAwayGames_module_css_1.default.D + " " + LastAwayGames_module_css_1.default.s;
                        }
                        else {
                            temp = LastAwayGames_module_css_1.default.L + " " + LastAwayGames_module_css_1.default.s;
                        }
                        day =
                            dateTemp.getDate() < 10
                                ? "0" + dateTemp.getDate()
                                : dateTemp.getDate().toString();
                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName + " " + LastAwayGames_module_css_1.default.b }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                        " (" +
                                        element.homeScoreFirstHalf +
                                        "-" +
                                        element.awayScoreFirstHalf +
                                        ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName }, { children: element.awayTeam }))] }), index));
                    }
                });
            }
        }
        else {
            contentForm = (0, jsx_runtime_1.jsx)("div", { children: "No matches played." });
        }
    }
    else {
        let arr = props.away;
        if (arr.length > 0) {
            if (arr.length > 8) {
                contentForm = arr
                    .slice(state.start, state.end)
                    .map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.winnerFT === "a") {
                        temp = LastAwayGames_module_css_1.default.W + " " + LastAwayGames_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = LastAwayGames_module_css_1.default.D + " " + LastAwayGames_module_css_1.default.s;
                    }
                    else {
                        temp = LastAwayGames_module_css_1.default.L + " " + LastAwayGames_module_css_1.default.s;
                    }
                    day =
                        dateTemp.getDate() < 10
                            ? "0" + dateTemp.getDate()
                            : dateTemp.getDate().toString();
                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                    " (" +
                                    element.homeScoreFirstHalf +
                                    "-" +
                                    element.awayScoreFirstHalf +
                                    ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName + " " + LastAwayGames_module_css_1.default.b }, { children: element.awayTeam }))] }), index));
                });
                contentFormNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: LastAwayGames_module_css_1.default.nextPrev, onClick: load8more }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: LastAwayGames_module_css_1.default.nextPrev, onClick: load8less }, { children: "Next >>" }))] })));
            }
            else {
                contentForm = arr.map((element, index) => {
                    dateTemp = new Date(element.gameDate);
                    if (element.winnerFT === "a") {
                        temp = LastAwayGames_module_css_1.default.W + " " + LastAwayGames_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = LastAwayGames_module_css_1.default.D + " " + LastAwayGames_module_css_1.default.s;
                    }
                    else {
                        temp = LastAwayGames_module_css_1.default.L + " " + LastAwayGames_module_css_1.default.s;
                    }
                    day =
                        dateTemp.getDate() < 10
                            ? "0" + dateTemp.getDate()
                            : dateTemp.getDate().toString();
                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                    " (" +
                                    element.homeScoreFirstHalf +
                                    "-" +
                                    element.awayScoreFirstHalf +
                                    ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: LastAwayGames_module_css_1.default.teamName + " " + LastAwayGames_module_css_1.default.b }, { children: element.awayTeam }))] }), index));
                });
            }
        }
        else {
            contentForm = (0, jsx_runtime_1.jsx)("div", { children: "No matches played." });
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.lastGamesBox }, { children: [(0, jsx_runtime_1.jsx)(TittleTemplateBox_1.default, { name: "Previous Results" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: LastAwayGames_module_css_1.default.overallButtons }, { children: [(0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.all, click: setAll, name: "All" }), (0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.single, click: setAway, name: "Away" })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: LastAwayGames_module_css_1.default.lastGamesAllLines, ref: reference, style: { height: state.minHeight ? state.minHeight : "auto" } }, { children: contentForm })), contentFormNext] })));
};
exports.default = LastAwayGames;
