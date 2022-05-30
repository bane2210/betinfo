const initialState = {
    backVis: false,
    backdrop: {
        date: "",
        time: "",
        home: "",
        away: "",
        country: "",
        competition: "",
        simpleDate: ""
    },
    yPos: 0

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "backdropSet":
            return {
                ...state,
                yPos: action.yPos,
                backdrop: action.data
            }
        default: return state;

    }
};


export default reducer;