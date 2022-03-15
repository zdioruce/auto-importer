import styles from './ProductDetailHeader.module.scss'
import AmazonIcon from '@assets/AmazonIcon'
import ShopifyIcon from '@assets/ShopifyIcon'
import TrashIcon from '@assets/TrachIcon'
import ProgressIcon from '@assets/ProgressIcon'
import Image from 'next/image'

export default function ProductDetailHeader({loading, data, handleSave, handleSaveImport}) {

  return (
    <div className={styles.iBeWfn}>
      <Image 
        className={styles.img}
        src={data ? process.env.IMAGE_PATH + data.images.split(',')[0]: ''} 
        alt="product-pic" 
        width={70}
        height={70}
      />
      <div>
        <h6>{data ? data.title: ''}</h6>       
        <div className={styles.jLbNeS}>
          <p>Destination:&nbsp;
            <ShopifyIcon/>
            <a 
              href={`https://${process.env.SHOP}/admin/products/${data.shopify_product_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {data.shopify_product_id}
            </a>
          </p>
          <p>Supplier:&nbsp;
            <AmazonIcon/>
            <a 
              href={`https://www.amazon.com/dp/${data.asin}/ref=sr_1_10&amp;th=1&amp;psc=1`} 
              target="_blank" 
              rel="noopener noreferrer">
              {data.asin}
            </a>
          </p>
          <p>
            <a 
              href={`https://${process.env.SHOP}/products/${data.handle}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{textDecoration: 'underline'}}>
              View on Shopify
            </a>
          </p>
        </div>                 
      </div>
      <div>
        <TrashIcon/>       
        <button 
          type="button" 
          className={loading? "ant-btn ant-btn-primary ant-btn-lg ant-btn-loading": "ant-btn ant-btn-primary ant-btn-lg"}
          onClick={handleSave}
        >
          {
            loading &&
            <i aria-label="icon: loading" className={`anticon anticon-loading ${styles['anticon-loading']}`}>
              <ProgressIcon/>
            </i>
          }
          <span>Save</span>
        </button>
        {
          data.status == 0 &&
          <button 
            type="button" 
            className={loading? "ant-btn ant-btn-primary ant-btn-lg ant-btn-loading": "ant-btn ant-btn-primary ant-btn-lg"}
            onClick={handleSaveImport}
          >
            <span>{'Save & Import'}</span>
          </button>
        }     
      </div>
    </div>
  )
}
