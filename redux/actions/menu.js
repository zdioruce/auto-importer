import * as t from "../types";

export const showAddProductsMenu = (show) => dispatch => dispatch({
  type: t.SHOW_ADD_PRODUCTS_MENU,
  payload: show
});

export const addSelect = (id, dataId, dataType, rect, values, selectValues, show, multi) => dispatch => dispatch({
  type: t.ADD_SELECT,
  payload: {
    id, 
    dataId, 
    dataType, 
    left: rect.left, 
    top: rect.top, 
    width: rect.width, 
    height: rect.height, 
    values, 
    selectValues, 
    show, 
    multi
  }
});

export const updateSelect = (id, rect, selectValues, show) => dispatch => dispatch({
  type: t.UPDATE_SELECT,
  payload: {
    id, 
    rect, 
    selectValues,
    show
  }
});

export const removeAllSelect = () => dispatch => dispatch({
  type: t.REMOVE_ALL_SELECT,
  payload: []
});