"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tipsSingle_module_css_1 = __importDefault(require("./tipsSingle.module.css"));
const tipSingle_1 = __importDefault(require("./tipSingle/tipSingle"));
const singleGame_1 = __importDefault(require("../tipsSingle/tipSingle/singleGame/singleGame"));
const Spinner_1 = __importDefault(require("../../../components/Spinner/Spinner"));
const OverallButton_1 = __importDefault(require("../../../components/MatchHomeBox/OverallButton/OverallButton"));
const react_ga_1 = __importDefault(require("react-ga"));
const percCount_1 = __importDefault(require("../percCount/percCount"));
const SortBy_1 = __importDefault(require("../SortBy/SortBy"));
const TipsSingle = (props) => {
    const [state, setState] = (0, react_1.useState)({
        tips: "",
        start: 0,
        end: 6,
        recomended: true,
        couldTry: false,
        sortBy: 1,
    });
    (0, react_1.useEffect)(() => {
        let find = false;
        if (!props.isTop) {
            props.arrTips.forEach((element) => {
                if (state.tips === element)
                    find = true;
            });
            if (find === false) {
                setState((prevState) => {
                    return Object.assign(Object.assign({}, prevState), { tips: props.arrTips[0], start: 0, end: 6, sortBy: 1, recomended: true, couldTry: false });
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.arrTips]);
    /*
   
    useEffect(() => {
      setState((prevState) => {
        return {
          ...prevState,
          start: 0,
          end: 6,
          sortBy: 1,
          recomended: true,
          couldTry: false,
        };
      });
    }, [state.tips]);
  
    useEffect(() => {
      setState((prevState) => {
        return {
          ...prevState,
          start: 0,
          end: 6,
          sortBy: 1,
        };
      });
    }, [state.recomended]);
  */
    /*
      componentDidUpdate(prevProps, prevState) {
  
      }
      */
    const setSort = (br) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { sortBy: br, start: 0, end: 6 });
        });
    };
    const setTips = (name) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { tips: name, sortBy: 1, start: 0, end: 6, recomended: true, couldTry: false });
        });
    };
    const setRecomended = () => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { recomended: true, couldTry: false, start: 0, end: 6, sortBy: 1 });
        });
    };
    const setCouldTry = () => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { recomended: false, couldTry: true, start: 0, end: 6, sortBy: 1 });
        });
    };
    const setStateDefaulf = (start, end) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { start: start, end: end });
        });
    };
    const load6less = (max) => {
        window.scroll(0, document.getElementById("mainPage").offsetTop - 50);
        if (state.end > 6 && state.end !== max) {
            const start = state.start - 6;
            const end = state.end - 6;
            setStateDefaulf(start, end);
        }
        else if (state.end === max) {
            const start = state.start - 6;
            let end = state.end - (max % 6);
            if (max % 6 === 0) {
                end = state.end - 6;
            }
            setStateDefaulf(start, end);
        }
    };
    const load6more = (max) => {
        window.scroll(0, document.getElementById("mainPage").offsetTop - 50);
        if (state.end + 6 < max) {
            const start = state.start + 6;
            const end = state.end + 6;
            setStateDefaulf(start, end);
        }
        else if (state.end !== max) {
            const start = state.start + 6;
            const end = max;
            setStateDefaulf(start, end);
        }
    };
    const borderArray = props.borderArray;
    let contentTips = "";
    let contentGamesInner = "";
    let sqlContent = props.sqlContent;
    let arrTips = props.arrTips;
    let arrNames = props.arrNames;
    let i = -1;
    let arrImutable = [];
    let arr = [];
    let contentNext = "";
    const isTop = props.isTop;
    let sortElements = "";
    if (state.tips !== "") {
        react_ga_1.default.event({
            category: "Tips",
            action: "Clicked",
            label: state.tips,
        });
    }
    if (arrTips.length > 0 && !isTop) {
        let br = 0;
        contentTips = arrTips.map((element, index) => {
            i++;
            for (let ii = 0; ii < sqlContent.length; ii++) {
                if (sqlContent[ii].name === arrTips[i]) {
                    br = sqlContent[ii].content.length;
                    break;
                }
            }
            const brName = arrTips[i];
            return ((0, jsx_runtime_1.jsx)(tipSingle_1.default, { br: br, current: state.tips, nameSQL: arrTips[i], name: arrNames[i], click: () => setTips(brName) }, index));
        });
    }
    if (sqlContent.length > 0) {
        if (!isTop) {
            sortElements = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.SortByLine }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsSingle_module_css_1.default.label }, { children: "Sort By:" })), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Chance", br: 1, click: () => setSort(1) }, "Chance"), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Kick-Off", br: 2, click: () => setSort(2) }, "Time"), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Series", br: 5, click: () => setSort(5) }, "Series")] })));
            sqlContent.forEach((element, index) => {
                if (element.name === state.tips) {
                    if (element.content.length > 0) {
                        arrImutable = element.content;
                    }
                }
            });
            // colTime: "18:00+02:00"
            // arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);
            if (state.sortBy === 1) {
                arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);
            }
            else if (state.sortBy === 2) {
                let tempDateA;
                let tempDateB;
                arr = [...arrImutable].sort((a, b) => {
                    tempDateA = new Date(a.colDate + "T" + a.colTime);
                    tempDateB = new Date(b.colDate + "T" + b.colTime);
                    if (tempDateA.getTime() > tempDateB.getTime())
                        return 1;
                    else if (tempDateA.getTime() === tempDateB.getTime()) {
                        return parseInt(b.chance) - parseInt(a.chance);
                    }
                    else
                        return -1;
                });
            }
            else if (state.sortBy === 3) {
                arr = [...arrImutable].sort((a, b) => parseInt(a.tip) < parseInt(b.tip) ? 1 : -1);
            }
            else if (state.sortBy === 4) {
                arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total) < parseInt(b["series"].h_a_total)
                    ? 1
                    : -1);
            }
            else if (state.sortBy === 5) {
                arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total_all) <
                    parseInt(b["series"].h_a_total_all)
                    ? 1
                    : -1);
            }
        }
        else {
            arr = [];
            sortElements = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.SortByLine }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsSingle_module_css_1.default.label }, { children: "Sort By:" })), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Chance", br: 1, click: () => setSort(1) }, "Chance"), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Kick-Off", br: 2, click: () => setSort(2) }, "Time"), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Tips", br: 3, click: () => setSort(3) }, "Tips"), (0, jsx_runtime_1.jsx)(SortBy_1.default, { current: state.sortBy, name: "Series", br: 5, click: () => setSort(5) }, "Series")] })));
            sqlContent.forEach((element) => {
                if (element.content.length > 0) {
                    element.content.forEach((el) => {
                        if (parseInt(el.chance) >= 80) {
                            arrImutable.push(el);
                        }
                    });
                }
            });
            // arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);
            // colTime: "18:00+02:00"
            if (state.sortBy === 1) {
                arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);
            }
            else if (state.sortBy === 2) {
                let tempDateA;
                let tempDateB;
                arr = [...arrImutable].sort((a, b) => {
                    tempDateA = new Date(a.colDate + "T" + a.colTime);
                    tempDateB = new Date(b.colDate + "T" + b.colTime);
                    return tempDateA.getTime() > tempDateB.getTime() ? 1 : -1;
                });
            }
            else if (state.sortBy === 3) {
                arr = [...arrImutable].sort((a, b) => parseInt(a.tip) < parseInt(b.tip) ? 1 : -1);
            }
            else if (state.sortBy === 4) {
                arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total) < parseInt(b["series"].h_a_total)
                    ? 1
                    : -1);
            }
            else if (state.sortBy === 5) {
                arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total_all) <
                    parseInt(b["series"].h_a_total_all)
                    ? 1
                    : -1);
            }
        }
    }
    const recomendedArr = [];
    const couldTryArr = [];
    let border = 91;
    if (!isTop) {
        borderArray.forEach((element) => {
            if (element.name === state.tips) {
                border = element.br;
            }
        });
    }
    let playedRec = 0;
    let wonRec = 0;
    let playedTry = 0;
    let wonTry = 0;
    arr.forEach((element) => {
        if (parseInt(element.chance) >= border) {
            if (parseInt(element.resultCount) !== -1) {
                playedRec++;
                if (parseInt(element.resultCount) === 1) {
                    wonRec++;
                }
            }
            recomendedArr.push(element);
        }
        else {
            if (parseInt(element.resultCount) !== -1) {
                playedTry++;
                if (parseInt(element.resultCount) === 1) {
                    wonTry++;
                }
            }
            couldTryArr.push(element);
        }
    });
    let tempArr = [];
    let percCount = "";
    if (state.recomended) {
        if (playedRec > 0) {
            const ttt = ((wonRec * 100) / playedRec).toFixed(0);
            const bbb = `Tips won: ${ttt}% (${wonRec}/${playedRec})`;
            percCount = (0, jsx_runtime_1.jsx)(percCount_1.default, { text: bbb });
        }
        if (recomendedArr.length > 0) {
            const max = recomendedArr.length;
            if (recomendedArr.length > 6) {
                tempArr = recomendedArr.slice(state.start, state.end);
                contentNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: tipsSingle_module_css_1.default.nextPrev, onClick: () => load6more(max) }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: tipsSingle_module_css_1.default.nextPrev, onClick: () => load6less(max) }, { children: "Next >>" }))] })));
            }
            else {
                tempArr = recomendedArr;
            }
            contentGamesInner = tempArr.map((element, index) => {
                // Ovde obradjujemo utakmice
                return (0, jsx_runtime_1.jsx)(singleGame_1.default, { element: element, index: index }, index);
            });
        }
        else {
            if (state.tips === "") {
                // contentGamesInner = <Spinner />;
                contentGamesInner = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsSingle_module_css_1.default.noTips }, { children: " There are no available tips" })));
            }
            else {
                contentGamesInner = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsSingle_module_css_1.default.noTips }, { children: " There are no available tips" })));
            }
        }
    }
    else if (state.couldTry) {
        if (couldTryArr.length > 0) {
            if (playedTry > 0) {
                const ttt = ((wonTry * 100) / playedTry).toFixed(0);
                const bbb = `Tips won: ${ttt}% (${wonTry}/${playedTry})`;
                percCount = (0, jsx_runtime_1.jsx)(percCount_1.default, { text: bbb });
            }
            const max = couldTryArr.length;
            if (couldTryArr.length > 6) {
                tempArr = couldTryArr.slice(state.start, state.end);
                contentNext = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.nextPrevBox }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.end === max ? "0.2" : "1.0" }, className: tipsSingle_module_css_1.default.nextPrev, onClick: () => load6more(max) }, { children: "<< Previous" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: state.start === 0 ? "0.2" : "1.0" }, className: tipsSingle_module_css_1.default.nextPrev, onClick: () => load6less(max) }, { children: "Next >>" }))] })));
            }
            else {
                tempArr = couldTryArr;
            }
            contentGamesInner = tempArr.map((element, index) => {
                // Ovde obradjujemo utakmice
                return (0, jsx_runtime_1.jsx)(singleGame_1.default, { element: element, index: index }, index);
            });
        }
        else {
            if (state.tips === "") {
                contentGamesInner = (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
            }
            else {
                contentGamesInner = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: tipsSingle_module_css_1.default.noTips }, { children: " There are no available tips" })));
            }
        }
    }
    const dottedLine = (0, jsx_runtime_1.jsx)("div", { className: tipsSingle_module_css_1.default.dottedLine });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.ContentTips }, { children: [contentTips, (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.AllGamesLine }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: tipsSingle_module_css_1.default.overallButtons }, { children: [(0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.recomended, click: setRecomended, name: !isTop ? "Recommended" : "Chance > 90% " }), (0, jsx_runtime_1.jsx)(OverallButton_1.default, { o: state.couldTry, click: setCouldTry, name: !isTop ? "You Could Try" : "Chance 80% - 90%" })] })), percCount, dottedLine, sortElements, dottedLine, contentGamesInner, contentNext] }))] })), (0, jsx_runtime_1.jsx)("div", {})] }));
};
exports.default = TipsSingle;
