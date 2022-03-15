import styles from './SingleProductModal.module.scss'
import { useState } from 'react';
import ParentModal from './ParentModal'
import CheckBox from '@components/Input/CheckBox'
import AddProductIcon from '@assets/AddProductIcon'
import { connect } from 'react-redux'

function SingleProductModal(props) {

  const {handleClose, handleImport} = props
  const [uploadVariations, setUploadVariations] = useState(0)
  const [productIDs, setProductIDs] = useState([]);

  const handleChange = (event) => {
    if(event.target.value.length == 0)
        setProductIDs([])
    else
        setProductIDs([event.target.value])
  }

  return (
    <ParentModal
      handleClose={handleClose}
    >
      <div className={styles.jYCyV}>
        <div className={styles.iMSxfz + " " + styles.jIYPtr}>
          <AddProductIcon/>
          <div>
            <h2>Add Product</h2>
          </div>
        </div>
        <div className={styles.hRmKiD}>
          <div>Product ID</div>
          <input 
            placeholder="Enter URL or Product ID" 
            type="text" 
            className='ant-input ant-input-lg' 
            value={productIDs.length > 0? productIDs[0]: ''} 
            onChange={handleChange} 
          />
          <div className='m-t-20'>
            <CheckBox
              check={uploadVariations == 1}
              handleCheck={() => setUploadVariations(uploadVariations == 0? 1: 0)}
            />
            Upload Variations
          </div>
        </div>
        <div className={styles.JwezC} style={{marginTop: 30}}>
          <button 
            disabled={productIDs.length == 0} 
            type="button" 
            className='ant-btn ant-btn-lg ant-btn-primary' 
            onClick={() => handleImport(uploadVariations, productIDs, 0)}
          >
            <span>Edit Now(Quick)</span>
          </button>
          <button 
            disabled={productIDs.length == 0} 
            type="button" 
            className='ant-btn ant-btn-lg ant-btn-primary' 
            style={{marginLeft: 10}}
            onClick={() => handleImport(uploadVariations, productIDs, 1)}
          >
            <span>Publish to Store</span>
          </button>            
        </div>
      </div>
    </ParentModal>   
  )
}

const mapStateToProps = state => ({
  menu: state.menu,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductModal)