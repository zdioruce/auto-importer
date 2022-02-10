import styles from './DraftTableRow.module.scss'
import Image from 'next/image'
import React, { useState } from "react"
import ProductDetailView from './ProductDetailView'
import { NavItem } from 'react-bootstrap'

export default function DraftTableRow({data, check, handleCheck, handleImport}) {

  const [expand, setExpand] = useState(false)

  function handleExpand(id){
    setExpand(!expand)
  }

  return (
    <div className={expand? styles.iDyVgT + ' ' + styles.active: styles.dryhGD}>
      <div className={styles.bsjSQS} onClick={() => handleExpand(data.id)}></div>
      <div className={expand? styles.ePHYLU: styles.ePHYLV}></div>
      <div className={expand? styles.gSYtiJ: styles.gSYtiI}></div>
      <div className={styles.eppMTg}>
        <div className={expand? styles.LmTeH: styles.ccTyjK}>
          <label className={check? "ant-checkbox-wrapper ant-checkbox-wrapper-checked": "ant-checkbox-wrapper"}>
            <span className={check? "ant-checkbox ant-checkbox-checked": "ant-checkbox"}>
              <input type="checkbox" className="ant-checkbox-input" value="" onChange={() => handleCheck(data.id)}/>
              <span className="ant-checkbox-inner"></span>
            </span>
          </label>
          <i aria-label="icon: right" className={styles['anticon-right'] + " anticon anticon-right"}>
            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
            </svg>
          </i>
          <Image className={styles.img} src={process.env.IMAGE_PATH + data.images.split(',')[0]} alt="product-pic" width={'60px'} height={'60px'}/>
          <div data-product-id="62015dc27f1e4b63d8bd7812" data-store-id="55814" data-store-type="3" className={styles.info + ' ellipsis'} style={{zIndex: 2}}>
            <p className="ellipsis">{data.title}</p>
            <div className={styles['info-sub']}>
              {/* <span className="with-icon">
                Destination:
                <svg className="site-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.9893 19.8791L13.9895 19.873L13.9618 19.8791L5 18.186C5 18.186 6.15132 9.1907 6.19737 8.87442C6.25263 8.45581 6.26184 8.44651 6.70395 8.30698C6.73889 8.29185 6.91994 8.23574 7.20456 8.14752L7.20469 8.14748C7.4452 8.07294 7.75964 7.97548 8.12237 7.86047C8.42632 6.55814 9.40263 4 11.4289 4C11.6868 4 12 4.14884 12.2395 4.46512H12.3224C13.1974 4.46512 13.6855 5.2186 13.9711 6.04651C14.2566 5.95349 14.4316 5.89767 14.4408 5.89767C14.4884 5.88565 14.5784 5.86974 14.6609 5.8851L14.6616 5.86975C14.6985 5.86975 14.7445 5.88836 14.7814 5.92557C14.8827 6.00929 15.7208 6.8558 15.7208 6.8558C15.7208 6.8558 16.9274 6.94882 16.9827 6.94882C17.0379 6.96743 17.1024 7.00464 17.1393 7.08836C17.1485 7.17208 18.8524 18.8186 18.8524 18.8186L13.9893 19.8791ZM13.4737 6.17674C13.2526 6.24186 12.9855 6.32558 12.7184 6.4186V6.25116C12.7184 5.74884 12.6539 5.33953 12.5342 5.01395C12.9947 5.06977 13.2803 5.58139 13.4737 6.17674ZM11.9724 5.11628C12.0921 5.43256 12.175 5.87907 12.175 6.49302V6.58605C11.9759 6.64935 11.7724 6.71266 11.565 6.77716C11.2543 6.87378 10.9351 6.97308 10.6092 7.07907C10.9132 5.90697 11.4934 5.33023 11.9724 5.11628ZM11.3829 4.53953C11.475 4.53953 11.5671 4.57674 11.6408 4.63256C10.9868 4.93953 10.2961 5.71163 10.0105 7.27442C9.81009 7.33903 9.61359 7.39964 9.42105 7.45905C9.19776 7.52793 8.97978 7.59518 8.76711 7.66512C9.09868 6.47442 9.92763 4.53953 11.3829 4.53953ZM11.7328 11.4605L12.3222 9.66519C12.3222 9.66519 11.917 9.42333 11.1249 9.43263C8.99725 9.43263 7.94725 10.8652 7.94725 12.3443C7.94725 13.3383 8.495 13.788 8.97436 14.1815C9.34729 14.4877 9.67882 14.7599 9.67882 15.228C9.67882 15.4884 9.49461 15.8419 9.0433 15.8419C8.36172 15.8419 7.55119 15.135 7.55119 15.135L7.13672 16.5117C7.13672 16.5117 7.9104 17.4791 9.45777 17.4791C10.738 17.4791 11.6867 16.5024 11.6867 14.9861C11.6867 13.8205 10.9105 13.2446 10.2978 12.79C9.89829 12.4936 9.5683 12.2487 9.5683 11.9257C9.5683 11.7768 9.61435 11.1722 10.563 11.1722C11.1986 11.1722 11.7328 11.4605 11.7328 11.4605Z" fill="#5A5859"></path>
                </svg>
                holiday limited
              </span>
              <span size="16" className={styles.ijFQRZ}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M448 348.106V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80v351.988c0 26.51 21.49 48 48 48h268.118a48 48 0 0 0 33.941-14.059l83.882-83.882A48 48 0 0 0 448 348.106zm-128 80v-76.118h76.118L320 428.106zM400 80v223.988H296c-13.255 0-24 10.745-24 24v104H48V80h352z"></path>
                </svg>
              </span>
              <span>Supplier: Amazon US</span> */}
              <span>Variants: 8</span>
              <span className="view">
                <a href={"https://www.amazon.com/dp/" + data.asin + "/ref=sr_1_16&amp;th=1&amp;psc=1"} target="_blank" rel="noopener noreferrer">
                  <span>View Source Product</span>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.iPOzKR}>
          <a target="_blank" rel="noreferrer" href={"/drafts/" + data.id}>
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="full-edit-icn">
              <path fillRule="evenodd" clipRule="evenodd" d="M7 8C7 7.44772 7.44772 7 8 7H11V5H8C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V13H17V16C17 16.5523 16.5523 17 16 17H8C7.44772 17 7 16.5523 7 16V8ZM13 7H15.5858L10.2929 12.2929L11.7071 13.7071L17 8.41421V11H19V6C19 5.44772 18.5523 5 18 5H13V7Z" fill="#B7B7B7"></path>
            </svg>
          </a>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={styles['ant-dropdown-trigger'] + " ant-dropdown-trigger"} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
          <button type="button" className={"ant-btn " + styles.import} onClick={() => handleImport(data.id)}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z" fill="#727272"></path>
            </svg>
            <span> Import</span>
          </button>
        </div>
      </div>
      <div className="expanded-content">
        <ProductDetailView
          expand={expand}
          data={data}
        />
      </div>
    </div>    
  )
}
