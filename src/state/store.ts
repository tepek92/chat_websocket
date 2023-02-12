import {combineReducers, legacy_createStore as createStore} from "redux";
import {chatReducer} from "./chat-reducer";

const rootReducer = combineReducers({
  chat: chatReducer
})

export const store = createStore(rootReducer)


// types
export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch