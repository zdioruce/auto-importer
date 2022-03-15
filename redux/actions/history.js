import * as t from "../types";
import axios from "axios";
import { request } from "../../util/request";

export const getHistory = (id) => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.post(
      '/api/history',
      {id}
    )
    
    dispatch({
      type: t.GET_HISOTRY,
      payload: apiResponse.data.histories,
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

export const getHistoryItems = (id) => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.post(
      '/api/history/items',
      {id}
    )
    
    dispatch({
      type: t.GET_HISOTRY_ITEMS,
      payload: {
        items: apiResponse.data.items,
        detail: apiResponse.data.detail
      }
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