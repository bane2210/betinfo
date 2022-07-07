"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const FormBox_module_css_1 = __importDefault(require("./FormBox.module.css"));
const OverallButton_1 = __importDefault(require("../OverallButton/OverallButton"));
const PointsGraph_1 = __importDefault(require("../PointsGraph/PointsGraph"));
const LastGames_1 = __importDefault(require("../LastHomeGames/LastGames"));
const FormBox = (props) => {
    const [state, setState] = (0, react_1.useState)({
        all: true,
        single: false,
    });
    const setAll = () => {
        setState(prevState => {
            return Object.assign(Object.assign({}, prevState), { all: true, single: false });
        });
    };
    const setHome = () => {
        setState(prevState => {
            return Object.assign(Object.assign({}, prevState), { all: false, single: true });
        });
    };
    let contentForm = "";
    const teamName = props.name;
    let brGames = 0;
    let pts = 0;
    if (state.all && props.all.length > 0 && props.home.length > 0) {
        let arr = props.all;
        if (arr.length > 0) {
            if (arr.length > 6) {
                brGames = 6;
                contentForm = arr.slice(0, 6).map((element, index) => {
                    if (element.homeTeam === teamName) {
                        if (element.winnerFT === "h") {
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.W + " " + FormBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.D + " " + FormBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.L + " " + FormBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                    else {
                        if (element.winnerFT === "a") {
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.W + " " + FormBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.D + " " + FormBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.L + " " + FormBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                });
            }
            else {
                contentForm = arr.map((element, index) => {
                    if (element.homeTeam === teamName) {
                        if (element.winnerFT === "h") {
                            brGames += 1;
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.W + " " + FormBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            brGames += 1;
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.D + " " + FormBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            brGames += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.L + " " + FormBox_module_css_1.default.standard }, { children: "L" }), index));
                        }
                    }
                    else {
                        if (element.winnerFT === "a") {
                            brGames += 1;
                            pts += 3;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.W + " " + FormBox_module_css_1.default.standard }, { children: "W" }), index));
                        }
                        else if (element.winnerFT === "d") {
                            brGames += 1;
                            pts += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.D + " " + FormBox_module_css_1.default.standard }, { children: "D" }), index));
                        }
                        else {
                            brGames += 1;
                            return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.L + " " + FormBox_module_css_1.default.standard }, { children: "L" }), index));
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
        let arr = props.home;
        if (arr.length > 0) {
            if (arr.length > 6) {
                brGames = 6;
                contentForm = arr.slice(0, 6).map((element, index) => {
                    if (element.winnerFT === "h") {
                        pts += 3;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.W + " " + FormBox_module_css_1.default.standard }, { children: "W" }), index));
                    }
                    else if (element.winnerFT === "d") {
                        pts += 1;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.D + " " + FormBox_module_css_1.default.standard }, { children: "D" }), index));
                    }
                    else {
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.L + " " + FormBox_module_css_1.default.standard }, { children: "L" }), index));
                    }
                });
            }
            else {
                contentForm = arr.map((element, index) => {
                    if (element.winnerFT === "h") {
                        brGames += 1;
                        pts += 3;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.W + " " + FormBox_module_css_1.default.standard }, { children: "W" }), index));
                    }
                    else if (element.winnerFT === "d") {
                        brGames += 1;
                        pts += 1;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.D + " " + FormBox_module_css_1.default.standard }, { children: "D" }), index));
                    }
                    else {
                        brGames += 1;
                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: FormBox_module_css_1.default.L + " " + FormBox_module_css_1.default.standard }, { children: "L" }), index));
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
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: FormBox_module_css_1.default.formBox }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: FormBox_module_css_1.default.overallButtons }, { children: [(0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.all, click: setAll, name: "All" }), (0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.single, click: setHome, name: "Home" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: FormBox_module_css_1.default.wdl }, { children: ["Form: ", contentForm, brGames > 0 ? (0, jsx_runtime_1.jsx)(PointsGraph_1.default, { g: brGames, pts: pts }) : null] })), (0, jsx_runtime_1.jsx)(LastGames_1.default, { all: props.all, home: props.home, name: teamName })] })));
};
exports.default = FormBox;
