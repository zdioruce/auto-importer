import styles from './VariantTableRow.module.scss'
import Image from 'next/image'

export default function VariantTableRow({data}) {

  return (
    <div className={styles.jypVEH}>
      <div className={styles['ant-row-flex'] + " ant-row-flex ant-row-flex-middle"}>
        <label className={styles["ant-checkbox-wrapper"] + " ant-checkbox-wrapper"}>
          <span className="ant-checkbox">
            <input type="checkbox" className="ant-checkbox-input" value=""/>
            <span className="ant-checkbox-inner"></span>
          </span>
        </label>
        <div className={styles['ant-col'] + " ant-col ant-col-22"}>
          <Image className={styles.img} src={process.env.IMAGE_PATH + data.image} alt="variant-pic" width={'60px'} height={'60px'}/>
          <div className={styles.eIbWUB}>
            <div>{data.option1_name}: {data.option1_value}</div>
            <div>
              <span>
                <div color="#59ce88" className={styles.hSaXbT}>In stock</div>
              </span>
              <span>Buy ID: {data.sku}</span>
              <span>Price: ${data.price}</span>
            </div>
          </div>
        </div>
        <div className={styles['ant-col'] + " ant-col ant-col-2 actions variants " + styles['actions']}>
          <svg className="trash-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 5H13V6H18V8H6V6H11V5ZM9 17V9H7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V9H15V17H9Z" fill="#727272"></path>
          </svg>          
          <svg className="edit-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13 7.58231L14.2894 6.29289C14.6813 5.90101 15.3171 5.90257 15.7071 6.29637L17.2851 7.88994C17.6724 8.28101 17.6708 8.9115 17.2816 9.30067L16 10.5823L13 7.58231ZM12 8.58231L6 14.5823L9 17.5823L15 11.5823L12 8.58231ZM6 17.5823V14.5823L9 17.5823H6Z" fill="#727272"></path>
          </svg>
        </div>
      </div>
    </div>      
  )
}
