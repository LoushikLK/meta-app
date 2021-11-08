const reducer = (state = { showSearch: false }, action) => {
    if (action.type === "SEARCH-COMPONENT") {
        return {
            showSearch: action.payload.showSearch
        }
    }
    else {
        return state
    }
}

export default reducer