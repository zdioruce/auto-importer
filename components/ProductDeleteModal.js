import styles from './ProductDeleteModal.module.scss'
import React, { useState } from "react"

export default function ProductDeleteModal({show, handleClose, handleDelete, count}) {

    const [option, setOption] = useState(false)

    return show ? (
        <div>
            <div className="ant-modal-root">
                <div className="ant-modal-mask" style={{zIndex: 1000}}></div>
                <div tabIndex="-1" className="ant-modal-wrap ant-modal-centered" role="dialog" style={{}}>
                    <div role="document" className="ant-modal DeleteProducts" style={{zIndex: 1001, width: 'auto'}}>
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
                            <div className={styles.eGrwdU}>
                                <h2>Confirm delete ({count > 1? count + ' products': 'A Product'})</h2>
                                <p>What would you like to do with {count > 1? count + ' products': 'a product'}</p>
                                <div className="ant-radio-group ant-radio-group-outline">
                                    <label className="ant-radio-wrapper" style={{margin: '8px 0px', color: 'rgb(90, 88, 89)', fontSize: '13px'}}>
                                        <span className={option == 0? "ant-radio ant-radio-checked": "ant-radio"}>
                                            <input type="radio" className="ant-radio-input" value="0" onChange={() => setOption(0)} checked={option==0?true:false}/>
                                            <span className="ant-radio-inner"></span>
                                        </span>
                                        <span>Delete only from Auto Importer</span>
                                    </label>
                                    <label className="ant-radio-wrapper ant-radio-wrapper-checked" style={{margin: '8px 0px', color: 'rgb(90, 88, 89)', fontSize: '13px'}}>
                                        <span className={option == 1? "ant-radio ant-radio-checked": "ant-radio"}>
                                            <input type="radio" className="ant-radio-input" value="1" onChange={() => setOption(1)} checked={option==1?true:false}/>
                                            <span className="ant-radio-inner"></span>
                                        </span>
                                        <span>Delete from Auto Importer and Selling Platform</span>
                                    </label>
                                </div>
                                <div className="ant-divider ant-divider-horizontal" role="separator"></div>
                                <div className="flex jc-sb">
                                    <button type="button" className="ant-btn ant-btn-link" onClick={handleClose}>
                                        <span>Cancel</span>
                                    </button>
                                    <button type="submit" className="ant-btn ant-btn-primary ant-btn-lg" onClick={() => handleDelete(option)}>
                                        <span>Delete</span>
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
