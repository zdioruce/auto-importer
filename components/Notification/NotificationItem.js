import styles from './NotificationItem.module.scss'
import { connect } from 'react-redux'
import { showHistoryItemsModal } from "@redux/actions/modal"
import { getHistoryItems } from "@redux/actions/history"
import ProgressIcon from '@assets/ProgressIcon'
import CompleteIcon from '@assets/CompleteIcon'
import CloseIcon from '@assets/CloseIcon'
import TrashIcon from '@assets/TrachIcon'

function NotificationItem(props) {

  const { data, showHistoryItemsModal, getHistoryItems } = props
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
  }        
  else {
    status = 'Done'
    statusIcon = <CompleteIcon/>
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
      <span>
        {data.status == 0? <CloseIcon/>: <TrashIcon/>}
      </span>
    </div>
  )
}

const mapStateToProps = state => ({
  modal: state.modal,
  history: state.history
})
  
const mapDispatchToProps = {
  showHistoryItemsModal, getHistoryItems
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem)
