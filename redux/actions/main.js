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

export const addStore = (name, url, token) => async dispatch => {
  console.log(url)
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.post(
      '/api/store/add',
      { name, url, token }
    )
    console.log(apiResponse)
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


export const getStores = () => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.get(
      '/api/store'
    )

    dispatch({
      type: t.GET_STORES,
      payload: apiResponse.data.stores
    })
    dispatch({
      type: t.LOADING,
      payload: false
    })

  }catch(error){
    console.log(error)
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

export const checkStores = (stores, data) => async dispatch => {

  for(let i = 0; i < stores.length; i++) {
    if(stores[i].id == data.id){
      stores[i].status = 1
    }else{
      stores[i].status = 0
    }
  }

  dispatch({
    type: t.GET_STORES,
    payload: stores
  })
}

export const updateStores = (stores) => async dispatch => {

  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.post(
      '/api/store/save',
      {stores}
    )

    console.log(apiResponse)

    dispatch({
      type: t.GET_STORES,
      payload: apiResponse.data.stores
    })
    dispatch({
      type: t.LOADING,
      payload: false
    })

  }catch(error){
    console.log(error)
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