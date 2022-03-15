import * as t from "../types";

const menu = (state = {
    addProductsMenu: false,
    arrDropDown: [],
}, action) => {
  switch(action.type){
    case t.SHOW_ADD_PRODUCTS_MENU:
      return { 
        ...state,
        addProductsMenu: action.payload
      }; 
    case t.ADD_SELECT:
      return { 
        ...state,
        arrDropDown: [...state.arrDropDown, action.payload]
      };
    case t.UPDATE_SELECT:
      const { id, rect, selectValues, show } = action.payload      
      const arrDropDown = state.arrDropDown

      for(let i = 0; i < arrDropDown.length; i++) {
        const dropDown = arrDropDown[i]

        if(dropDown.id == id) {
          if(rect) {
            dropDown.left = rect.left
            dropDown.top = rect.top
            dropDown.width = rect.width  
            dropDown.height = rect.height
          }

          dropDown.selectValues = selectValues
          dropDown.show = show
          arrDropDown[i] = dropDown
          break
        }
      }

      return { 
        ...state,
        arrDropDown: arrDropDown
      };
    case t.REMOVE_ALL_SELECT:
      return { 
        ...state,
        arrDropDown: action.payload
      };
    default:
      return {...state};
  }
};

export default menu;