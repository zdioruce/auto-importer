import styles from './ProductTableRow.module.scss'
import Image from 'next/image'
import CheckBox from '@components/Input/CheckBox'
import TrashIcon from '@assets/TrachIcon'
import ShopifyIcon from '@assets/ShopifyIcon'
import AmazonIcon from '@assets/AmazonIcon'

export default function ProductTableRow({item, check, loading, handleCheck, handleDelete}) {

  return (
    <tr className={loading? `${styles.jGrMLl} ${styles.hriRTw}`: styles.jGrMLl}>
      <td className={styles.fixed} style={{width: 36, left: 0, minWidth: 36, maxWidth: 36}}>
        <CheckBox
          check={check}
          handleCheck={() => handleCheck(item.id)}
        />
      </td>
      <td className={styles.fixed} style={{width: 260, left: 36, minWidth: 260, maxWidth: 260}}>
        <div className={styles.eYCsDc}>
          <a 
            target="_blank" 
            rel="noreferrer" 
            href={`/products/${item.id}`}
          >
            <img 
              className={styles.img} 
              src={process.env.IMAGE_PATH + item.images.split(',')[0]} 
              alt="prod-img"
              width={60}
              height={60}
            />
          </a>
          <p>{item.title}</p>
        </div>
      </td>
      <td className={styles.fixed} style={{width: 120, left: 296, minWidth: 120, maxWidth: 120}}>
        {new Date(item.upload_time).toLocaleDateString([], {year: "numeric", month: "short", day: "numeric"})}
      </td>
      <td className={`${styles.fixed} ${styles['last-fixed']}`} style={{width: 80, left: 416, minWidth: 80, maxWidth: 80}}>
        <div className={styles.bKojHK}>          
          <TrashIcon
            onClick={handleDelete}
          />
        </div>
      </td>
      <td style={{width: 85, minWidth: 85, maxWidth: 85}}>
        <span color="#59ce88" className={styles.fTIbgQ}>{item.variants.length}</span>
      </td>      
      <td style={{width: 190, minWidth: 190, maxWidth: 190}}>
        <div className={styles.gcXOEA}>
          ${item.min} - ${item.max}
        </div>
      </td>
      <td style={{width: 200, minWidth: 200, maxWidth: 200}}>
        <div className={styles.gcXOEA}>
          <span className={styles.WxgtO}>Buy</span>
          <a 
            href={`https://www.amazon.com/dp/${item.asin}/ref=sr_1_15&amp;th=1&amp;psc=1`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.GUZaV} ellipsis`}
          >
            <AmazonIcon
              className={styles['site-icn']} 
            />
            {item.asin}
          </a>
        </div>
        <div className={styles.gcXOEA}>
          <span className={styles.WxgtO}>Sell</span>
          <a 
            href={`https://${process.env.SHOP}/products/${item.handle}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.GUZaV} ellipsis`}
          >
            <ShopifyIcon
              className={styles['site-icn']} 
            />
            {item.shopify_product_id}
          </a>
        </div>
      </td>      
      <td style={{width: 200, minWidth: 200, maxWidth: 200}}>
        <div className={styles.ekTzJw}>
          <p className="ellipsis">{item.tags.split(',')[0]}</p>
          {
            item.tags > 1? <p>+{item.tags.length - 1}</p>: null
          }          
        </div>
      </td>
    </tr>
  )
}
