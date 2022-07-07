"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SettingsTicket_module_css_1 = __importDefault(require("./SettingsTicket.module.css"));
const oddsTimeButton_1 = __importDefault(require("./oddsTimeButton/oddsTimeButton"));
const CompetitionsBox_1 = __importDefault(require("./CompetitionsBox/CompetitionsBox"));
const MarketBox_1 = __importDefault(require("./MarketBox/MarketBox"));
const SettingsTicket = (props) => {
    let content;
    let settingsButtons = [];
    let header = "";
    if (props.type === 1) {
        let yesNo;
        header = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: SettingsTicket_module_css_1.default.header }, { children: "Choose approximate odds" }));
        settingsButtons = [
            "1.5",
            "1.7",
            "2",
            "2.5",
            "3",
            "4",
            "5",
            "7",
            "10",
            "15",
            "20",
            "25",
            "30",
            "40",
            "50",
            "60",
            "80",
            "100",
        ];
        content = settingsButtons.map((element, index) => {
            yesNo = false;
            if (props.value[0] === element)
                yesNo = true;
            return ((0, jsx_runtime_1.jsx)(oddsTimeButton_1.default, { yesNo: yesNo, name: element, oddsTimeClick: () => props.oddsTimeClick(element, 1), type: 1 }, index));
        });
    }
    if (props.type === 2) {
        let yesNo;
        header = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: SettingsTicket_module_css_1.default.header }, { children: "Choose kick-off time" }));
        settingsButtons = ["1", "3", "6", "12", "24", "36"];
        content = settingsButtons.map((element, index) => {
            yesNo = false;
            if (props.value[1] === element)
                yesNo = true;
            return ((0, jsx_runtime_1.jsx)(oddsTimeButton_1.default, { yesNo: yesNo, name: element, oddsTimeClick: () => props.oddsTimeClick(element, 2), type: 2 }, index));
        });
    }
    if (props.type === 3) {
        header = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: SettingsTicket_module_css_1.default.header }, { children: "Choose competitions" }));
        content = ((0, jsx_runtime_1.jsx)(CompetitionsBox_1.default, { save: props.saveCompetitions, settingsObjectValue: props.competitionsTicket }));
    }
    if (props.type === 4) {
        header = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: SettingsTicket_module_css_1.default.header }, { children: "Choose Betting Markets" }));
        content = ((0, jsx_runtime_1.jsx)(MarketBox_1.default, { save: props.saveMarket, settingsObjectValue: props.marketTicket }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: SettingsTicket_module_css_1.default.Settings }, { children: [header, content] })));
};
exports.default = SettingsTicket;
