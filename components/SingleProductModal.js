import styles from './SingleProductModal.module.scss'
import { useState } from 'react';

export default function SingleProductModal({show, handleClose, handleImport}) {

    const [productID, setProductID] = useState('');

    function handleChange(event) {
        setProductID(event.target.value)
    }

    return show ? (
        <div>
            <div className={styles.ant_modal_root}>
                <div className='ant-modal-mask' style={{zIndex: 1000}}></div>
                    <div tabIndex="-1" className='ant-modal-wrap ant-modal-centered' role="dialog">
                        <div role="document" className='ant-modal' style={{zIndex: 1001, width: "auto"}}>
                            <div tabIndex="0" aria-hidden="true" style={{width: "0px", height: "0px", overflow: "hidden", outline: "none"}}></div>
                            <div className='ant-modal-content'>
                                <button type="button" aria-label="Close" className='ant-modal-close' onClick={handleClose}>
                                    <span className='ant-modal-close-x'>
                                        <i aria-label="icon: close" className='anticon anticon-close ant-modal-close-icon'>
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                            </svg>
                                        </i>
                                    </span>
                                </button>
                                <div className='ant-modal-body'>
                                    <div className={styles.jYCyV}>
                                        <div className={styles.iMSxfz + " " + styles.jIYPtr}>
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='add-product-icn'>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M24.1144 3.82104L42 12.7639V26H38V16.8859L33.9998 18.386V23L29.9998 24V19.886L26 21.3859V36.9419L30 35.1919V39.558L23.9434 42.2077L6 33.236V10.6139L24.1144 3.82104ZM10 15.236L22 21.236V36.7639L10 30.7639V15.236ZM35.0033 13.7377L32.1436 14.8101L21.4339 9.09824L23.8856 8.17882L35.0033 13.7377ZM12.9966 12.2622L16.443 10.9698L27.1528 16.6816L24.1144 17.821L12.9966 12.2622Z" fill="#CACACA"></path>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M39 29C38.4477 29 38 29.4477 38 30V34H34C33.4477 34 33 34.4477 33 35V37C33 37.5523 33.4477 38 34 38H38V42C38 42.5523 38.4477 43 39 43H41C41.5523 43 42 42.5523 42 42V38H46C46.5523 38 47 37.5523 47 37V35C47 34.4477 46.5523 34 46 34H42V30C42 29.4477 41.5523 29 41 29H39Z" fill="#EA8C1F"></path>
                                            </svg>
                                            <div>
                                                <h2>Add Product</h2>
                                            </div>
                                        </div>
                                        <div className={styles.hRmKiD}>
                                            <div>URL or Product ID</div>
                                            <input placeholder="Enter URL or Product ID" type="text" className='ant-input ant-input-lg' value={productID} onChange={handleChange} />
                                        </div>                                
                                        <div className={styles.JwezC} style={{marginTop: "30px"}}>
                                            <div className='ant-btn-group ant-btn-group-lg ant-dropdown-button'>
                                                <button type="button" className='ant-btn ant-btn-primary' onClick={() => handleImport(productID)}>
                                                    <span>Import</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div tabIndex="0" aria-hidden="true" style={{width: "0px", height: "0px", overflow: "hidden", outline: "none"}}></div>
                        </div>
                    </div>
                </div>
            </div>
    ) : null            
}
