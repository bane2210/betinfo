"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const NavDates_module_css_1 = __importDefault(require("./NavDates.module.css"));
const NavDatesItem_1 = __importDefault(require("../NavDatesItem/NavDatesItem"));
const NavDates = (props) => {
    const [state, setState] = (0, react_1.useState)({
        open: false,
    });
    const openCloseFun = () => {
        if (state.open) {
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { open: false });
            });
        }
        else {
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { open: true });
            });
        }
    };
    const todayDate = new Date();
    const todayDate_min_1 = new Date();
    todayDate_min_1.setDate(todayDate_min_1.getDate() - 1);
    const todayDate_min_2 = new Date();
    todayDate_min_2.setDate(todayDate_min_2.getDate() - 2);
    const todayDate_add_1 = new Date();
    todayDate_add_1.setDate(todayDate_add_1.getDate() + 1);
    const todayDate_add_2 = new Date();
    todayDate_add_2.setDate(todayDate_add_2.getDate() + 2);
    const todayDate_min_3 = new Date();
    todayDate_min_3.setDate(todayDate_min_3.getDate() - 3);
    const todayDate_min_4 = new Date();
    todayDate_min_4.setDate(todayDate_min_4.getDate() - 4);
    const todayDate_min_5 = new Date();
    todayDate_min_5.setDate(todayDate_min_5.getDate() - 5);
    const todayDate_min_6 = new Date();
    todayDate_min_6.setDate(todayDate_min_6.getDate() - 6);
    const todayDate_min_7 = new Date();
    todayDate_min_7.setDate(todayDate_min_7.getDate() - 7);
    const todayDate_min_8 = new Date();
    todayDate_min_8.setDate(todayDate_min_8.getDate() - 8);
    const todayDate_min_9 = new Date();
    todayDate_min_9.setDate(todayDate_min_9.getDate() - 9);
    const todayDate_min_10 = new Date();
    todayDate_min_10.setDate(todayDate_min_10.getDate() - 10);
    const todayDate_min_11 = new Date();
    todayDate_min_11.setDate(todayDate_min_11.getDate() - 11);
    const formatDate = (todayDate) => {
        const todayDay = todayDate.getDate() < 10
            ? "0" + todayDate.getDate()
            : todayDate.getDate();
        const m = todayDate.getMonth() + 1;
        const todayMonth = m < 10 ? "0" + m : m;
        const todayYear = todayDate.getFullYear();
        const finalDate = todayYear + "-" + todayMonth + "-" + todayDay;
        return finalDate;
    };
    // 21 April - Thursday
    const formatName = (d) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        // monday tuesday wednesday thursday friday saturday sunday
        //const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const todayDay = d.getDate();
        const todayMonth = months[d.getMonth()];
        //const weekDay = weekDays[d.getDay()];
        return todayDay + " " + todayMonth;
    };
    let content = "";
    if (!state.open) {
        content = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: NavDates_module_css_1.default.Nav }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: NavDates_module_css_1.default.TopDates }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: NavDates_module_css_1.default.OpenClose, onClick: openCloseFun }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-plus", "aria-hidden": "true" }) })), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_1), date: formatDate(todayDate_min_1), change: props.change, position: props.position, pos: "2" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: "Today", date: formatDate(todayDate), change: props.change, position: props.position, pos: "3" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_add_1), date: formatDate(todayDate_add_1), change: props.change, position: props.position, pos: "4" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_add_2), date: formatDate(todayDate_add_2), change: props.change, position: props.position, pos: "5" })] })) })));
    }
    else {
        content = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: NavDates_module_css_1.default.Nav }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: NavDates_module_css_1.default.TopDates }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: NavDates_module_css_1.default.OpenClose, onClick: openCloseFun }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-minus", "aria-hidden": "true" }) })), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_1), date: formatDate(todayDate_min_1), change: props.change, position: props.position, pos: "2" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: "Today", date: formatDate(todayDate), change: props.change, position: props.position, pos: "3" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_add_1), date: formatDate(todayDate_add_1), change: props.change, position: props.position, pos: "4" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_add_2), date: formatDate(todayDate_add_2), change: props.change, position: props.position, pos: "5" })] })), (0, jsx_runtime_1.jsx)("div", { className: NavDates_module_css_1.default.TopLine }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: NavDates_module_css_1.default.BottomDates }, { children: [(0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_2), date: formatDate(todayDate_min_2), change: props.change, position: props.position, pos: "1" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_3), date: formatDate(todayDate_min_3), change: props.change, position: props.position, pos: "6" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_4), date: formatDate(todayDate_min_4), change: props.change, position: props.position, pos: "7" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_5), date: formatDate(todayDate_min_5), change: props.change, position: props.position, pos: "8" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_6), date: formatDate(todayDate_min_6), change: props.change, position: props.position, pos: "9" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: NavDates_module_css_1.default.BottomDates }, { children: [(0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_7), date: formatDate(todayDate_min_7), change: props.change, position: props.position, pos: "10" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_8), date: formatDate(todayDate_min_8), change: props.change, position: props.position, pos: "11" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_9), date: formatDate(todayDate_min_9), change: props.change, position: props.position, pos: "12" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_10), date: formatDate(todayDate_min_10), change: props.change, position: props.position, pos: "13" }), (0, jsx_runtime_1.jsx)(NavDatesItem_1.default, { name: formatName(todayDate_min_11), date: formatDate(todayDate_min_11), change: props.change, position: props.position, pos: "14" })] }))] })));
    }
    return content;
};
exports.default = NavDates;
