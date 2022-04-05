import styles from './VariantTableRow.module.scss'
import Image from 'next/image'
import TrashIcon from '@assets/TrachIcon'
import CheckBox from '@components/Input/CheckBox'
import { connect } from 'react-redux'
import { setVariant } from "@redux/actions/main"
import { showEditVariantModal } from "@redux/actions/modal"
import { numberWithCommas } from 'util/function'

const VariantTableRow = (props) => {

  const {data, check, handleCheck, showEditVariantModal, setVariant} = props

  const handleClickEdit = () => {
    setVariant(data)
    showEditVariantModal(true)
  }

  let stock = null

  if(data.availabilityAmazon == -1)
    stock = <div className={styles.gWPiIo}>Out Of Stock</div>
  else if(data.availabilityAmazon == 0)
    stock = <div className={styles.hSaXbT}>In stock</div>  
  else if(data.availabilityAmazon == 3)
    stock = <div className={styles.cwEXfY}>In Hold</div>  

  let option = data.option1_name + ': ' + data.option1_value
  if(data.option2_name) {
    option += ', ' + data.option2_name + ': ' + data.option2_value
  }

  return (
    <div className={styles.jypVEH}>
      <div className={`${styles['ant-row-flex']} ant-row-flex ant-row-flex-middle`}>
        <CheckBox
          check={check}
          className={styles['ant-checkbox-wrapper']}
          handleCheck={() => handleCheck(data.id)}
        />
        <div className={`${styles['ant-col']} ant-col ant-col-22`}>
          <Image
            className={styles.img} 
            src={process.env.IMAGE_PATH + data.image} 
            alt="variant-pic" 
            width={60}
            height={60}
          />
          <div className={styles.eIbWUB}>
            <div>{option}</div>
            {/* <div style={{whiteSpace: 'nowrap'}} className={styles.small}>
              <i style={{color:'#f1bb00'}} className={data.rating > 0 && data.rating < 0.5?"fa fa-star-half-o":"fa fa-star"}></i>
              <i style={{color:'#f1bb00'}} className={data.rating > 1 && data.rating < 1.5?"fa fa-star-half-o":"fa fa-star"}></i>
              <i style={{color:'#f1bb00'}} className={data.rating > 2 && data.rating < 2.5?"fa fa-star-half-o":"fa fa-star"}></i>
              <i style={{color:'#f1bb00'}} className={data.rating > 3 && data.rating < 3.5?"fa fa-star-half-o":"fa fa-star"}></i>
              <i style={{color:'#f1bb00'}} className={data.rating > 4 && data.rating < 4.5?"fa fa-star-half-o":"fa fa-star"}></i> 
              <span style={{color:'#cea000'}}>{data.rating}</span> ({numberWithCommas(data.reviewCount)} reviews)
            </div> */}
            <div>
              <span>
                {stock}                
              </span>
              <span>Buy ID: {data.sku}</span>
              <span>Price: ${data.price}</span>
            </div>
          </div>
        </div>
        <div className={`${styles['ant-col']} ant-col ant-col-2 actions ${styles['variants']} ${styles['actions']}`}>
          <TrashIcon/>     
          <button 
            type="button" 
            className="ant-btn"
            onClick={handleClickEdit}
          >
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>      
  )
}


const mapStateToProps = state => ({
  modal: state.modal
})

const mapDispatchToProps = {
  showEditVariantModal, setVariant
}

export default connect(mapStateToProps, mapDispatchToProps)(VariantTableRow)