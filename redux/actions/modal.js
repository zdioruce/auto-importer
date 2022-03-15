import * as t from "../types";

export const showSingleProductModal = (show) => dispatch => dispatch({
  type: t.SHOW_SINGLE_PRODUCT_MODAL,
  payload: show
});

export const showMultiProductModal = (show) => dispatch => dispatch({
  type: t.SHOW_MULTI_PRODUCT_MODAL,
  payload: show
});

export const showDraftDeleteModal = (show) => dispatch => dispatch({
  type: t.SHOW_DRAFT_DELETE_MODAL,
  payload: show
});

export const showDraftImportModal = (show) => dispatch => dispatch({
  type: t.SHOW_DRAFT_IMPORT_MODAL,
  payload: show
});

export const showProductDeleteModal = (show) => dispatch => dispatch({
  type: t.SHOW_PRODUCT_DELETE_MODAL,
  payload: show
});

export const showHistoryItemsModal = (show) => dispatch => {
  dispatch({
    type: t.SHOW_HISTORY_ITEMS_MODAL,
    payload: show
  })
}

export const showHistoryModal = (show) => dispatch => {
  dispatch({
    type: t.SHOW_HISTORY_MODAL,
    payload: show
  })
}

export const showAddImageModal = (show) => dispatch => dispatch({
  type: t.SHOW_ADD_IMAGE_MODAL,
  payload: show
});

export const showEditVariantModal = (show) => dispatch => dispatch({
  type: t.SHOW_EDIT_VARIANT_MODAL,
  payload: show
});