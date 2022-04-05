import styles from './NotificationItem.module.scss'
import { connect } from 'react-redux'
import { showHistoryItemsModal } from "@redux/actions/modal"
import { getHistoryItems, cancelHistory, hideHistory } from "@redux/actions/history"
import ProgressIcon from '@assets/ProgressIcon'
import CompleteIcon from '@assets/CompleteIcon'
import CloseIcon from '@assets/CloseIcon'
import TrashIcon from '@assets/TrachIcon'
import CancelIcon from '@assets/CancelIcon'
import LoadingIcon from '@assets/LoadingIcon'

function NotificationItem(props) {

  const { 
    data, 
    showHistoryItemsModal, 
    getHistoryItems, 
    cancelHistory,
    hideHistory
  } = props

  const {
    loading
  } = props.history

  let title = null

  if(data.action == 0) 
    title = 'Create Drafts'
  else if(data.action == 1) 
    title = 'Import Products'
  else
    title = 'Bulk Delete'

  let status = null
  let statusIcon = null

  if(data.status == 0) {
    status = 'in progress'
    statusIcon = <ProgressIcon/>
  } else if(data.status == 1) {
    status = 'Done'
    statusIcon = <CompleteIcon/>
  } else if(data.status == 2) {
    status = 'canceled'
    statusIcon = <CancelIcon/>
  }

  let button = null

  if(loading) {
    button = <span>
              <LoadingIcon/>
            </span>
  } else {
    if(data.status == 0) {
      button = <span onClick={() => cancelHistory(data.id)}>
                <CloseIcon/>
              </span>
    } else {
      button = <span onClick={() => hideHistory(data.id)}>
                <TrashIcon/>
              </span>
    }
  }

  return (
    <div className={styles.eUXZOu}>
      {statusIcon}
      {title} #{data.id} ({data.complete}/{data.total} {status})
      <button 
        type="button" 
        className="ant-btn default ant-btn-link" 
        onClick={() => {
          getHistoryItems(data.id)
          showHistoryItemsModal(true)
        }}
      >
        <span>View details</span>
      </button>
      {button}
    </div>
  )
}

const mapStateToProps = state => ({
  modal: state.modal,
  history: state.history
})
  
const mapDispatchToProps = {
  showHistoryItemsModal, 
  getHistoryItems,
  cancelHistory,
  hideHistory
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem)
