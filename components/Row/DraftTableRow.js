import styles from './DraftTableRow.module.scss'
import Image from 'next/image'
import React, { useState } from "react"
import ProductDetailView from '../ProductDetailView'
import CheckBox from '@components/Input/CheckBox'
import TrashIcon from '@assets/TrachIcon'
import EditIcon from '@assets/EditIcon'
import PlusIcon from '@assets/PlusIcon'
import RightArrowIcon from '@assets/RightArrowIcon'
import CheckIcon from '@assets/CheckIcon'

export default function DraftTableRow(props) {

  const {data, loading, check, handleCheck, handleImport, handleDelete, handleSave} = props
  const [expand, setExpand] = useState(false)

  function handleExpand(){
    setExpand(!expand)
  }

  return (
    <div className={loading? styles.hriRTw: expand? styles.iDyVgT + ' ' + styles.active: styles.dryhGD}>
      <div className={styles.bsjSQS} onClick={handleExpand}></div>
      <div className={expand? styles.ePHYLU: styles.ePHYLV}></div>
      <div className={expand? styles.gSYtiJ: styles.gSYtiI}></div>
      <div className={styles.eppMTg}>
        <div className={expand? styles.LmTeH: styles.ccTyjK}>
          <CheckBox
            check={check}
            handleCheck={() => handleCheck(data.id)}
          />
          <i aria-label="icon: right" className={`${styles['anticon-right']} anticon anticon-right`}>
            <RightArrowIcon/>
          </i>
          <Image 
            className={styles.img} 
            src={process.env.IMAGE_PATH + data.images.split(',')[0]} 
            alt="product-pic" 
            width={60}
            height={60}
          />
          <div className={`${styles.info} ellipsis`} style={{zIndex: 2}}>
            <p className="ellipsis">{data.title}</p>
            <div className={styles['info-sub']}>              
              <span>Variants: {data.variants.length}</span>
              <span className="view">
                <a 
                  href={`https://www.amazon.com/dp/${data.asin}/ref=sr_1_16&amp;th=1&amp;psc=1`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>View Source Product</span>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.iPOzKR}>
          <a 
            target="_blank" 
            rel="noreferrer" 
            href={`/drafts/${data.id}`}
          >
            <EditIcon/>
          </a>
          <TrashIcon
            onClick={handleDelete}
          />
          {
            expand && 
            <button 
              type="button" 
              className={data.updated?`ant-btn ${styles.save}`:`ant-btn ${styles.save} disabled`}
              onClick={() => handleSave(data.id)}
            >
              <CheckIcon/>
              <span>Save</span>
            </button>
          }
          <button 
            type="button" 
            className={expand?`ant-btn ${styles.import} ${styles.expanded} ant-btn-primary` :`ant-btn ${styles.import}`} 
            onClick={() => handleImport(data.id)}
          >
            <PlusIcon/>
            <span>{data.updated? 'Save & Import': 'Import'}</span>
          </button>
        </div>
      </div>
      <div className="expanded-content">
        {
          expand &&
          <ProductDetailView
            fullpage={false}
            expand={expand}
            data={data}
          />
        }
      </div>
    </div>    
  )
}
