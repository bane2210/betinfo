"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const FormAwayBox_module_css_1 = __importDefault(require("./FormAwayBox.module.css"));
const OverallButton_1 = __importDefault(require("../../MatchHomeBox/OverallButton/OverallButton"));
const PointsGraph_1 = __importDefault(require("../../MatchHomeBox/PointsGraph/PointsGraph"));
const LastAwayGames_1 = __importDefault(require("../LastAwayGames/LastAwayGames"));
const FormAwayBox = (props) => {
    const [state, setState] = (0, react_1.useState)({
        all: true,
        single: false,
    });
    const setAll = () => {
        setState(() => {
            return {
                all: true,
                single: false,
            };
        });
    };
    const setAway = () => {
        setState(() => {
            return {
                all: false,
                single: true,
            };
        });
    };
    let contentForm = "";
    const teamName = props.name;
    let brGames = 0;
    let pts = 0;
    if (state.all) {
        let arr = props.all;
        if (arr.length > 0) {
            if (arr.length > 6) {
                brGames = 6;
                contentForm = arr.slice(0, 6).map((element, index) => {
                    if (element.awayTeam === teamName) {
                        if (element.winnerFT === "a") {
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.W + " " + FormAwayBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.D + " " + FormAwayBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.L + " " + FormAwayBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                    else {
                        if (element.winnerFT === "h") {
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.W + " " + FormAwayBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.D + " " + FormAwayBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.L + " " + FormAwayBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                });
            }
            else {
                contentForm = arr.map((element, index) => {
                    if (element.awayTeam === teamName) {
                        if (element.winnerFT === "a") {
                            brGames += 1;
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.W + " " + FormAwayBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            brGames += 1;
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.D + " " + FormAwayBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            brGames += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.L + " " + FormAwayBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                    else {
                        if (element.winnerFT === "h") {
                            brGames += 1;
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.W + " " + FormAwayBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            brGames += 1;
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.D + " " + FormAwayBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            brGames += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.L + " " + FormAwayBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                });
            }
        }
        else {
            contentForm = (0, jsx_runtime_1.jsx)("div", { children: "No matches played." });
            brGames = 0;
            pts = 0;
        }
    }
    else {
        let arr = props.away;
        if (arr.length > 0) {
            if (arr.length > 6) {
                brGames = 6;
                contentForm = arr.slice(0, 6).map((element, index) => {
                    if (element.winnerFT === "a") {
                        pts += 3;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.W + " " + FormAwayBox_module_css_1.default.standard }, { children: "W" }), index));
                    }
                    else if (element.winnerFT === "d") {
                        pts += 1;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.D + " " + FormAwayBox_module_css_1.default.standard }, { children: "D" }), index));
                    }
                    else {
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.L + " " + FormAwayBox_module_css_1.default.standard }, { children: "L" }), index));
                    }
                });
            }
            else {
                contentForm = arr.map((element, index) => {
                    if (element.winnerFT === "a") {
                        brGames += 1;
                        pts += 3;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.W + " " + FormAwayBox_module_css_1.default.standard }, { children: "W" }), index));
                    }
                    else if (element.winnerFT === "d") {
                        brGames += 1;
                        pts += 1;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.D + " " + FormAwayBox_module_css_1.default.standard }, { children: "D" }), index));
                    }
                    else {
                        brGames += 1;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormAwayBox_module_css_1.default.L + " " + FormAwayBox_module_css_1.default.standard }, { children: "L" }), index));
                    }
                });
            }
        }
        else {
            brGames = 0;
            pts = 0;
            contentForm = (0, jsx_runtime_1.jsx)("div", { children: "No matches played." });
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: FormAwayBox_module_css_1.default.formBox }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: FormAwayBox_module_css_1.default.overallButtons }, { children: [(0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.all, click: setAll, name: "All" }), (0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.single, click: setAway, name: "Away" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: FormAwayBox_module_css_1.default.wdl }, { children: ["Form: ", contentForm, brGames > 0 ? (0, jsx_runtime_1.jsx)(PointsGraph_1.default, { g: brGames, pts: pts }) : null] })), (0, jsx_runtime_1.jsx)(LastAwayGames_1.default, { all: props.all, away: props.away, name: teamName })] })));
};
exports.default = FormAwayBox;
