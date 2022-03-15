import styles from './AddStoreModal.module.scss'
import ParentModal from './ParentModal'
import { connect } from 'react-redux'
import { addStore } from "@redux/actions/main"
import { showStoreListModal } from "@redux/actions/modal"
import React, { useState } from "react"

function AddStoreModal(props) {
  
  const { showStoreListModal, addStore, handleClose } = props
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeUrl = (e) => {
    setUrl(e.target.value)
  }

  const handleChangeToken = (e) => {
    setToken(e.target.value)
  }

  const handleClickAddStore = () => {
    addStore(name, url, token)
    handleClose()
    showStoreListModal(true)
  }

  return (
    <ParentModal   
      handleClose={handleClose}   
    >
      <div className={`${styles.hmDnDN} modal-form`}>
        <h2>Add Store</h2>
        <label>
          Store Name
          <div>
            <span className="ant-input-group-wrapper ant-input-group-wrapper-lg">
              <span className="ant-input-wrapper ant-input-group">
                <input 
                  placeholder="Enter Store URL" 
                  type="text" 
                  className="ant-input ant-input-lg" 
                  value={name} 
                  onChange={handleChangeName}
                />
              </span>
            </span>
          </div>
        </label>
        <label>
          Store URL
          <div>
            <span className="ant-input-group-wrapper ant-input-group-wrapper-lg">
              <span className="ant-input-wrapper ant-input-group">
                <input 
                  placeholder="Enter Store URL" 
                  type="text" 
                  className="ant-input ant-input-lg" 
                  value={url} onChange={handleChangeUrl}
                />
              </span>
            </span>
          </div>
        </label>
        <label>
          Access Token
          <div>
            <span className="ant-input-group-wrapper ant-input-group-wrapper-lg">
              <span className="ant-input-wrapper ant-input-group">
                <input 
                  placeholder="Access Token" 
                  type="text" 
                  className="ant-input ant-input-lg" 
                  value={token}
                  onChange={handleChangeToken}
                />
              </span>
            </span>
          </div>
        </label>
        <div className={styles.bWFfcs}>
          <button 
            type="button" 
            className="ant-btn ant-btn-primary ant-btn-lg"
            onClick={handleClickAddStore}
          >
            <span>Add Store</span>
          </button>
        </div>
      </div>
    </ParentModal>    
  )
}


const mapStateToProps = state => ({
  main: state.main,
  modal: state.modal
})

const mapDispatchToProps = {
  addStore, showStoreListModal
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStoreModal)