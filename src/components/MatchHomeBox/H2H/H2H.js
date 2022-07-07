"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const H2H_module_css_1 = __importDefault(require("./H2H.module.css"));
const TittleTemplateBox_1 = __importDefault(require("../TittleTemplateBox/TittleTemplateBox"));
const H2H = (props) => {
    const [state, setState] = (0, react_1.useState)({
        start: 0,
        end: 6,
    });
    const setStateDefault = (start, end) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { start: start, end: end });
        });
    };
    const load6less = () => {
        const max = props.object.length;
        if (state.end > 6 && state.end !== max) {
            const start = state.start - 6;
            const end = state.end - 6;
            setStateDefault(start, end);
        }
        else if (state.end === max) {
            const start = state.start - 6;
            let end = state.end - (max % 6);
            if (max % 6 === 0) {
                end = state.end - 6;
            }
            setStateDefault(start, end);
        }
    };
    const load6more = () => {
        const max = props.object.length;
        if (state.end + 6 < max) {
            const start = state.start + 6;
            const end = state.end + 6;
            setStateDefault(start, end);
        }
        else if (state.end !== max) {
            const start = state.start + 6;
            const end = max;
            setStateDefault(start, end);
        }
    };
    let temp = "";
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
    let day = "";
    let contentForm = "";
    let contentFormNext = "";
    const teamName = props.name;
    let homeTeamClass = "";
    let awayTeamClass = "";
    let seasonTemp = "";
    let seasonTempArr = [];
    const max = props.object !== null ? props.object.length : 0;
    if (props.object !== null) {
        // Ako je odigrano vise od 8 H2H meceva
        if (props.object.length > 6) {
            contentForm = props.object
                .slice(state.start, state.end)
                .map((element, index) => {
                let temp = new DOMParser().parseFromString(element.awayTeam, "text/html").body.textContent;
                if (temp) {
                    element.awayTeam = temp;
                }
                else {
                    element.awayTeam = "";
                }
                temp = new DOMParser().parseFromString(element.homeTeam, "text/html")
                    .body.textContent;
                if (temp) {
                    element.homeTeam = temp;
                }
                else {
                    element.homeTeam = "";
                }
                dateTemp = new Date(element.gameDate);
                day =
                    dateTemp.getDate() < 10
                        ? "0" + dateTemp.getDate()
                        : dateTemp.getDate().toString();
                if (element.season.includes("/")) {
                    seasonTempArr = element.season.split("/");
                    seasonTemp =
                        seasonTempArr[0].slice(2, seasonTempArr[0].length) +
                            "/" +
                            seasonTempArr[1].slice(2, seasonTempArr[1].length);
                }
                else {
                    seasonTemp = element.season;
                }
                homeTeamClass = H2H_module_css_1.default.teamName;
                awayTeamClass = H2H_module_css_1.default.teamName;
                if (element.homeTeam === teamName) {
                    homeTeamClass = H2H_module_css_1.default.teamName + " " + H2H_module_css_1.default.b;
                    if (element.winnerFT === "h") {
                        temp = H2H_module_css_1.default.W + " " + H2H_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = H2H_module_css_1.default.D + " " + H2H_module_css_1.default.s;
                    }
                    else {
                        temp = H2H_module_css_1.default.L + " " + H2H_module_css_1.default.s;
                    }
                }
                else {
                    awayTeamClass = H2H_module_css_1.default.teamName + " " + H2H_module_css_1.default.b;
                    if (element.winnerFT === "a") {
                        temp = H2H_module_css_1.default.W + " " + H2H_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = H2H_module_css_1.default.D + " " + H2H_module_css_1.default.s;
                    }
                    else {
                        temp = H2H_module_css_1.default.L + " " + H2H_module_css_1.default.s;
                    }
                }
                return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: H2H_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: H2H_module_css_1.default.season }, { children: seasonTemp })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: H2H_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: homeTeamClass }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                " (" +
                                element.homeScoreFirstHalf +
                                "-" +
                                element.awayScoreFirstHalf +
                                ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: awayTeamClass }, { children: element.awayTeam }))] }), index));
            });
            contentFormNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: H2H_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: H2H_module_css_1.default.nextPrev, onClick: load6more }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: H2H_module_css_1.default.nextPrev, onClick: load6less }, { children: "Next >>" }))] })));
        }
        else {
            contentForm = props.object.map((element, index) => {
                dateTemp = new Date(element.gameDate);
                day =
                    dateTemp.getDate() < 10
                        ? "0" + dateTemp.getDate()
                        : dateTemp.getDate().toString();
                if (element.season.includes("/")) {
                    seasonTempArr = element.season.split("/");
                    seasonTemp =
                        seasonTempArr[0].slice(2, seasonTempArr[0].length) +
                            "/" +
                            seasonTempArr[1].slice(2, seasonTempArr[1].length);
                }
                else {
                    seasonTemp = element.season;
                }
                homeTeamClass = H2H_module_css_1.default.teamName;
                awayTeamClass = H2H_module_css_1.default.teamName;
                if (element.homeTeam === teamName) {
                    homeTeamClass = H2H_module_css_1.default.teamName + " " + H2H_module_css_1.default.b;
                    if (element.winnerFT === "h") {
                        temp = H2H_module_css_1.default.W + " " + H2H_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = H2H_module_css_1.default.D + " " + H2H_module_css_1.default.s;
                    }
                    else {
                        temp = H2H_module_css_1.default.L + " " + H2H_module_css_1.default.s;
                    }
                }
                else {
                    awayTeamClass = H2H_module_css_1.default.teamName + " " + H2H_module_css_1.default.b;
                    if (element.winnerFT === "a") {
                        temp = H2H_module_css_1.default.W + " " + H2H_module_css_1.default.s;
                    }
                    else if (element.winnerFT === "d") {
                        temp = H2H_module_css_1.default.D + " " + H2H_module_css_1.default.s;
                    }
                    else {
                        temp = H2H_module_css_1.default.L + " " + H2H_module_css_1.default.s;
                    }
                }
                return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: H2H_module_css_1.default.line }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: H2H_module_css_1.default.season }, { children: seasonTemp })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: H2H_module_css_1.default.date }, { children: day + " " + months[dateTemp.getMonth()] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: homeTeamClass }, { children: element.homeTeam })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: temp }, { children: element.result +
                                " (" +
                                element.homeScoreFirstHalf +
                                "-" +
                                element.awayScoreFirstHalf +
                                ")" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: awayTeamClass }, { children: element.awayTeam }))] }), index));
            });
        }
    }
    else {
        contentForm = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: H2H_module_css_1.default.noH2H }, { children: "There are no available games." })));
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: H2H_module_css_1.default.h2h }, { children: [(0, jsx_runtime_1.jsx)(TittleTemplateBox_1.default, { name: "Head 2 Head" }), contentForm, contentFormNext] })));
};
exports.default = H2H;
