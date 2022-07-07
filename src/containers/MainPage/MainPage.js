"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callAxios = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const Spinner_1 = __importDefault(require("../../components/Spinner/Spinner"));
const LeagueList_1 = __importDefault(require("../../components/LeagueList/LeagueList"));
const NavDates_1 = __importDefault(require("../../components/NavDates/NavDates"));
const MainPage_module_css_1 = __importDefault(require("./MainPage.module.css"));
const BettingBox_1 = __importDefault(require("../BettingBox/BettingBox"));
const AuxAux_1 = __importDefault(require("../../components/AuxAux/AuxAux"));
const Marketing_1 = __importDefault(require("../../components/Marketing/Marketing"));
const react_redux_1 = require("react-redux");
const createSlice_1 = require("../../store/createSlice");
const MainPage = (props) => {
    const stateBase = (0, react_redux_1.useSelector)((state) => {
        return state.globalState;
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    const localState = {
        games: [],
        dateSet: "",
        dateSetAllways: "",
        firstTime: true,
        loadSpinner: true,
        positionButton: 3,
    };
    const [state, setState] = (0, react_1.useState)(localState);
    (0, react_1.useEffect)(() => {
        if (state.dateSet !== "") {
            const url = "/api_stats/load_betinfo_schedule.php?date=%27" + state.dateSet + "%27";
            dispatch((0, createSlice_1.restoreDateAction)({
                date: state.dateSet,
                position: state.positionButton,
            }));
            axios_1.default.get(url).then((response) => {
                if (response.data.length > 0) {
                    setState((prevState) => {
                        return Object.assign(Object.assign({}, prevState), { games: response.data, dateSet: "", dateSetAllways: state.dateSet, firstTime: false, loadSpinner: false });
                    });
                }
            }, (isRejected) => {
                return isRejected;
            });
        }
    });
    (0, react_1.useEffect)(() => {
        // 2020-03-09
        if (state.firstTime) {
            let finalDate = "";
            if (stateBase.restoreDate !== "") {
                finalDate = stateBase.restoreDate;
            }
            else {
                const todayDate = new Date();
                const m = todayDate.getMonth() + 1;
                const todayDay = todayDate.getDate() < 10
                    ? "0" + todayDate.getDate()
                    : todayDate.getDate();
                const todayMonth = m < 10 ? "0" + m : m;
                const todayYear = todayDate.getFullYear() < 10
                    ? "0" + todayDate.getFullYear()
                    : todayDate.getFullYear();
                finalDate = todayYear + "-" + todayMonth + "-" + todayDay;
                dispatch((0, createSlice_1.restoreDateAction)({
                    date: finalDate,
                    position: state.positionButton,
                }));
            }
            const url = "/api_stats/load_betinfo_schedule.php?date=%27" + finalDate + "%27";
            (0, exports.callAxios)(url, finalDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    exports.callAxios = (url, finalDate) => {
        axios_1.default.get(url).then((response) => {
            if (response.data.length > 0) {
                setState({
                    games: response.data,
                    dateSet: "",
                    dateSetAllways: finalDate,
                    firstTime: false,
                    loadSpinner: false,
                    positionButton: stateBase.datePosition,
                });
            }
        });
    };
    const changeUrl = (finalDate, pos) => {
        // if (finalDate !== state.firstTime) {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { dateSet: finalDate, firstTime: false, loadSpinner: true, positionButton: +pos });
        });
        //  }
    };
    //window.scrollTo(0, 0);
    //let props = useParams();
    // console.log(props);
    let content = (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
    if (!state.loadSpinner) {
        content = ((0, jsx_runtime_1.jsxs)(AuxAux_1.default, { children: [(0, jsx_runtime_1.jsx)(BettingBox_1.default, { date: state.dateSetAllways }), props.m === "" ? null : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: MainPage_module_css_1.default.mark }, { children: (0, jsx_runtime_1.jsx)(Marketing_1.default, { m: props.m, type: "" }) }), "4444")), (0, jsx_runtime_1.jsx)(LeagueList_1.default, { dateSet: state.dateSetAllways, games: state.games })] }));
    }
    // Ubacivanje middle banners pomocu {props.m}
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: MainPage_module_css_1.default.Aux, id: "mainPage" }, { children: [(0, jsx_runtime_1.jsx)(NavDates_1.default, { change: changeUrl, position: state.positionButton }), content] })));
};
exports.default = MainPage;
