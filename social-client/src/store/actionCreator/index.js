export const userdetail = (value) => {
    return ((dispatch) => {
        dispatch({
            type: "USER-DETAIL",
            payload: value
        })
    })
}