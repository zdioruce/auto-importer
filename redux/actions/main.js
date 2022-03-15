import * as t from "../types";
import axios from "axios";

export const setVariant = (variant) => dispatch => {

  dispatch({
    type: t.SET_VARIANT,
    payload: variant
  });
}

export const setMenu = (menu) => dispatch => {

  localStorage.setItem('menu', menu)
  
  dispatch({
    type: t.SET_MENU,
    payload: menu
  });
}

export const setAsins = (asins) => dispatch => dispatch({
  type: t.SET_ASINS,
  payload: asins
});

export const updateSetting = (setting) => dispatch => {
  dispatch({
    type: t.UPDATE_SETTING,
    payload: setting
  });
}

export const getSetting = () => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.get(
      '/api/settings'
    )
    
    dispatch({
      type: t.GET_SETTING,
      payload: apiResponse.data.setting
    })
    dispatch({
      type: t.LOADING,
      payload: false
    })

  }catch(error){
    dispatch({
      type: t.LOADING,
      payload: false
    })
    dispatch({
      type: t.ERROR,
      payload: error.response.data.error
    })
  }
}

export const setSetting = (setting) => async dispatch => {

  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })
    
    const apiResponse = await axios.post(
      '/api/settings/save',
      {setting}
    )
    
    dispatch({
      type: t.GET_SETTING,
      payload: apiResponse.data.setting
    })
    dispatch({
      type: t.LOADING,
      payload: false
    })
  }catch(error){
    dispatch({
      type: t.LOADING,
      payload: false
    })
    dispatch({
      type: t.ERROR,
      payload: error.response.data.error
    })
  }
}

export const addNotification = (notifications) => dispatch => {

  dispatch({
    type: t.ADD_NOTIFICATION,
    payload: notifications
  });
}

export const removeNotification = (id) => dispatch => {
  dispatch({
    type: t.REMOVE_NOTIFICATION,
    payload: id
  });
}