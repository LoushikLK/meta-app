export const userdetail = (value) => {
    return ((dispatch) => {
        dispatch({
            type: "USER-DETAIL",
            payload: value
        })
    })
}

export const searchcomponent = (value) => {
    return ((dispatch) => {
        dispatch({
            type: "SEARCH-COMPONENT",
            payload: value
        })
    })
}