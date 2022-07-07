"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tipsLine_module_css_1 = __importDefault(require("./tipsLine.module.css"));
const wrong_png_1 = __importDefault(require("../../../../assets/images/wrong.png"));
const correct_250_png_1 = __importDefault(require("../../../../assets/images/correct_250.png"));
const TipsLine = (props) => {
    const [state, setState] = (0, react_1.useState)({
        open: false
    });
    const openClose = () => {
        if (state.open) {
            setState(() => {
                return {
                    open: false
                };
            });
        }
        else {
            setState(() => {
                return {
                    open: true
                };
            });
        }
    };
    let content = "";
    let final = "";
    let style = "white";
    let opacityStyle = "1.0";
    if (props.final !== null) {
        if (props.final) {
            final = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.final }, { children: (0, jsx_runtime_1.jsx)("img", { className: tipsLine_module_css_1.default.correct, src: correct_250_png_1.default, alt: "correct" }) }));
            style = "green";
        }
        else {
            final = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.final }, { children: (0, jsx_runtime_1.jsx)("img", { className: tipsLine_module_css_1.default.wrong, src: wrong_png_1.default, alt: "wrong" }) }));
            style = "#c10f0f";
            opacityStyle = "0.3";
        }
    }
    if (state.open) {
        let explanation = props.explanation.map((element, index) => {
            return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.explanationLine }, { children: element }), index);
        });
        content = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.tipsLineContainer }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsLine_module_css_1.default.tipsLine, onClick: openClose, style: { border: "1px solid " + style } }, { children: [final, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.tip }, { children: props.tip })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsLine_module_css_1.default.chance }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.chanceBack }, { children: (0, jsx_runtime_1.jsx)("div", { style: { width: props.chance + "%", opacity: opacityStyle }, className: tipsLine_module_css_1.default.chanceFront }) })), "Chance: ", (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: tipsLine_module_css_1.default.chanceBr }, { children: [" ", props.chance + "%", " "] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsLine_module_css_1.default.explanationTxt }, { children: ["Explanation ", (0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-down", "aria-hidden": "true" })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.explanation }, { children: explanation }))] })) }));
    }
    else {
        content = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.tipsLineContainer }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsLine_module_css_1.default.tipsLine, onClick: openClose, style: { border: "1px solid " + style } }, { children: [final, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.tip }, { children: props.tip })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsLine_module_css_1.default.chance }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsLine_module_css_1.default.chanceBack }, { children: (0, jsx_runtime_1.jsx)("div", { style: { width: props.chance + "%", opacity: opacityStyle }, className: tipsLine_module_css_1.default.chanceFront }) })), "Chance: ", (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: tipsLine_module_css_1.default.chanceBr }, { children: [" ", props.chance + "%", " "] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsLine_module_css_1.default.explanationTxt }, { children: ["Explanation ", (0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-right", "aria-hidden": "true" })] }))] })) }));
    }
    return (content);
};
exports.default = TipsLine;
