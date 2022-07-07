"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SubscribePage_module_css_1 = __importDefault(require("./SubscribePage.module.css"));
const subscribePage = () => {
    if (document.getElementById("backdrop") !== null &&
        document.getElementById("body") !== null) {
        document.getElementById("backdrop").style.display = "none";
        document.getElementById("body").style.display = "block";
    }
    return (window.scrollTo(0, 0),
        (
        // console.log("<subscribePage>"),
        (0, jsx_runtime_1.jsx)("div", Object.assign({ className: SubscribePage_module_css_1.default.SubscribePage }, { children: "Enjoy, there are no subscriptions at the moment!" }))));
};
exports.default = subscribePage;
