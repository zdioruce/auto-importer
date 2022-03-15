import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import DraftDeleteModal from '@components/Modal/DraftDeleteModal'
import DraftAllImportModal from '@components/Modal/DraftAllImportModal'
import NoProducts from '@components/NoProducts'
import Spin from '@components/Spin'
import DraftTableRow from '@components/Row/DraftTableRow'
import NotificationGroup from '@components/Notification/NotificationGroup'
import NotificationItem from '@components/Notification/NotificationItem'
import Pagination from '@components/Pagination/Pagination'
import CheckBox from '@components/Input/CheckBox'
import TrashIcon from '@assets/TrachIcon'
import PlusIcon from '@assets/PlusIcon'
import { connect } from 'react-redux'
import { getProducts, importProducts, deleteProducts, saveProduct, selectProducts } from "@redux/actions/product"
import { showDraftDeleteModal, showDraftImportModal, showHistoryModal } from "@redux/actions/modal"
import { getHistory } from "@redux/actions/history"
import { addNotification } from "@redux/actions/main"

function Drafts(props) {

  const { 
    getProducts, 
    importProducts, 
    deleteProducts, 
    saveProduct,
    selectProducts,
    showDraftDeleteModal, 
    showDraftImportModal, 
    getHistory, 
    showHistoryModal,
    addNotification
  } = props

  const {
    products, 
    loading, 
    error, 
    processingIds, 
    selectedIds,
    draftCount
  } = props.product
  
  const {
    draftDeleteModal, 
    draftImportModal
  } = props.modal

  const {
    histories
  } = props.history

  const {
    notifications
  } = props.main

  const [productID, setProductID] = useState(null)
  const [show, setShow] = useState(10)
  const [page, setPage] = useState(0)

  useEffect(() => {
    getHistory()
    getProducts(page, show, 0)  
  }, [getProducts, getHistory, page, show])

  function handleImport(id) {
    let ids = []
    
    if(ids.includes(id)){
      const index = ids.indexOf(id);
      if (index > -1) {
        ids.splice(index, 1);
      }
    }else{
      ids.push(id)
    }

    importProducts(ids)
  }

  function handleSave(id) {
    const found = products.find(element => element.id == id);
    saveProduct(found)
  }

  const handleDelete = () => {
    showDraftDeleteModal(false)    

    let ids = selectedIds.length > 0? selectedIds: [productID]
    deleteProducts(ids, 0)
    addNotification({
      id: notifications.length,
      message: ids.length + ' products were sent to be deleted'
    })
  }

  const handleAllImport = () => {
    showDraftImportModal(false)
    importProducts(selectedIds)

    addNotification({
      id: notifications.length,
      message: selectedIds.length + ' product was sent to be imported'
    })
  }

  function handleCheck(id) {
    let ids = selectedIds
    if(ids.includes(id)) {
      var index = ids.indexOf(id);
      if (index !== -1)
        ids.splice(index, 1);
    }
    else {
      ids.push(id)
    }

    selectProducts(ids)
  }

  function handleAllCheck() {
    if(selectedIds.length > 0){
      selectProducts([])
    } else{
      let ids = []
      products.map(element => {
        ids.push(element.id)
      })  
      selectProducts(ids)
    }
  }

  let content = null
  
  if (error) {
    content = <div>failed to load</div>
  }

  if (loading) {
    content = <div className={styles['spin-wrapper']}>
                <Spin/>
              </div>
  } else if(products.length == 0) {
    content = <NoProducts/>
  } else {
    content = 
    <>
      {
        products && products.map((element, index) => (
          <DraftTableRow
            key={index}
            loading={processingIds.includes(element.id)}
            check={selectedIds.includes(element.id)}
            data={element}
            handleCheck={handleCheck}
            handleImport={handleImport}
            handleSave={handleSave}
            handleDelete={() => {              
              showDraftDeleteModal(true)
              setProductID(element.id)
            }}
          />
        ))
      }
      {/* <Pagination
        show={show}
        total={draftCount}
        page={page}
        handlePage={(value) => {
          setPage(value)
          getProducts(value, show, 0)
        }}
        handleShow={(value) => {
          setShow(value)
          getProducts(page, value, 0)
        }}
      /> */}
    </>
  }

  return (
    <div className={styles.zrVas}>    
      {
        histories.length > 0 &&
        <NotificationGroup>
        {
          histories.map((element, index) => (
            <NotificationItem
              key={index}
              data={element}
            />
          ))
        }      
        </NotificationGroup>  
      }
      <div className={styles.ewSfgI}>
        <div className={styles.dqaTgJ}>
          <div className="ant-row-flex ant-row-flex-middle">
            <div className="ant-col ant-col-1">
              <CheckBox
                check={selectedIds.length > 0}   
                indeterminate={selectedIds.length != products.length}             
                handleCheck={handleAllCheck}
              />
            </div>
            <div className="ant-col ant-col-xl-15 ant-col-xxl-17">
              <div className={styles.bhqtkb}>
                <span className={selectedIds.length > 0? styles.checked: ''}>{selectedIds.length > 0? selectedIds.length + ' Items Selected': '0 Results Selected'}</span>
                {
                  selectedIds.length > 0 && 
                  <div>
                    <button 
                      type="button" 
                      className="ant-btn btn-link ant-btn-link" 
                      onClick={() => showDraftImportModal(true)}
                    >
                      <PlusIcon/>
                      <span>Import all</span>
                    </button>                    
                  </div>
                }
                {
                  selectedIds.length > 0 && 
                  <div>
                    <button 
                      type="button" 
                      className="ant-btn btn-link ant-btn-link" 
                      onClick={() => showDraftDeleteModal(true)}
                    >
                      <TrashIcon/>
                      <span> Remove from list</span>
                    </button>
                  </div>                
                }
              </div>
            </div>
            <div className="ant-col ant-col-xl-8 ant-col-xxl-6">
              <div className={styles.gxNXxE}>
                <span onClick={() => showHistoryModal(true)}>View History</span>
              </div>
            </div>
          </div>
        </div>
        {content}
      </div>
      {
        draftDeleteModal &&
        <DraftDeleteModal
          handleCancel={() => {
            showDraftDeleteModal(false)
            selectProducts([])
          }}
          handleOK={handleDelete}
          count={selectedIds.length}
        />    
      }
      {
        draftImportModal &&
        <DraftAllImportModal
          handleCancel={() => {
            showDraftImportModal(false)
            selectProducts([])
          }}
          handleOK={handleAllImport}
          count={selectedIds.length}
        />    
      }
    </div> 
  )
}

const mapStateToProps = state => ({
  main: state.main,
  product: state.product,
  modal: state.modal,
  history: state.history
})

const mapDispatchToProps = {
  getProducts, 
  importProducts, 
  deleteProducts, 
  saveProduct,
  selectProducts,
  showDraftDeleteModal, 
  showDraftImportModal, 
  getHistory, 
  showHistoryModal,
  addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Drafts)