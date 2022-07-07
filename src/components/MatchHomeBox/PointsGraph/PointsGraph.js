"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PointsGraph_module_css_1 = __importDefault(require("./PointsGraph.module.css"));
const pointsGraph = (props) => {
    const brGames = props.g * 3;
    const pts = props.pts / brGames * 100;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: PointsGraph_module_css_1.default.graphBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: PointsGraph_module_css_1.default.backGraph }, { children: brGames + " Pts" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: PointsGraph_module_css_1.default.frontGraph, style: { width: pts + "%" } }, { children: [(0, jsx_runtime_1.jsx)("span", { className: PointsGraph_module_css_1.default.linePts }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: PointsGraph_module_css_1.default.frontPts }, { children: props.pts + " Pts" }))] }))] })));
};
exports.default = pointsGraph;
