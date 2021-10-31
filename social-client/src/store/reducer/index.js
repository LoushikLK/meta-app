import { combineReducers } from "redux";
import userDetailReducer from './userDetailReducer'

const reducers = combineReducers({
    userDetail: userDetailReducer
})

export default reducers