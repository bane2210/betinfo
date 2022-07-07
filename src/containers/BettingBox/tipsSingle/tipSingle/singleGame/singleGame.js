"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const singleGame_module_css_1 = __importDefault(require("./singleGame.module.css"));
const wrong_png_1 = __importDefault(require("../../../../../assets/images/wrong.png"));
const correct_250_png_1 = __importDefault(require("../../../../../assets/images/correct_250.png"));
const CountryLogo_1 = __importDefault(require("../../../../../components/CountryLogo/CountryLogo"));
const react_redux_1 = require("react-redux");
const createSlice_1 = require("../../../../../store/createSlice");
const react_ga_1 = __importDefault(require("react-ga"));
const SingleGame = (props) => {
    const [state, setState] = (0, react_1.useState)({ open: false });
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        if (state.open) {
            setState(Object.assign(Object.assign({}, state), { open: false }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const openBackdrop = (backdropOBJ) => {
        react_ga_1.default.event({
            category: "Games",
            action: "Clicked",
            label: `${backdropOBJ.home} vs ${backdropOBJ.away}`,
        });
        const yPos = document.getElementById("body").getBoundingClientRect().top;
        dispatch((0, createSlice_1.backdropAction)({ backdropOBJ: backdropOBJ, yPos: yPos, backVis: 1 }));
        // props.backdropSet(backdropOBJ, yPos);
        /*window.location.hash = "game";*/
    };
    const openClose = () => {
        if (state.open) {
            setState({
                open: false,
            });
        }
        else {
            setState({
                open: true,
            });
        }
    };
    let element = props.element;
    let content = "";
    let final = "";
    let style = "rgba(0,0,0,50%)";
    let time = "";
    let explanation = "";
    let fullDetails = "";
    let result = "";
    const currentDay = new Date(element.colDate + "T" + element.colTime);
    const hours = currentDay.getHours() < 10
        ? "0" + currentDay.getHours()
        : currentDay.getHours();
    const minutes = currentDay.getMinutes() < 10
        ? "0" + currentDay.getMinutes()
        : currentDay.getMinutes();
    time = hours + ":" + minutes;
    if (parseInt(props.element.resultCount) !== -1) {
        if (parseInt(props.element.resultCount) === 1) {
            final = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.final }, { children: (0, jsx_runtime_1.jsx)("img", { className: singleGame_module_css_1.default.correct, src: correct_250_png_1.default, alt: "correct" }) })));
            style = "green";
            result = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.countryComp + " " + singleGame_module_css_1.default.greenRes }, { children: [" ", "Result: ", props.element.result, " "] })));
        }
        else if (parseInt(props.element.resultCount) === 0) {
            final = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.final }, { children: (0, jsx_runtime_1.jsx)("img", { className: singleGame_module_css_1.default.wrong, src: wrong_png_1.default, alt: "wrong" }) })));
            style = "#c10f0f";
            result = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.countryComp + " " + singleGame_module_css_1.default.redRes }, { children: [" ", "Result: ", props.element.result, " "] })));
        }
    }
    if (state.open) {
        const currentDay = new Date(element.colDate + "T" + element.colTime);
        const hours = currentDay.getHours() < 10
            ? "0" + currentDay.getHours()
            : currentDay.getHours();
        const minutes = currentDay.getMinutes() < 10
            ? "0" + currentDay.getMinutes()
            : currentDay.getMinutes();
        let backdropOBJ = {
            date: currentDay.toString(),
            time: hours + ":" + minutes,
            home: element.homeTeam,
            away: element.awayTeam,
            country: element.country,
            competition: element.competition,
            simpleDate: element.date,
        };
        fullDetails = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.FullDetails, onClick: () => openBackdrop(backdropOBJ) }, { children: "Click for full details!" })));
        explanation = element.explanation.split("****").map((element, index) => {
            if (element !== "") {
                return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.explanationLine }, { children: element }), index));
            }
            else
                return null;
        });
    }
    content = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.tipsLineContainer }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.tipsLine, onClick: openClose, style: { border: "1px solid " + style } }, { children: [final, (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.tip }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.flagContainer }, { children: (0, jsx_runtime_1.jsx)(CountryLogo_1.default, { co: element.country }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.GamesLineTop }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.teamNames }, { children: element.homeTeam + " vs " + element.awayTeam })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.tipInner }, { children: element.tip }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.GamesLine }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.chance }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.kickOfMob }, { children: ["Kick-off: ", time] })), "Chance:", " ", (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: singleGame_module_css_1.default.chanceBr }, { children: [" ", element.chance > 94 ? 94 + "%" : element.chance + "%", " "] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.GamesLineBottom }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.kickOf }, { children: ["Kick-off: ", time] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.countryComp }, { children: element.country + " - " + element.competition })), result, (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.explanationTxt }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginRight: "5px" } }, { children: " Explanation " })), " ", state.open ? ((0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-down", "aria-hidden": "true" })) : ((0, jsx_runtime_1.jsx)("i", { style: { fontSize: "11px" }, className: "fa fa-arrow-right", "aria-hidden": "true" }))] }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: singleGame_module_css_1.default.GamesLine }, { children: state.open ? ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: singleGame_module_css_1.default.explanation }, { children: [explanation, fullDetails] }))) : ("") }))] })), (0, jsx_runtime_1.jsx)("div", { className: singleGame_module_css_1.default.dottedLine })] }), props.index));
    return content;
};
exports.default = SingleGame;
