import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function ProductDetail() {

    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(undefined)

    useEffect(() => {
        async function fetchData() {
            console.log(id)
            await fetch('/api/products/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setData(data.result[0])
            })   
        }

        fetchData();
    }, [])

    function handleBack() {
        router.back()
    }

    return (
        <div>   
            <div className={styles.cFZvyK}>
                <div className='ant-row'>
                    <div className='ant-col ant-col-xl-12 ant-col-xxl-14'>
                        <h2>Products</h2>
                    </div>
                </div>
            </div>   
            <div className={styles.iDDieF}>
                <button type="button" className="ant-btn ant-btn-link" onClick={() => handleBack()}>
                    <i aria-label="icon: left" className="anticon anticon-left">
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                        </svg>
                    </i>
                    <span>Back</span>
                </button>
                <div data-product-id="61f866356fcab45f37ad45d8" data-store-id="55814" data-store-type="3" className={styles.iBeWfn}>
                    <img src={data ? 'https://images-na.ssl-images-amazon.com/images/I/' + data.images.split(',')[0]: ''} alt="product-pic" style={{zIndex: 2}}/>
                    <div>
                        <h6>{data ? data.title: ''}</h6>                        
                    </div>
                    <div>
                        <span className="ant-dropdown-trigger">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" size="20" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </span>
                        <button type="button" className="ant-btn ant-btn-primary ant-btn-lg">
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
            <div style={{position: 'absolute', top: '0px', left: '0px', width: '100%'}}>
                <div>
                    <div class="ant-dropdown ant-dropdown-placement-bottomRight" style={{left: '1053px', top: '170px'}}>
                        <ul class="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical" role="menu" tabindex="0">
                            <li class="ant-dropdown-menu-item" role="menuitem" aria-disabled="false">
                                <span>
                                    <svg class="trash-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="20">
                                        <path fillRule="evenodd" clip-rule="evenodd" d="M11 5H13V6H18V8H6V6H11V5ZM9 17V9H7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V9H15V17H9Z" fill="#727272"></path>
                                    </svg>
                                    Delete Main Product
                                </span>
                            </li>
                            <li class="ant-dropdown-menu-item" role="menuitem" aria-disabled="false">
                                <span>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" size="20" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"></path
                                        ><path fillRule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"></path>
                                    </svg>
                                    Regrab Product Details
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
