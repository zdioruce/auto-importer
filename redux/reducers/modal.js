import * as t from "../types";

const modal = (state = {
    singleProductModal: false,
    multiProductModal: false,
    draftDeleteModal: false,
    draftImportModal: false,
    productDeleteModal: false,
    historyItemsModal: false,
    historyModal: false,
    addImageModal: false,
    storeListModal: false,
    addStoreModal: false,
    editVariantModal: false
}, action) => {
  switch(action.type){
    case t.SHOW_PRODUCT_DELETE_MODAL:
      return { 
        ...state,
        productDeleteModal: action.payload
      }; 
    case t.SHOW_DRAFT_DELETE_MODAL:
      return { 
        ...state,
        draftDeleteModal: action.payload
      };    
    case t.SHOW_DRAFT_IMPORT_MODAL:
      return { 
        ...state,
        draftImportModal: action.payload
      };      
    case t.SHOW_SINGLE_PRODUCT_MODAL:
      return { 
        ...state,
        singleProductModal: action.payload
      };      
    case t.SHOW_MULTI_PRODUCT_MODAL:
      return { 
        ...state,
        multiProductModal: action.payload
      };  
    case t.SHOW_HISTORY_ITEMS_MODAL:   
      return { 
        ...state,
        historyItemsModal: action.payload
      };
    case t.SHOW_HISTORY_MODAL:   
      return { 
        ...state,
        historyModal: action.payload
      };  
    case t.SHOW_ADD_IMAGE_MODAL:   
      return { 
        ...state,
        addImageModal: action.payload
      }; 
    case t.SHOW_EDIT_VARIANT_MODAL:   
      return { 
        ...state,
        editVariantModal: action.payload
      };                        
    default:
      return {...state};
  }
};

export default modal;