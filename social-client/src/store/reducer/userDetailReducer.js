

// const initialState = {

//     _id: "",
//     profilePicture: "",
//     coverPicture: "",
//     profileName: "",
//     followers: [],
//     following: [],
//     post: [],

//     about: [
//         {
//             location: "Not Set.Where do you live ?",
//             profession: "Not Set. What do You do?",
//             relationshipStatus: "Not Set"
//         }
//     ]
// }


const reducer = (state = { isLogin: false }, action) => {
    if (action.type === "USER-DETAIL") {
        return {

            isLogin: action.payload.isLogin,

        }

    }
    else {
        return state
    }
}

export default reducer