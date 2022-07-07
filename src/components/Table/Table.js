"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Table.css");
const Table = (props) => {
    const setTable = () => {
        const tableFull = document.getElementsByClassName("allTableContainer")[0];
        if (tableFull.style.display === "none" || tableFull.style.display === "") {
            tableFull.style.display = "block";
            document.getElementById("closeButton").style.display = "none";
            document.getElementById("arrowUp").style.display = "none";
            document.getElementById("arrowDown").style.display = "inline-block";
        }
        else {
            tableFull.style.display = "none";
            document.getElementById("closeButton").style.display = "block";
            document.getElementById("arrowUp").style.display = "inline-block";
            document.getElementById("arrowDown").style.display = "none";
        }
    };
    let html = props.table;
    html = html.replace('<div style="width: 100%;"><div style="width: 100%; padding: 0px 0px 0px 20px;">', '<div class="legendContainer"><div style="width: 100%; padding: 0px 0px 0px 20px;">');
    let content = (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: html } });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [content, (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "tableBottom", onClick: setTable }, { children: [" ", "Table", (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "arrowUp", style: { marginLeft: "10px", display: "inline-block" } }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-arrow-up", "aria-hidden": "true" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "arrowDown", style: { marginLeft: "10px", display: "none" } }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-arrow-down", "aria-hidden": "true" }) }))] }))] }));
};
exports.default = Table;
