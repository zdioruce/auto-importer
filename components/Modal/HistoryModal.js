import styles from './HistoryModal.module.scss'
import { connect } from 'react-redux'
import ParentModal from './ParentModal'
import Spin from '@components/Spin'

function HistoryModal(props) {

  const { handleClose } = props
  const { loading, error, histories } = props.history

  return (
    <ParentModal
      handleClose={handleClose}
    >
      <div className={styles.dLRaBU}>
        <div className={styles.LEbTb}>
          <h2>History</h2>
        </div>
        <div className={styles.kgfuOx}>
          <div className={"ant-row " + styles.eressM} style={{marginLeft: -8, marginRight: -8}}>
            <div className="ant-col ant-col-6" style={{paddingLeft: 8, paddingRight:8}}>Bulk Change ID</div>
            <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight:8}}>Time</div>
            <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight:8}}>Failed</div>
            <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight:8}}>Successful</div>
            <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight:8}}>Total Products</div>
            <div className="ant-col ant-col-6" style={{paddingLeft: 8, paddingRight:8}}>Action</div>
          </div>
          <div className={styles.dTEJCg}>
            <div className={styles.iwCMAk}>
              <div className="active">
                <i aria-label="icon: right" className="anticon anticon-right">
                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                  </svg>
                </i>
                <span>2022 Feb, 21st</span>
              </div>
              <div className={"ant-row " + styles.iWlQcX} style={{marginLeft: 0, marginRight: -15}}>
                <div className={styles['ant-col'] + " ant-col ant-col-6"} style={{paddingLeft: 8, paddingRight:8}}>#5194970</div>
                <div className={styles['ant-col'] + " ant-col ant-col-3"} style={{paddingLeft: 8, paddingRight:8}}>04:29</div>
                <div className={styles['ant-col'] + " ant-col ant-col-3"} style={{paddingLeft: 8, paddingRight:8}}>0</div>
                <div className={styles['ant-col'] + " ant-col ant-col-3"} style={{paddingLeft: 8, paddingRight:8}}>4</div>
                <div className={styles['ant-col'] + " ant-col ant-col-3"} style={{paddingLeft: 8, paddingRight:8}}>4</div>
                <div className={styles['ant-col'] + " ant-col ant-col-6"} style={{paddingLeft: 8, paddingRight:8}}>
                  Create draft
                  <span>Details</span>
                </div>
              </div>
            </div>
          </div>                                  
        </div>
      </div>
    </ParentModal>    
  )
}


const mapStateToProps = state => ({
  history: state.history
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModal)
