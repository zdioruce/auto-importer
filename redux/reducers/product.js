import * as t from "../types";

const product = (state = {
  loading: false,
  error: null,
  products: [],
  processingIds: [],
  selectedIds: [],
  draftCount: 0,
  productCount: 0
}, action) => {
  switch(action.type){
    case t.LOADING:
      return { 
        ...state,
        loading: action.payload
      };
    case t.PROCESSING:
      return { 
        ...state,
        processingIds: action.payload
      };      
    case t.ERROR:
      return {
        ...state,
        error: action.payload
      }
    case t.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        draftCount: action.payload.draftCount,
        productCount: action.payload.productCount
      }
    case t.GET_PRODUCT:
      return {
        ...state,
        products: action.payload.products,
        draftCount: action.payload.draftCount,
        productCount: action.payload.productCount
      }      
    case t.UPDATE_PRODUCTS:      
      return {
        ...state,
        products: action.payload,
      }
    case t.SELECT_PRODUCTS:      
      return {
        ...state,
        selectedIds: action.payload
      }
    default:
      return {...state};
  }
};

export default product;