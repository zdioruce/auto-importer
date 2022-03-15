import { connect } from 'react-redux'
import { removeNotification } from "@redux/actions/main"
import CloseIcon from '@assets/CloseIcon'
import { useEffect } from 'react';
function NotificationToolTipItem(props) {

  const { data, removeNotification } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(data.id)
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  const handleClickClose = () => {
    removeNotification(data.id)
  }

  return (
    <div className="ant-notification-notice ant-notification-notice-closable success">
      <div className="ant-notification-notice-content">
        <div className="ant-notification-notice-with-icon">
          <span className="ant-notification-notice-icon">
            <svg className="colored" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM14.2318 8.35984C14.5853 7.93556 15.2159 7.87824 15.6402 8.2318C16.0644 8.58537 16.1218 9.21593 15.7682 9.64021L10.7682 15.6402C10.5883 15.856 10.326 15.9863 10.0453 15.999C9.76462 16.0117 9.49154 15.9058 9.29287 15.7071L7.29287 13.7071C6.90234 13.3166 6.90234 12.6834 7.29287 12.2929C7.68339 11.9024 8.31656 11.9024 8.70708 12.2929L9.93278 13.5186L14.2318 8.35984Z" fill="#5FC287"></path>
            </svg>
          </span>
          <div className="ant-notification-notice-message">
            <span className="ant-notification-notice-message-single-line-auto-margin"></span>
            {data.message}
          </div>
          <div className="ant-notification-notice-description"></div>
        </div>
      </div>
      <a tabIndex="0" className="ant-notification-notice-close" onClick={handleClickClose}>
        <span className="ant-notification-close-x">
          <CloseIcon/>
        </span>
      </a>
    </div>
  )
}

const mapStateToProps = state => ({
  
})
  
const mapDispatchToProps = {
  removeNotification
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NotificationToolTipItem)
