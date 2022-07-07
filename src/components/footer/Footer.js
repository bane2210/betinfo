"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Footer_module_css_1 = __importDefault(require("./Footer.module.css"));
const Logo_1 = __importDefault(require("../Logo/Logo"));
const Footer = () => {
    /*
          let c = document.createElement("script");
          c.type = "text/javascript"; c.async = !0; c.id = "CleverCoreLoader48866";  c.setAttribute("data-target",window.name); c.setAttribute("data-callback","put-your-callback-macro-here");
          c.src = "//scripts.cleverwebserver.com/9def35ba40ca680672185b7e6d96a6ae.js";
          let a = !1;
          try {
              a = document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
          } catch (e) {
              a = !1;
          }
          a || ( a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
          a.parentNode.insertBefore(c, a);
          */
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "footerID", className: Footer_module_css_1.default.footer }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Footer_module_css_1.default.footerBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: Footer_module_css_1.default.logoImg }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: Footer_module_css_1.default.copyright }, { children: ["Copyright \u00A9 2019-", new Date().getFullYear(), " betinfo.cc ", (0, jsx_runtime_1.jsx)("br", {}), "Privacy Policy & Cookie Disclaimer | Terms & Conditions, Disclaimer"] }))] })) })));
};
exports.default = Footer;
