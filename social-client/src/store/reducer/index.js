import { combineReducers } from "redux";
import userDetailReducer from './userDetailReducer'
import searchComponentReducer from './searchComponentReducer'

const reducers = combineReducers({
    userDetail: userDetailReducer,
    searchComponent: searchComponentReducer
})

export default reducers