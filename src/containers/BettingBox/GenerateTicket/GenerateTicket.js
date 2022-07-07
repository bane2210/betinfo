"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GenerateTicket_module_css_1 = __importDefault(require("./GenerateTicket.module.css"));
const GenOdds_1 = __importDefault(require("./GenOdds/GenOdds"));
const SettingsTicket_1 = __importDefault(require("./SettingsTicket/SettingsTicket"));
const singleGame_1 = __importDefault(require("../tipsSingle/tipSingle/singleGame/singleGame"));
const react_ga_1 = __importDefault(require("react-ga"));
const GenerateTicket = (props) => {
    const [state, setState] = (0, react_1.useState)({
        settings: 0,
        odds: "",
        time: "12",
        competition: [],
        market: [
            {
                group: "Win/Draw",
                name: "a_win",
                description: "Win Full-Time",
                value: 1,
            },
            {
                group: "Win/Draw",
                name: "a_draw",
                description: "Draw Full-Time",
                value: 1,
            },
            {
                group: "Win/Draw",
                name: "a_win2",
                description: "Win And Over 1.5",
                value: 1,
            },
            {
                group: "Win/Draw",
                name: "a_draw2",
                description: "Draw And Over 1.5",
                value: 0,
            },
            {
                group: "Win/Draw",
                name: "a_win3",
                description: "Win And Over 2.5",
                value: 1,
            },
            {
                group: "Win/Draw",
                name: "a_draw3",
                description: "Draw And Over 2.5",
                value: 0,
            },
            {
                group: "Win/Draw",
                name: "a_leadHT",
                description: "Win Half-Time",
                value: 1,
            },
            {
                group: "Win/Draw",
                name: "a_drawHT",
                description: "Draw Half-Time",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_1_5",
                description: "Over 1.5 Goals",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_2_5",
                description: "Over 2.5 Goals",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_3_5",
                description: "Over 3.5 Goals",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_4_5",
                description: "Over 4.5 Goals",
                value: 0,
            },
            {
                group: "Over/Under",
                name: "a_over_5_5",
                description: "Over 5.5 Goals",
                value: 0,
            },
            {
                group: "Over/Under",
                name: "a_under_1_5",
                description: "Under 1.5 Goals",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_under_2_5",
                description: "Under 2.5 Goals",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_0_5_HT",
                description: "Over 0.5 Goals First Half",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_1_5_HT",
                description: "Over 1.5 Goals First Half",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_2_5_HT",
                description: "Over 2.5 Goals First Half",
                value: 0,
            },
            {
                group: "Over/Under",
                name: "a_over_0_5_SH",
                description: "Over 0.5 Goals Second Half",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_1_5_SH",
                description: "Over 1.5 Goals Second Half",
                value: 1,
            },
            {
                group: "Over/Under",
                name: "a_over_2_5_SH",
                description: "Over 2.5 Goals Second Half",
                value: 1,
            },
            {
                group: "Both Teams To Score",
                name: "a_btts",
                description: "BTTS",
                value: 1,
            },
            {
                group: "Both Teams To Score",
                name: "a_btts3",
                description: "BTTS And Over 2.5 Goals",
                value: 1,
            },
            {
                group: "Both Teams To Score",
                name: "a_bttsFH",
                description: "BTTS First Half",
                value: 0,
            },
            {
                group: "Both Teams To Score",
                name: "a_bttsSH",
                description: "BTTS Second Half",
                value: 1,
            },
            {
                group: "Both Teams To Score",
                name: "a_win_BTTS",
                description: "Win and BTTS",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_stgoem",
                description: "Team Over 1.5",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_sinFH",
                description: "Team To Score FH",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_sinSH",
                description: "Team To Score SH",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_sinBH",
                description: "Team To Score Both Halves",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_goalBH",
                description: "Goal In Both Halves",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_more_FH",
                description: "More Goals First Half",
                value: 1,
            },
            {
                group: "Goals",
                name: "a_more_SH",
                description: "More Goals Second Half",
                value: 1,
            },
            {
                group: "Half Time/Full Time",
                name: "a_win_win",
                description: "Win Half-Time and Full-Time",
                value: 1,
            },
            {
                group: "Half Time/Full Time",
                name: "a_draw_draw",
                description: "Draw Half-Time and Full-Time",
                value: 0,
            },
        ],
        error: "",
        ticket: "-1",
    });
    const generateTicketFun = () => {
        let borderMin = 0;
        let borderMax = 0;
        const odd = parseFloat(state.odds);
        if (odd <= 1.7) {
            borderMin = 0;
            borderMax = 1.4;
        }
        else if (odd <= 2.5) {
            borderMin = 0;
            borderMax = 1.6;
        }
        else if (odd <= 7) {
            borderMin = 1.3;
            borderMax = 2;
        }
        else if (odd <= 30) {
            borderMin = 1.48;
            borderMax = 3.0;
        }
        else if (odd <= 60) {
            borderMin = 1.6;
            borderMax = 4;
        }
        else if (odd <= 100) {
            borderMin = 1.7;
            borderMax = 8;
        }
        const arr = props.genTicketObject.arrFilterFree;
        let marketValues = [];
        let competitionsValues = [];
        let games = [];
        const odds = [
            { name: "a_win", value: 1.2 },
            { name: "a_draw", value: 3.1 },
            { name: "a_win2", value: 1.25 },
            { name: "a_draw2", value: 3.4 },
            { name: "a_win3", value: 1.6 },
            { name: "a_draw3", value: 4.2 },
            { name: "a_leadHT", value: 1.6 },
            { name: "a_drawHT", value: 1.9 },
            { name: "a_over_1_5", value: 1.15 },
            { name: "a_over_2_5", value: 1.5 },
            { name: "a_over_3_5", value: 1.9 },
            { name: "a_over_4_5", value: 2.2 },
            { name: "a_over_5_5", value: 3 },
            { name: "a_under_1_5", value: 2.2 },
            { name: "a_under_2_5", value: 1.6 },
            { name: "a_over_0_5_HT", value: 1.2 },
            { name: "a_over_1_5_HT", value: 1.8 },
            { name: "a_over_2_5_HT", value: 3.6 },
            { name: "a_over_0_5_SH", value: 1.1 },
            { name: "a_over_1_5_SH", value: 1.5 },
            { name: "a_over_2_5_SH", value: 2.5 },
            { name: "a_btts", value: 1.5 },
            { name: "a_btts3", value: 1.65 },
            { name: "a_bttsFH", value: 2.3 },
            { name: "a_bttsSH", value: 2.1 },
            { name: "a_win_BTTS", value: 1.9 },
            { name: "a_stgoem", value: 1.3 },
            { name: "a_sinFH", value: 1.5 },
            { name: "a_sinSH", value: 1.35 },
            { name: "a_sinBH", value: 1.8 },
            { name: "a_goalBH", value: 1.4 },
            { name: "a_more_FH", value: 2.2 },
            { name: "a_more_SH", value: 1.9 },
            { name: "a_win_win", value: 1.3 },
            { name: "a_win_draw", value: 5 },
            { name: "a_draw_win", value: 2 },
            { name: "a_draw_draw", value: 3.5 },
            { name: "a_lose_win", value: 20 },
            { name: "a_lose_draw", value: 5 },
        ];
        let currentTime = new Date();
        let choosenTime = new Date();
        let gameTime = null;
        let tempOdds = 0;
        choosenTime.setTime(currentTime.getTime() + parseInt(state.time) * 60 * 60 * 1000);
        state.market.forEach((element) => {
            if (element.value === 1) {
                marketValues.push(element.name);
            }
        });
        state.competition.forEach((element) => {
            if (element.value === 1) {
                competitionsValues.push(element.name);
            }
        });
        arr.forEach((element) => {
            // proveravamo da li je taj tip izbran za kladjenje
            if (marketValues.includes(element.name)) {
                // proveravamo utakmicu po utakmicu iz tog tipa
                element.content.forEach((game) => {
                    // proveravamo da li je to takmicenje izabrano
                    if (competitionsValues.length === 0 ||
                        (competitionsValues.length > 0 &&
                            competitionsValues.includes(game.country + " " + game.competition))) {
                        // proveravamo da li vreme pocetka meca odgovara odabranom
                        gameTime = new Date(game.colDate + "T" + game.colTime);
                        if (gameTime > currentTime && gameTime < choosenTime) {
                            tempOdds =
                                odds[odds.findIndex((odds) => odds.name === element.name)]
                                    .value;
                            if (tempOdds >= borderMin &&
                                tempOdds <= borderMax &&
                                game.result === "") {
                                games.push({
                                    odds: tempOdds,
                                    colDate: game.colDate,
                                    awayTeam: game.awayTeam,
                                    chance: game.chance,
                                    colTime: game.colTime,
                                    competition: game.competition,
                                    country: game.country,
                                    explanation: game.explanation,
                                    homeTeam: game.homeTeam,
                                    result: game.result,
                                    resultCount: game.resultCount,
                                    tip: game.tip,
                                });
                            }
                        }
                    }
                });
            }
        });
        games.sort((a, b) => (parseInt(a.chance) > parseInt(b.chance) ? -1 : 1));
        let uniqueNames = [];
        let ticketGames = [];
        tempOdds = 1;
        if (games.length > 3) {
            let randomBr = 0;
            let singleGame;
            while (tempOdds < odd && games.length > 0) {
                // Slucaj ako je kvota malo ispod zadate
                if (tempOdds > odd / 1.3 && odd > 2) {
                    games.sort((a, b) => (a.odds < b.odds ? -1 : 1));
                    if (games.length > 60) {
                        randomBr = Math.floor(Math.random() * 10);
                    }
                    else {
                        randomBr = Math.floor(Math.random() * games.length);
                    }
                    singleGame = games[randomBr];
                    if (uniqueNames.indexOf(singleGame.country + " " + singleGame.competition) === -1) {
                        uniqueNames.push(singleGame.country + " " + singleGame.competition);
                        tempOdds = tempOdds * singleGame.odds;
                        ticketGames.push(games[randomBr]);
                        games.splice(randomBr, 1);
                    }
                    else {
                        games.splice(randomBr, 1);
                    }
                }
                else {
                    if (games.length > 150) {
                        randomBr = Math.floor(Math.random() * 20);
                    }
                    else {
                        randomBr = Math.floor(Math.random() * games.length);
                    }
                    singleGame = games[randomBr];
                    if (uniqueNames.indexOf(singleGame.country + " " + singleGame.competition) === -1) {
                        uniqueNames.push(singleGame.country + " " + singleGame.competition);
                        tempOdds = tempOdds * singleGame.odds;
                        ticketGames.push(games[randomBr]);
                        games.splice(randomBr, 1);
                    }
                    else {
                        games.splice(randomBr, 1);
                    }
                }
            }
        }
        let contentGames = "0";
        if (tempOdds >= odd) {
            contentGames = ticketGames.map((element, index) => {
                return (0, jsx_runtime_1.jsx)(singleGame_1.default, { element: element, index: index }, index);
            });
        }
        react_ga_1.default.event({
            category: "Ticket",
            action: "Genereted",
            label: "Odd: " + odd + ", Time: " + state.time,
        });
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { ticket: contentGames });
        });
    };
    const setSettings = (br) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { settings: br, ticket: "-1" });
        });
    };
    const saveCompetitions = (object) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { competition: object, settings: 0 });
        });
    };
    const saveMarket = (object) => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { market: object, settings: 0 });
        });
    };
    const setStateOddsTime = (value, br) => {
        if (br === 1) {
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { odds: value, settings: 0, ticket: "-1", error: "" });
            });
        }
        if (br === 2) {
            setState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { time: value, ticket: "-1", settings: 0 });
            });
        }
    };
    const errorMessageGenerate = () => {
        setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { error: "You must choose odds" });
        });
    };
    let settingsButtons;
    if (state.settings === 0) {
        settingsButtons = ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: GenerateTicket_module_css_1.default.chooseContainer }, { children: [(0, jsx_runtime_1.jsx)(GenOdds_1.default, { value: state.odds, name: "Odds", click: () => setSettings(1), content: state.odds ? state.odds : "Choose odds" }), (0, jsx_runtime_1.jsx)(GenOdds_1.default, { value: state.time, name: "Time", click: () => setSettings(2), content: "Next " + state.time + "h" }), (0, jsx_runtime_1.jsx)(GenOdds_1.default, { value: state.competition, name: "Competitions", click: () => setSettings(3), content: state.competition ? "Custom" : "All" }), (0, jsx_runtime_1.jsx)(GenOdds_1.default, { value: state.market, name: "Market", click: () => setSettings(4), content: "Custom" })] })));
    }
    else {
        settingsButtons = ((0, jsx_runtime_1.jsx)(SettingsTicket_1.default, { type: state.settings, value: [state.odds, state.time], oddsTimeClick: setStateOddsTime, competitionsTicket: props.genTicketObject.competitionsTicket, marketTicket: state.market, saveCompetitions: saveCompetitions, saveMarket: saveMarket }));
    }
    let generateButton = "";
    let errorMessage = "";
    if (state.settings === 0) {
        if (state.error !== "") {
            errorMessage = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.errorMessage }, { children: state.error }));
        }
        else {
            errorMessage = (0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.errorMessage }, { children: "" }));
        }
    }
    if (state.odds !== "" && state.settings === 0) {
        generateButton = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.generateButtonContainer, onClick: generateTicketFun }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.generateButton }, { children: "Generate Ticket" })) })));
    }
    else if (state.settings === 0) {
        generateButton = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.generateButtonContainerNo, onClick: errorMessageGenerate }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.generateButtonNo }, { children: "Generate Ticket" })) })));
    }
    let contentTicket = "";
    let line = (0, jsx_runtime_1.jsx)("div", { className: GenerateTicket_module_css_1.default.line });
    if (state.ticket === "-1") {
        contentTicket = "";
    }
    else if (state.ticket === "0") {
        contentTicket = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.Unable }, { children: "Unable to generate ticket, try changing some parameters." })));
    }
    else {
        contentTicket = state.ticket;
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: GenerateTicket_module_css_1.default.GenerateTicket }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: GenerateTicket_module_css_1.default.Header }, { children: "Generate Ticket" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: GenerateTicket_module_css_1.default.Content }, { children: [settingsButtons, errorMessage] })), generateButton, (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: GenerateTicket_module_css_1.default.Games }, { children: [state.ticket !== "-1" ? line : "", contentTicket] }))] })));
};
exports.default = GenerateTicket;
