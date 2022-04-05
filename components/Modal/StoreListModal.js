import styles from './StoreListModal.module.scss'
import React, { useEffect } from "react"
import ParentModal from './ParentModal'
import Spin from '@components/Spin'
import LargeButton from '@components/Button/LargeButton'
import ShopifyIcon from '@assets/ShopifyIcon'
import StoreTableRow from '@components/Row/StoreTableRow'
import PlusIcon from '@assets/PlusIcon'
import { connect } from 'react-redux'
import { showAddStoreModal } from "../../redux/actions/modal"
import { getStores, checkStores, updateStores } from "../../redux/actions/main"

function StoreListModal(props) {
  
  const { showAddStoreModal, getStores, updateStores, checkStores, handleClose } = props
  const { loading, error, stores } = props.main

  useEffect(() => {
    getStores()
  }, [getStores])

  const handleClickAddStore = () => {
    showAddStoreModal(true)
    handleClose()
  }

  const handleClickUpdate = () => {
    updateStores(stores)
    handleClose()    
  }

  let content = null

  if (error) {
    content = <div>failed to load</div>
  }

  if (loading || stores.length == 0) {
    content = <Spin/>
  } else {
    content = stores.map((element, index) => (
                <StoreTableRow
                  key={index}
                  data={element}
                  handleCheck={() => checkStores(stores, element)}
                />
              ))
  }

  return (
    <ParentModal   
      handleClose={handleClose}   
    >
      <div className={styles.jAgqrz}>
        <div className={styles.fHRKsE}>
          <div className={styles.bvxVub}>
            <ShopifyIcon/>
            Shopify ({stores.length})
            <div className={styles.link}>Unselect all</div>
          </div>
          {content}
        </div>
        <div className={styles.ikFQkd}>
          <button 
            type="button" 
            className="ant-btn ant-btn-link"
            onClick={handleClickAddStore}
          >
            <i aria-label="icon: plus" className="anticon anticon-plus">
              <PlusIcon/>
            </i>
            <span>Add Store</span>
          </button>
          <LargeButton
            title={'Update'}
            onClick={handleClickUpdate}
          />
        </div>
      </div>
    </ParentModal>    
  )
}

const mapStateToProps = state => ({
  modal: state.modal,
  main: state.main
})

const mapDispatchToProps = {
  showAddStoreModal, getStores, checkStores, updateStores
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreListModal)