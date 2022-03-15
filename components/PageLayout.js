import Head from 'next/head'
import SideBar from './SideBar/SideBar'
import AddProductsDropDown from './DropDown/AddProductsDropDown'
import MultipleSelectDropDown from './Select/MultipleSelectDropDown'
import SingleProductModal from './Modal/SingleProductModal'
import MultiProductModal from './Modal/MultiProductModal'
import HistoryItemsModal from './Modal/HistoryItemsModal'
import HistoryModal from './Modal/HistoryModal'
import PaginationDropDown from '@components/Pagination/PaginationDropDown'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TopBar from './TopBar'
import AddImageModal from './Modal/AddImageModal'
import { connect } from 'react-redux'

import { 
  showSingleProductModal, 
  showMultiProductModal, 
  showHistoryItemsModal, 
  showHistoryModal, 
  showEditVariantModal 
} from "@redux/actions/modal"

import { 
  setAsins,
  setMenu,
  addNotification
} from "@redux/actions/main"

import { 
  showAddProductsMenu,
  updateSelect
} from "@redux/actions/menu"

import { 
  createProducts, 
  updateProducts 
} from "@redux/actions/product"

import EditVariantModal from './Modal/EditVariantModal'
import SelectDropDown from './Select/SelectDropDown'
import ProductImportDropDown from './DropDown/ProductImportDropDown'
import NotificationToolTipItem from './Notification/NotificationToolTipItem'

function PageLayout(props) {

  const router = useRouter();

  const { 
    showSingleProductModal, 
    showMultiProductModal, 
    showHistoryItemsModal, 
    showHistoryModal, 
    setAsins, 
    showAddProductsMenu,
    createProducts, 
    updateProducts,
    updateSelect,
    showEditVariantModal,
    setMenu,
    addNotification
  } = props

  const {
    menu,
    notifications
  } = props.main

  const { 
    singleProductModal, 
    multiProductModal, 
    historyItemsModal, 
    historyModal, 
    addImageModal, 
    editVariantModal
  } = props.modal

  const { 
    addProductsMenu,
    arrDropDown,
    productImportDropDown 
  } = props.menu

  const {
    draftCount,
    productCount
  } = props.product

  useEffect(() => {
    setMenu(localStorage.getItem('menu'))
  }, [setMenu])

  const handleSingleProductImport = (uploadVariations, productIDs, action) => {
    showSingleProductModal(false)
    setAsins(productIDs)
    addNotification({
      id: notifications.length,
      message: 'Item is being added to Drafts.'
    })

    if(action == 0){
      setMenu(5)
      router.replace({
        pathname: '/predraft',
        query: {uploadVariations, action}
      })    
    } else {
      createProducts(uploadVariations, productIDs, action)  
    }
  };

  const handleMultiProductImport = (uploadVariations, productIDs, action) => {    
    showMultiProductModal(false)
    addNotification({
      id: notifications.length,
      message: 'Items is being added to Drafts.'
    })

    let ids = []
    for(let i = 0; i < productIDs.length; i++) {
      ids.push(productIDs[i])

      if(i == productIDs.length - 1) {
        console.log('ids =', ids)
        createProducts(uploadVariations, ids, action)
      }else if(ids.length == 5) {
        createProducts(uploadVariations, ids, action)
        console.log('ids =', ids)
        ids = []
      } 
    }    
  };

  const handleProductImportMenu = (index) => {

    showAddProductsMenu(false)
    if(index == 1){
      showSingleProductModal(true)
    }else{
      showMultiProductModal(true)
    }
  }

  const handleClickMultipleSelect = (id, type, value) => {

    const products = JSON.parse(localStorage.getItem('products'))
    const product = products.find(element => element.id == id)   
    const collections = null
    
    if(type == 1)
      collections = product.collections.split(',').filter(Boolean);
    else
      collections = product.tags.split(',').filter(Boolean);

    if(collections.includes(value)){
      collections.splice(collections.indexOf(value), 1)
    }else{
      collections.push(value)
    }

    if(type == 1)
      product.collections = collections.join()
    else
      product.tags = collections.join()

      product.updated = 1

      updateProducts(product)
  }

  const handleClickSingleSelect = (id, dataId, dataType, value) => {

    const products = JSON.parse(localStorage.getItem('products'))
    const product = products.find(element => element.id == dataId)   
    
    if(dataType == 3)
      product.shipping_method = value
    else
      product.country = value

    product.updated = 1
    updateProducts(product)
    updateSelect(id, null, null, false)
  }

  const getSelectedValues = (id, type) => {
    const products = JSON.parse(localStorage.getItem('products'))
    const product = products.find(element => element.id == id)
    const selectedValues = []
    
    if(type == 1)
      selectedValues = product.collections.split(',').filter(Boolean);
    else
      selectedValues = product.tags.split(',').filter(Boolean);

    return selectedValues
  }

  const getSelectedValue = (id, type) => {
    const products = JSON.parse(localStorage.getItem('products'))
    const product = products.find(element => element.id == id)
    const selectedValue = null

    if(type == 3)
      selectedValue = product.shipping_method
    else
      selectedValue = product.country

    return selectedValue
  }

  let title = null

  if(menu == 0) {
    title = 'Dashboard'
  } else if(menu == 1) {
    title = 'Products (' + productCount + ')'
  } else if(menu == 2) {
    title = 'Upload (' + draftCount + ')'
  } else if(menu == 3) {
    title = 'Settings'
  } else if(menu == 4) {
    title = 'Products'
  } else if(menu == 5) {
    title = 'Add new product'
  }

  return (
    <>
      <Head>
          <title>Auto Importer</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/fonts/Inter/Inter-Bold.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Inter/Inter-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Inter/Inter-Medium.ttf"
            as="font"
            crossOrigin=""
          />
      </Head>
      <div id="notifications">
        <div>
          <div className="ant-notification ant-notification-bottomRight" style={{right: 0, top: 'auto', bottom: 90}}>
            <span>
              {
                notifications.map((element, index) => (
                  <NotificationToolTipItem
                    key={index}
                    data={element}
                  />
                ))
              }
              {/* <div className="ant-notification-notice ant-notification-notice-closable success">
                <div className="ant-notification-notice-content">
                  <div className="ant-notification-notice-with-icon">
                    <span className="ant-notification-notice-icon">
                      <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
                      </svg>
                    </span>
                    <div className="ant-notification-notice-message">
                      <span className="ant-notification-notice-message-single-line-auto-margin"></span>
                      Pampers Swaddlers Disposable B... started to import
                    </div>
                    <div className="ant-notification-notice-description"></div>
                  </div>
                </div>
                <a tabindex="0" className="ant-notification-notice-close">
                  <span className="ant-notification-close-x">
                    <svg className="close-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289Z" fill="#727272"></path>
                    </svg>
                  </span>
                </a>
              </div>
              <div className="ant-notification-notice ant-notification-notice-closable success">
                <div className="ant-notification-notice-content">
                  <div className="ant-notification-notice-with-icon">
                    <span className="ant-notification-notice-icon">
                      <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
                      </svg>
                    </span>
                    <div className="ant-notification-notice-message">
                      <span className="ant-notification-notice-message-single-line-auto-margin"></span>
                      Diapers Size 2, 186 Count - Pa... started to import
                    </div>
                    <div className="ant-notification-notice-description"></div>
                  </div>
                </div>
                <a tabindex="0" className="ant-notification-notice-close">
                  <span className="ant-notification-close-x">
                    <svg className="close-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289Z" fill="#727272"></path>
                    </svg>
                  </span>
                </a>
              </div>
              <div className="ant-notification-notice ant-notification-notice-closable success">
                <div className="ant-notification-notice-content">
                  <div className="ant-notification-notice-with-icon">
                    <span className="ant-notification-notice-icon">
                      <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
                      </svg>
                    </span>
                    <div className="ant-notification-notice-message">
                      <span className="ant-notification-notice-message-single-line-auto-margin"></span>
                      12 products were sent to be deleted
                    </div>
                    <div className="ant-notification-notice-description"></div>
                  </div>
                </div>
                <a tabindex="0" className="ant-notification-notice-close">
                  <span className="ant-notification-close-x">
                    <svg className="close-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289Z" fill="#727272"></path>
                    </svg>
                  </span>
                </a>
              </div>
              <div className="ant-notification-notice ant-notification-notice-closable success">
                <div className="ant-notification-notice-content">
                  <div className="ant-notification-notice-with-icon">
                    <span className="ant-notification-notice-icon">
                      <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
                      </svg>
                    </span>
                    <div className="ant-notification-notice-message">
                      <span className="ant-notification-notice-message-single-line-auto-margin"></span>
                      Item is being added to Drafts.
                    </div>
                    <div className="ant-notification-notice-description"></div>
                  </div>
                </div>
                <a tabindex="0" className="ant-notification-notice-close">
                  <span className="ant-notification-close-x">
                    <svg className="close-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289Z" fill="#727272"></path>
                    </svg>
                  </span>
                </a>
              </div>
              <div className="ant-notification-notice ant-notification-notice-closable success">
                <div className="ant-notification-notice-content">
                  <div className="ant-notification-notice-with-icon">
                    <span className="ant-notification-notice-icon">
                      <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
                      </svg>
                    </span>
                    <div className="ant-notification-notice-message">
                      <span className="ant-notification-notice-message-single-line-auto-margin"></span>
                      <div className="ant-notification-with-history">
                        The draft upload process had finished.
                        <button type="button" className="ant-btn ant-btn-link">
                          <span>click to view</span>
                        </button>
                      </div>
                    </div>
                    <div className="ant-notification-notice-description"></div>
                  </div>
                </div>
                <a tabindex="0" className="ant-notification-notice-close">
                  <span className="ant-notification-close-x">
                    <svg className="close-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289Z" fill="#727272"></path>
                    </svg>
                  </span>
                </a>
              </div>
              <div className="ant-notification-notice ant-notification-notice-closable success">
                <div className="ant-notification-notice-content">
                  <div className="ant-notification-notice-with-icon">
                    <span className="ant-notification-notice-icon">
                      <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
                      </svg>
                    </span>
                    <div className="ant-notification-notice-message">
                      <span className="ant-notification-notice-message-single-line-auto-margin"></span>
                      Settings have been saved
                    </div>
                    <div className="ant-notification-notice-description"></div>
                  </div>
                </div>
                <a tabindex="0" className="ant-notification-notice-close">
                  <span className="ant-notification-close-x">
                    <svg className="close-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289Z" fill="#727272"></path>
                    </svg>
                  </span>
                </a>
              </div> */}
            </span>
          </div>
        </div>
      </div>
      <TopBar
        title={title}
      />                
      <SideBar
        handleAddProducts={() => {
          setShowProductImportMenu(!showProductImportMenu)
        }}
      />
      {props.children}
      {
        addProductsMenu &&
        <AddProductsDropDown
          handleMenu={handleProductImportMenu}
        />   
      }
      {
        <PaginationDropDown
          show={true}
        />
      }
      {
        singleProductModal &&
        <SingleProductModal
          handleClose={() => showSingleProductModal(false)}
          handleImport={handleSingleProductImport}
        />
      }
      {
        multiProductModal && 
        <MultiProductModal
          handleClose={() => showMultiProductModal(false)}        
          handleImport={handleMultiProductImport}
        />
      }
      {
        addImageModal &&
        <AddImageModal/>    
      }
      {
        historyItemsModal &&
        <HistoryItemsModal
          handleClose={() => showHistoryItemsModal(false)}
        />
      }
      {
        historyModal &&
        <HistoryModal
          handleClose={() => showHistoryModal(false)}
        />
      }           
      {
        arrDropDown.map((item, index) => (    
          item.multi ?
          <MultipleSelectDropDown
            key={index}
            item={item}
            selectedValues={getSelectedValues(item.dataId, item.dataType)}     
            onClick={handleClickMultipleSelect}
          />: 
          <SelectDropDown
            key={index}
            item={item}
            selectedValue={getSelectedValue(item.dataId, item.dataType)}     
            onClick={handleClickSingleSelect}          
          />
        ))
      }
      {
        productImportDropDown &&
        <ProductImportDropDown
        />
      }
      {
        editVariantModal &&
        <EditVariantModal
          handleClose={() => showEditVariantModal(false)}
        />
      }      
    </>
  )
}

const mapStateToProps = state => ({
  main: state.main,
  modal: state.modal,
  menu: state.menu,
  product: state.product
})

const mapDispatchToProps = {
  showSingleProductModal, 
  showMultiProductModal, 
  setAsins, 
  showAddProductsMenu, 
  showHistoryItemsModal, 
  showHistoryModal, 
  updateProducts,
  updateSelect,
  showEditVariantModal,
  createProducts,
  setMenu,
  addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)