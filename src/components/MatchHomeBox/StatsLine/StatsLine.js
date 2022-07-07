"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StatsLine_module_css_1 = __importDefault(require("./StatsLine.module.css"));
const StatsLine = (props) => {
    const [state, setState] = (0, react_1.useState)({
        open: false,
        arr: [],
    });
    const styleCalc = (x) => {
        if (x < 40)
            return "gray";
        else if (x < 60)
            return "black";
        else if (x < 81)
            return "#7fad5b";
        else
            return "#008000";
    };
    const toglleOpen = () => {
        if (state.open) {
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { open: false });
            });
        }
        else {
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { open: true });
            });
        }
    };
    let br = props.br;
    const txt = props.txt;
    let gameList = null;
    let day = null;
    let dateTemp = null;
    let style = {};
    let temp = "";
    const teamName = props.teamName;
    let teamNameHome = StatsLine_module_css_1.default.teamName;
    let teamNameAway = StatsLine_module_css_1.default.teamName;
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
    let gamesListArr = props.gameList.reverse();
    if (gamesListArr.length > 0 && state.open) {
        gameList = gamesListArr.map((element, index) => {
            dateTemp = new Date(element.gameDate);
            day =
                dateTemp.getDate() < 10
                    ? "0" + dateTemp.getDate()
                    : dateTemp.getDate();
            teamNameHome = StatsLine_module_css_1.default.teamName;
            teamNameAway = StatsLine_module_css_1.default.teamName;
            if (props.homeAll === "H") {
                teamNameHome = StatsLine_module_css_1.default.teamName + " " + StatsLine_module_css_1.default.b;
                if (element.winnerFT === "h") {
                    temp = StatsLine_module_css_1.default.W + " " + StatsLine_module_css_1.default.s;
                }
                else if (element.winnerFT === "d") {
                    temp = StatsLine_module_css_1.default.D + " " + StatsLine_module_css_1.default.s;
                }
                else {
                    temp = StatsLine_module_css_1.default.L + " " + StatsLine_module_css_1.default.s;
                }
            }
            else {
                if (element.homeTeam === teamName) {
                    teamNameHome = StatsLine_module_css_1.default.teamName + " " + StatsLine_module_css_1.default.b;
                    if (element.winnerFT === "h") {
                        temp = StatsLine_module_css_1.default.W + " " + StatsLine_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = StatsLine_module_css_1.default.D + " " + StatsLine_module_css_1.default.s;
                    }
                    else {
                        temp = StatsLine_module_css_1.default.L + " " + StatsLine_module_css_1.default.s;
                    }
                }
                else {
                    teamNameAway = StatsLine_module_css_1.default.teamName + " " + StatsLine_module_css_1.default.b;
                    if (element.winnerFT === "a") {
                        temp = StatsLine_module_css_1.default.W + " " + StatsLine_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = StatsLine_module_css_1.default.D + " " + StatsLine_module_css_1.default.s;
                    }
                    else {
                        temp = StatsLine_module_css_1.default.L + " " + StatsLine_module_css_1.default.s;
                    }
                }
            }
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: StatsLine_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: teamNameHome }, { children: element.homeTeam })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: temp }, { children: [" ", element.result +
                                " (" +
                                element.homeScoreFirstHalf +
                                "-" +
                                element.awayScoreFirstHalf +
                                ")"] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: teamNameAway }, { children: element.awayTeam }))] }), index));
        });
    }
    if (gamesListArr.length === 0 && props.setList) {
        style = { opacity: "0.4" };
    }
    else if (!props.setList) {
        style = { visibility: "hidden" };
    }
    let content = "";
    if (br === "NaN")
        br = "0%";
    if (state.open) {
        content = ((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: StatsLine_module_css_1.default.StatsLine, onClick: toglleOpen }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.a }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { color: styleCalc(br) }, className: StatsLine_module_css_1.default.br }, { children: br + "%" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.txtContainer }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.txt }, { children: [" ", txt, " "] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: StatsLine_module_css_1.default.bottomBorder }, { children: (0, jsx_runtime_1.jsx)("span", { style: { width: br + "%" } }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.List, style: style }, { children: [" ", "List", " ", (0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-down", "aria-hidden": "true" })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: StatsLine_module_css_1.default.gameList }, { children: gameList }))] })));
    }
    else {
        if (gamesListArr.length > 0) {
            content = ((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: StatsLine_module_css_1.default.StatsLine, onClick: toglleOpen }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { color: styleCalc(br) }, className: StatsLine_module_css_1.default.br }, { children: br + "%" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.txtContainer }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.txt }, { children: [" ", txt, " "] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: StatsLine_module_css_1.default.bottomBorder }, { children: (0, jsx_runtime_1.jsx)("span", { style: { width: br + "%" } }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.List, style: style }, { children: [" ", "List", " ", (0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-right", "aria-hidden": "true" })] }))] })));
        }
        else {
            if (props.setList) {
                content = ((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: StatsLine_module_css_1.default.StatsLine }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: StatsLine_module_css_1.default.br }, { children: "0%" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.txtContainer }, { children: [" ", txt, " "] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.List, style: style }, { children: [" ", "List", " ", (0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-right", "aria-hidden": "true" })] }))] })));
            }
            else {
                content = ((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: StatsLine_module_css_1.default.StatsLine }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: StatsLine_module_css_1.default.br }, { children: br })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.txtContainer }, { children: [" ", txt, " "] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: StatsLine_module_css_1.default.List, style: style }, { children: [" ", "List", " ", (0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-right", "aria-hidden": "true" })] }))] })));
            }
        }
    }
    return content;
};
exports.default = StatsLine;
