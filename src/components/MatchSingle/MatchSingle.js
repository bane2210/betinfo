"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_redux_1 = require("react-redux");
const createSlice_1 = require("../../store/createSlice");
const MatchSingle_module_css_1 = __importDefault(require("./MatchSingle.module.css"));
const AuxAux_1 = __importDefault(require("../AuxAux/AuxAux"));
const react_ga_1 = __importDefault(require("react-ga"));
const MatchSingle = (props) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const openBackdrop = (backdropOBJ) => {
        react_ga_1.default.event({
            category: "Games",
            action: "Clicked",
            label: props.h + " vs " + props.a,
        });
        const yPos = document.getElementById("body").getBoundingClientRect().top;
        /*
        const back = document.getElementById("backdrop");
        if (back !== null) back.style.display = "flex";
        document.getElementById("body").style.display = "none";
        */
        dispatch((0, createSlice_1.backdropAction)({ backdropOBJ: backdropOBJ, yPos: yPos, backVis: 1 }));
        //props.backdropSet(backdropOBJ, yPos);
        /*window.location.hash = "game";*/
    };
    //console.log(props);
    const backdropOBJ = {
        date: props.date.toString(),
        time: props.t,
        home: props.h,
        away: props.a,
        country: props.country,
        competition: props.comp,
        simpleDate: props.simpleDate,
    };
    return ((0, jsx_runtime_1.jsx)(AuxAux_1.default, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchSingle_module_css_1.default.Container, onClick: () => openBackdrop(backdropOBJ) }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchSingle_module_css_1.default.Date }, { children: props.t })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MatchSingle_module_css_1.default.GameInfo }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchSingle_module_css_1.default.homeTeam }, { children: props.h })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchSingle_module_css_1.default.vs }, { children: " vs " })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MatchSingle_module_css_1.default.awayTeam }, { children: props.a }))] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: MatchSingle_module_css_1.default.tooltiptext }, { children: "Click for full details!" }))] })) }));
};
exports.default = MatchSingle;
