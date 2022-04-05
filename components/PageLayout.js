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
  showEditVariantModal,
  showStoreListModal,
  showAddStoreModal
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
import StoreListModal from './Modal/StoreListModal'
import AddStoreModal from './Modal/AddStoreModal'

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
    addNotification,
    showStoreListModal,
    showAddStoreModal
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
    editVariantModal,
    storeListModal,
    addStoreModal 
  } = props.modal

  const { 
    addProductsMenu,
    arrDropDown,
    productImportDropDown 
  } = props.menu

  const {
    allDraftIds,
    allProductIds
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

    createProducts(uploadVariations, productIDs, action)
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
    title = 'Products (' + allProductIds.length + ')'
  } else if(menu == 2) {
    title = 'Upload (' + allDraftIds.length + ')'
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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
      {
        storeListModal &&
        <StoreListModal
          handleClose={() => {
            console.log("clicked")
            showStoreListModal(false)
          }}
        />
      } 
      {
        addStoreModal &&
        <AddStoreModal
          handleClose={() => showAddStoreModal(false)}
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
  addNotification,
  showStoreListModal,
  showAddStoreModal
}

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)