import { createSlice } from "@reduxjs/toolkit";

export const betinfoSlice = createSlice({
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

export const { backdropAction} = betinfoSlice.actions;
export const { closeBackdrop} = betinfoSlice.actions;
export const { restoreDateAction} = betinfoSlice.actions;

export default betinfoSlice.reducer;

