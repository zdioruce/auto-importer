import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import ProductDeleteModal from '@components/Modal/ProductDeleteModal'
import NoProducts from '@components/NoProducts'
import Spin from '@components/Spin'
import ProductTableRow from '@components/Row/ProductTableRow'
import ProductTableHead from '@components/ProductTableHead'
import Pagination from '@components/Pagination/Pagination'
import NotificationGroup from '@components/Notification/NotificationGroup'
import NotificationItem from '@components/Notification/NotificationItem'
import CheckBox from '@components/Input/CheckBox'
import TrashIcon from '@assets/TrachIcon'
import { connect } from 'react-redux'
import { getProducts, deleteProducts, selectProducts } from "@redux/actions/product"
import { showProductDeleteModal, showHistoryModal } from "@redux/actions/modal"
import { getHistory } from "@redux/actions/history"
import { addNotification } from "@redux/actions/main"

function Products(props) {

  const {
    getProducts, 
    deleteProducts, 
    showProductDeleteModal, 
    showHistoryModal, 
    selectProducts, 
    getHistory,
    addNotification
  } = props
  
  const { 
    productCount, 
    products, 
    loading, 
    error, 
    processingIds, 
    selectedIds 
  } = props.product
  
  const { 
    productDeleteModal 
  } = props.modal
  
  const { 
    histories 
  } = props.history
  
  const [show, setShow] = useState(10)
  const [page, setPage] = useState(0)
  const [productID, setProductID] = useState(null)

  useEffect(() => {
    getHistory()
    getProducts(page, show, 1)
  }, [page, show, getHistory, getProducts])

  function handleDelete(option) {
    showProductDeleteModal(false)
    
    let ids = selectedIds.length > 0? selectedIds: [productID]
    deleteProducts(ids, option)
    addNotification({
      id: notifications.length,
      message: ids.length + ' products were sent to be deleted'
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
    content = <>
                <div className={styles.bJBQtm + ' with-custom-heading'}>
                  <table>
                    <ProductTableHead/>
                    <tbody>
                      {
                        products && products.map((element, index) => (
                          <ProductTableRow 
                            key={index} 
                            check={selectedIds.includes(element.id)}
                            loading={processingIds.includes(element.id)}
                            item={element}
                            handleCheck={handleCheck}
                            handleDelete={() => {              
                              showProductDeleteModal(true)
                              setProductID(element.id)
                            }}
                          />
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                {/* <Pagination
                  show={show}
                  total={productCount}
                  page={page}
                  handlePage={(value) => {
                    setPage(value)
                    getProducts(value, show, 1)
                  }}
                  handleShow={(value) => {
                    setShow(value)
                    getProducts(page, value, 1)
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
      <div className={styles.iwrWXZ}>
        <div>
          <div className={styles.hFzCJJ}>
            <CheckBox
              check={selectedIds.length > 0}
              indeterminate={selectedIds.length != products.length}         
              handleCheck={handleAllCheck}
            />
            <p className={selectedIds.length > 0? styles.checked: ''}>
              {selectedIds.length > 0? `${selectedIds.length} Items Selected`: '0 Results Selected'}
            </p>
            {
              selectedIds.length > 0 &&
              <span onClick={() => showProductDeleteModal(true)}>
                <TrashIcon/>
              </span>
            }
          </div>
          <div className={styles.fhZQmL}>
            <span onClick={() => showHistoryModal(true)}>View History</span>
          </div>
        </div>
      </div>      
      {content}
      {
        productDeleteModal &&
        <ProductDeleteModal        
          handleClose={() => showProductDeleteModal(false)}
          handleDelete={handleDelete}
          count={selectedIds.length}
        />     
      } 
    </div> 
  )
}


const mapStateToProps = state => ({
  product: state.product,
  modal: state.modal,
  history: state.history,
  main: state.main
})

const mapDispatchToProps = {
  getProducts, 
  deleteProducts, 
  showProductDeleteModal, 
  getHistory, 
  showHistoryModal, 
  selectProducts, 
  addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)