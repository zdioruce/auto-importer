import { combineReducers } from "redux"
import main from "./main"
import product from "./product"
import modal from "./modal"
import menu from "./menu"
import history from "./history"

const rootReducer = combineReducers({
  main: main,
  product: product,
  modal: modal,
  menu: menu,
  history: history
})

export default rootReducer;