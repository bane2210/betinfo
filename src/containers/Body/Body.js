"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Body_module_css_1 = __importDefault(require("./Body.module.css"));
const PageCenter_1 = __importDefault(require("../PageCenter/PageCenter"));
const TopNav_1 = __importDefault(require("../../components/TopNav/TopNav"));
const Footer_1 = __importDefault(require("../../components/footer/Footer"));
const axios_1 = __importDefault(require("axios"));
const FooterMarketing_1 = __importDefault(require("../../components/FooterMarketing/FooterMarketing"));
const react_redux_1 = require("react-redux");
const createSlice_1 = require("../../store/createSlice");
const Body = () => {
    const [state, setState] = (0, react_1.useState)({
        header: "",
        middle: "",
        sidebar: "",
        footer: "",
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        // 2020-03-09
        const url = "/eng/api_stats/loadMarketing.php";
        axios_1.default.get(url).then((response) => {
            if ("header" in response.data) {
                setState(prevState => {
                    return Object.assign(Object.assign({}, prevState), { header: response.data.header, middle: response.data.middle, sidebar: response.data.left, footer: response.data.footer });
                });
            }
        });
        const addEvent = (e) => {
            if (e.key === "Escape" || e.key === "Esc") {
                // window.scrollTo(0, 0 - props.yPos);
                dispatch((0, createSlice_1.closeBackdrop)({
                    backdropOBJ: {
                        date: "",
                        time: "",
                        home: "",
                        away: "",
                        country: "",
                        competition: "",
                        simpleDate: "",
                    },
                    backVis: 0,
                }));
            }
        };
        document.body.addEventListener("keydown", addEvent);
        return () => {
            document.body.removeEventListener("keydown", addEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    window.onscroll = () => {
        if (window.pageYOffset > 800) {
            document.getElementById("goToTop").style.display = "flex";
        }
        else {
            document.getElementById("goToTop").style.display = "none";
        }
    };
    const goToTopClicked = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    // Razdvajamo linkove za footer i posebnu stranicu
    let footerLinks = "";
    let pageLinks = "";
    if (state.footer.includes("<!-- Footer Links  -->")) {
        footerLinks = state.footer.split("<!-- Footer Links  -->")[1];
        pageLinks = state.footer.split("<!-- Footer Links  -->")[0];
    }
    else {
        footerLinks = state.footer;
        pageLinks = state.footer;
    }
    let goToTop = ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "goToTop", className: Body_module_css_1.default.scrollTop, onClick: goToTopClicked }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa fa-arrow-up", "aria-hidden": "true" }) })));
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function (event) {
        // window.history.go(1);
        /*
        document.getElementById("backdrop").style.display = "none";
        document.getElementById("body").style.display = "block";
        */
        // window.scrollTo(0, 0 - xx);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(TopNav_1.default, {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "body", className: Body_module_css_1.default.bodyApp }, { children: (0, jsx_runtime_1.jsx)(PageCenter_1.default, { s: state.sidebar, m: state.middle, h: state.header, f: pageLinks }) })), goToTop, (0, jsx_runtime_1.jsx)(FooterMarketing_1.default, { f: footerLinks }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
};
/*
const mapStateToProps = state => ({
    backdropOBJ: state.backdrop,
    yPos: state.yPos
})
*/
exports.default = Body;
