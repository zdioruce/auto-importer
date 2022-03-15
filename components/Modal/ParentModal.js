import CloseIcon from '@assets/CloseIcon'

export default function ParentModal(props) {

  const { className, handleClose } = props

  return (
    <div>
      <div className="ant-modal-root">
        <div className="ant-modal-mask" style={{zIndex: 1000}}></div>
        <div tabIndex="-1" className="ant-modal-wrap ant-modal-centered" role="dialog" style={{}}>
          <div role="document" className={"ant-modal " + className} style={{zIndex: 1001, width: 'auto'}}>
            <div className="ant-modal-content">
              <button 
                type="button" 
                aria-label="Close" 
                className="ant-modal-close" 
                onClick={handleClose}
              >
                <span className="ant-modal-close-x">
                  <i aria-label="icon: close" className="anticon anticon-close ant-modal-close-icon">
                    <CloseIcon/>
                  </i>
                </span>
              </button>
              <div className="ant-modal-body">
                {props.children}
              </div>                
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
