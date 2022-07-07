"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreDateAction = exports.closeBackdrop = exports.backdropAction = exports.betinfoSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.betinfoSlice = (0, toolkit_1.createSlice)({
    name: "backdrop",
    initialState: {
        backVis: 0,
        backdrop: {
            date: "",
            time: "",
            home: "",
            away: "",
            country: "",
            competition: "",
            simpleDate: "",
        },
        yPos: 0,
        restoreDate: "",
        datePosition: 3,
    },
    reducers: {
        backdropAction: (state, action) => {
            state.yPos = action.payload.yPos;
            state.backdrop = action.payload.backdropOBJ;
            state.backVis = action.payload.backVis;
        },
        closeBackdrop: (state, action) => {
            state.backdrop = action.payload.backdropOBJ;
            state.backVis = action.payload.backVis;
        },
        restoreDateAction: (state, action) => {
            state.restoreDate = action.payload.date;
            state.datePosition = action.payload.position;
        },
    },
});
/*
betinfoSlice = {
    name: 'backdrop',
    actions : {
        backdropAction,
        closeBackdrop,
        restoreDateAction,
    },
    reducer
}
*/
exports.backdropAction = exports.betinfoSlice.actions.backdropAction;
exports.closeBackdrop = exports.betinfoSlice.actions.closeBackdrop;
exports.restoreDateAction = exports.betinfoSlice.actions.restoreDateAction;
exports.default = exports.betinfoSlice.reducer;
