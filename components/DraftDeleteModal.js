import styles from './DraftDeleteModal.module.scss'

export default function DraftDeleteModal({show, handleClose, handleDelete, count}) {
    return show ? (
        <div>
            <div className="ant-modal-root">
            <div className="ant-modal-mask" style={{zIndex: 1000}}></div>
            <div tabIndex="-1" className="ant-modal-wrap ant-modal-centered" role="dialog">
                <div role="document" className="ant-modal Confirm" style={{zIndex: 1001, width: 'auto'}}>
                <div tabIndex="0" aria-hidden="true" style={{width: '0px', height: '0px', overflow: 'hidden', outline: 'none'}}></div>
                <div className="ant-modal-content">
                    <button type="button" aria-label="Close" className="ant-modal-close" onClick={handleClose}>
                    <span className="ant-modal-close-x">
                        <i aria-label="icon: close" className="anticon anticon-close ant-modal-close-icon">
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                        </svg>
                        </i>
                    </span>
                    </button>
                    <div className="ant-modal-body">
                        <div width="340" className={styles.iMpmEY}>
                            <h2>{count > 1? 'Delete ' + count + ' Drafts': 'Delete A Draft'}</h2>
                            <p className="semi-bold">You are about to delete {count > 1? count + ' drafts': 'a draft'}. Are you sure you want to Continue?</p>
                            <div>
                            <button type="button" className="ant-btn ant-btn-link ant-btn-lg" onClick={handleClose}>
                                <span>No, Cancel</span>
                            </button>
                            <button type="button" className="ant-btn jwxKrG ant-btn-primary ant-btn-lg" onClick={handleDelete}>
                                <span>Yes, I’m Sure</span>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div tabIndex="0" aria-hidden="true" style={{width: '0px', height: '0px', overflow: 'hidden', outline: 'none'}}></div>
                </div>
            </div>
            </div>
        </div>
    ) : null
}
