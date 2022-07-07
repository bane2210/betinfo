"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MatchAwayBox_module_css_1 = __importDefault(require("./MatchAwayBox.module.css"));
const FormAwayBox_1 = __importDefault(require("./FormAwayBox/FormAwayBox"));
const SingleStats_1 = __importDefault(require("./SingleStats/SingleStats"));
const Series_1 = __importDefault(require("../MatchHomeBox/Series/Series"));
const H2H_1 = __importDefault(require("../MatchHomeBox/H2H/H2H"));
const MatchHomeBox = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchAwayBox_module_css_1.default.awayBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "awayTittle", className: MatchAwayBox_module_css_1.default.title }, { children: props.a })), (0, jsx_runtime_1.jsx)(FormAwayBox_1.default, { away: props.awayOBJAway_games, all: props.awayOBJAll_games, name: props.a }), (0, jsx_runtime_1.jsx)(H2H_1.default, { object: props.object, name: props.a }), (0, jsx_runtime_1.jsx)(Series_1.default, { single: props.awayOBJAway, all: props.awayOBJAll, home_away: "Away" }), (0, jsx_runtime_1.jsx)(SingleStats_1.default, { teamName: props.a, awayOBJAway: props.awayOBJAway, awayOBJAll: props.awayOBJAll, awayOBJAway_list: props.awayOBJAway_list, awayOBJAll_list: props.awayOBJAll_list })] })));
};
exports.default = MatchHomeBox;
