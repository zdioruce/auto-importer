import * as t from "../types";
import axios from "axios";
import { request } from "../../util/request";

export const deleteProducts = (ids, option) => async dispatch => {
  try {
    dispatch({
      type: t.SELECT_PRODUCTS,
      payload: []
    })

    dispatch({
      type: t.PROCESSING,
      payload: ids
    })
    
    const apiResponse = await axios.post(
      `/api/product/delete`, 
      {ids, option}
    );
    localStorage.setItem('products', JSON.stringify(apiResponse.data.products))

    dispatch({
      type: t.GET_PRODUCTS,
      payload: {
        products: apiResponse.data.products,
        draftCount: apiResponse.data.draftCount,
        productCount: apiResponse.data.productCount,
      }
    })
    dispatch({
      type: t.PROCESSING,
      payload: []
    })

  }catch(error){
    dispatch({
      type: t.PROCESSING,
      payload: []
    })
    dispatch({
      type: t.ERROR,
      payload: error.response.data.error
    })
  }
}

export const importProducts = (ids) => async dispatch => {
  try {
    dispatch({
      type: t.SELECT_PRODUCTS,
      payload: []
    })

    dispatch({
      type: t.PROCESSING,
      payload: ids
    })

    const apiResponse = await axios.post(`/api/product/import`, {ids});
    localStorage.setItem('products', JSON.stringify(apiResponse.data.products))

    dispatch({
      type: t.GET_PRODUCTS,
      payload: {
        products: apiResponse.data.products,
        draftCount: apiResponse.data.draftCount,
        productCount: apiResponse.data.productCount,
      }
    })

    dispatch({
      type: t.PROCESSING,
      payload: []
    })

  }catch(error){
    dispatch({
      type: t.PROCESSING,
      payload: []
    })
    dispatch({
      type: t.ERROR,
      payload: error.response.data.error
    })
  }
}

export const saveProduct = (data) => async dispatch => {
  try {
    dispatch({
      type: t.PROCESSING,
      payload: [data.id]
    })
    dispatch({
      type: t.LOADING,
      payload: true
    })
    await axios.post(`/api/product/save`, 
      {data}
    );

    dispatch({
      type: t.PROCESSING,
      payload: []
    })
    dispatch({
      type: t.LOADING,
      payload: false
    })
  }catch(error){
    dispatch({
      type: t.PROCESSING,
      payload: []
    })
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

export const getProducts = (page, show, status) => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })
    
    const apiResponse = await axios.post(
      '/api/product',
      { page, show, status }
    )

    localStorage.setItem('products', JSON.stringify(apiResponse.data.products))

    dispatch({
      type: t.GET_PRODUCTS,
      payload: {
        products: apiResponse.data.products,
        draftCount: apiResponse.data.draftCount,
        productCount: apiResponse.data.productCount,
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

export const getProduct = (id) => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })

    const apiResponse = await axios.get(
      '/api/product/' + id
    )

    dispatch({
      type: t.GET_PRODUCT,
      payload: {
        products: apiResponse.data.products,
        draftCount: apiResponse.data.draftCount,
        productCount: apiResponse.data.productCount,
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

export const createProducts = (uploadVariations, ids, action) => async dispatch => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true
    })
    
    const apiResponse = await axios({
      method: 'post',
      url:'/api/product/add',
      data: { 
        uploadVariations, 
        ids, 
        action 
      },
      timeout: 300000
    })

    localStorage.setItem('products', JSON.stringify(apiResponse.data.products))

    dispatch({
      type: t.GET_PRODUCTS,
      payload: {
        products: apiResponse.data.products,
        draftCount: apiResponse.data.draftCount,
        productCount: apiResponse.data.productCount,
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

export const updateProducts = (data) => async dispatch => {
  
  let products = JSON.parse(localStorage.getItem('products'))

  for(let i = 0; i < products.length; i++) {
    if(products[i].id == data.id) {
      products[i] = data
      break
    }
  }

  localStorage.setItem('products', JSON.stringify(products))

  dispatch({
    type: t.UPDATE_PRODUCTS,
    payload: products
  })
}


export const selectProducts = (ids) => async dispatch => {
  dispatch({
    type: t.SELECT_PRODUCTS,
    payload: ids
  })
}

export const saveVariant = (data) => async dispatch => {
  try {
    dispatch({
      type: t.PROCESSING,
      payload: [data.id]
    })
    dispatch({
      type: t.LOADING,
      payload: true
    })
    await axios.post(`/api/variant/save`, 
      {data}
    );

    dispatch({
      type: t.PROCESSING,
      payload: []
    })
    dispatch({
      type: t.LOADING,
      payload: false
    })
  }catch(error){
    dispatch({
      type: t.PROCESSING,
      payload: []
    })
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