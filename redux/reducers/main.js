import * as t from "../types";

const main = (state = {
    loading: false,
    error: null,
    asins: [],
    setting: null,
    menu: 0,
    variant: null,
    notifications: [],
    stores: [],
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
    case t.SET_VARIANT:
      return { 
        ...state,
        variant: action.payload
      };
    case t.SET_MENU:
      return { 
        ...state,
        menu: action.payload
      };
    case t.SET_ASINS:
      return { 
        ...state,
        asins: action.payload
      };
    case t.GET_SETTING:
      return { 
        ...state,
        setting: action.payload
      };
    case t.UPDATE_SETTING:
      return { 
        ...state,
        setting: action.payload
      }; 
    case t.ADD_NOTIFICATION:
      return { 
        ...state,
        notifications: [...state.notifications, action.payload]
      }; 
    case t.REMOVE_NOTIFICATION:
      var array = [...state.notifications];
      for(let i = 0; i < array.length; i++) {
        if (array[i].id == action.payload) {
          array.splice(i, 1);
          break
        }
      }
      return { 
        ...state,
        notifications: array
      };      
    case t.GET_STORES:
      return {
        ...state,
        stores: action.payload,
      }
    default:
      return {...state};
  }
};

export default main;