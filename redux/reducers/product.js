import * as t from "../types";

const product = (state = {
  loading: false,
  error: null,
  products: [],
  drafts: [],
  processingIds: [],
  selectedIds: [],
  allDraftIds: [],
  allProductIds: []
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
    case t.GET_DRAFTS:
        return {
          ...state,
          drafts: action.payload.products,
          allDraftIds: action.payload.draftIds,
          allProductIds: action.payload.productIds  
        }      
    case t.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        allDraftIds: action.payload.draftIds,
        allProductIds: action.payload.productIds
      }
    case t.GET_PRODUCT:
      return {
        ...state,
        products: action.payload.products,
        allDraftIds: action.payload.draftIds,
        allProductIds: action.payload.productIds
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