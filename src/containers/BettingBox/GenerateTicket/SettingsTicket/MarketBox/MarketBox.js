"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MarketBox_module_css_1 = __importDefault(require("./MarketBox.module.css"));
const saveButton_1 = __importDefault(require("../saveButton/saveButton"));
const CompetitionsButton_1 = __importDefault(require("../CompetitionsBox/CompetitionsButton/CompetitionsButton"));
const MarketBox = (props) => {
    const [state, setState] = (0, react_1.useState)({
        value: [],
        checkAll: 1,
    });
    (0, react_1.useEffect)(() => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { value: props.settingsObjectValue });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const changeStateObject = (br) => {
        let object = [...state.value];
        if (object[br]["value"] === 1) {
            object[br]["value"] = 0;
        }
        else {
            object[br]["value"] = 1;
        }
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { value: object });
        });
    };
    const checkUncheckAll = () => {
        let object = [...state.value];
        if (state.checkAll === 0) {
            object.forEach((element) => {
                element.value = 1;
            });
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { value: object, checkAll: 1 });
            });
        }
        else {
            object.forEach((element) => {
                element.value = 0;
            });
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { value: object, checkAll: 0 });
            });
        }
    };
    let settingsObjectValue = state.value;
    let content;
    let grupe = "";
    let br = -1;
    content = settingsObjectValue.map((element, index) => {
        br = br + 1;
        let aa = br;
        if (element.group !== grupe) {
            grupe = element.group;
            return [
                (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MarketBox_module_css_1.default.grupe }, { children: element.group }), element.name),
                (0, jsx_runtime_1.jsx)(CompetitionsButton_1.default, { click: () => changeStateObject(aa), name: element.description, value: element.value }, index),
            ];
        }
        else {
            return ((0, jsx_runtime_1.jsx)(CompetitionsButton_1.default, { click: () => changeStateObject(aa), name: element.description, value: element.value }, index));
        }
    });
    let selected = false;
    state.value.forEach((element) => {
        if (element.value === 1)
            selected = true;
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MarketBox_module_css_1.default.Container }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: MarketBox_module_css_1.default.checkAllContainer }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MarketBox_module_css_1.default.checkAllButton, onClick: checkUncheckAll }, { children: state.checkAll ? "Deselect All" : "Select All" })) })), content, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: MarketBox_module_css_1.default.saveContainer }, { children: selected ? ((0, jsx_runtime_1.jsx)(saveButton_1.default, { save: () => props.save(state.value) })) : ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MarketBox_module_css_1.default.errorM }, { children: [" ", "You must select at least one type of bet.", " "] }))) }))] })));
};
exports.default = MarketBox;
