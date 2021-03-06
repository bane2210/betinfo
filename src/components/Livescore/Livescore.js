"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Livescore = (props) => {
    let live = "";
    if (props.content === "odds") {
        live = '<iframe class="dropping_odds_big" style="width: 99%; margin: 0px 0px 0px 0px;" src="http://www.oddstake.com/widgets/dropping-odds-widget.php" width="300" height="1000" frameborder="0"></iframe>';
    }
    else if (props.content === 'livescore') {
        live = '<iframe id="iframe-livescore-box" style="min-height: 800px;" src="https://www.fctables.com/livescore_feed/d882c42646772e4d7ca519bd1/" width="100%" height="100%" frameborder="0" scrolling="yes"><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: auto; line-height: 0;" class="mce_SELRES_start">﻿</span></iframe><a href="https://www.fctables.com/livescore/">FcTables.com</a>';
        /*        window.addEventListener("DOMContentLoaded", () => {
                    (() => {
                        let a = window.addEventListener ? "addEventListener" : "attachEvent";
                        let b = window[a];
                        console.log(window[a]);
                        let c = "attachEvent" === a ? "onmessage" : "message";
                        let d = document.getElementById("iframe-livescore-box");
                        b (c, (a) => {
                            console.log(a);
                            let b = JSON.parse(a.data);
                            d.style.height = b.height + "px";
                            
                        }, !1)
                    })()
                }, !1); */
    }
    return (window.scrollTo(0, 0),
        (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: live } }));
};
exports.default = Livescore;
