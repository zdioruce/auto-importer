import styles from './NoProducts.module.scss'
import { connect } from 'react-redux'
import { showMultiProductModal } from "../redux/actions/modal"
import AddProductIcon from '@assets/AddProductIcon'
import LargeButton from './Button/LargeButton'

function NoProducts(props) {

  const { showMultiProductModal } = props

  return (
    <div className={styles.iEWzQZ}>
      <div className={styles.gwIBEu}>
        <div className={styles.hpZlJk}>
          <div className={styles.bMbqPw}>
            <AddProductIcon/>
          </div>
          <h3>You don&apos;t have any products yet...</h3>
          <p>Save time and start your first upload here!</p>
          <LargeButton
            title={'Add Products'}
            onClick={() => showMultiProductModal(true)}
          />          
        </div>
      </div>
    </div>  
  )
}

const mapStateToProps = state => ({
  modal: state.modal,
})

const mapDispatchToProps = {
  showMultiProductModal
}

export default connect(mapStateToProps, mapDispatchToProps)(NoProducts)