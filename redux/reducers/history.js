import * as t from "../types";

const history = (state = {
    loading: false,
    error: null,
    detail: null,
    histories: [],
    items: [],
}, action) => {
  switch(action.type){
    case t.LOADING:
      return { 
        ...state,
        loading: action.payload
      };
    case t.ERROR:
      return {
        ...state,
        error: action.payload
      }
    case t.GET_HISOTRY_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        detail: action.payload.detail
      } 
    case t.GET_HISOTRY:
      return {
        ...state,
        histories: action.payload,
      }            
    default:
      return {...state};
  }
};

export default history;