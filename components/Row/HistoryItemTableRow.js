import styles from './HistoryItemTableRow.module.scss'
import Image from 'next/image'
import ProgressIcon from '@assets/ProgressIcon'
import CompleteIcon from '@assets/CompleteIcon'
import FailIcon from '@assets/FailIcon'
import AmazonIcon from '@assets/AmazonIcon'
import ShopifyIcon from '@assets/ShopifyIcon'

export default function HistoryItemTableRow({data}) {

  let statusIcon = null
  let statusText = null

  if(data.status == 0) {
    statusIcon = <ProgressIcon/>
    statusText = 'In progress'
  } else if(data.status == 1) {
    statusIcon = <CompleteIcon/>
    statusText = 'Completed'
  } else {
    statusIcon = <FailIcon/>
    statusText = 'Failed'
  }
    
  return (
    <div className={`ant-row-flex ant-row-flex-middle ${styles.eaIwdf}`} style={{marginLeft: -8, marginRight: -8}}>
      <div className={`${styles['ant-col']} ant-col ant-col-5`} style={{paddingLeft: 8, paddingRight: 8}}>
        <Image
          src={data.image? process.env.IMAGE_PATH + data.image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPoSURBVHgB7ZrRS+NAEIcnZ0VBUVBUVBQVBR/0Sd/8+31TUPBNUVBQVBQsbWlLy919C1P2tkla283KpftBaE2zm/3tzCYzOybVavW3TBC/ZMKIgstOFFx2ouCyEwWH4uvryxyhqUhAOp2OPD8/y9vbm7RaLXNuYWFBtre3ZXFxUUKQFB1aIvLj48OI/HuvzOtCCS9MMO6K0Pf3dyPaplKpyMrKijQajT63Llq4V8FpLpvG7OysbG1tyerqqhH89PQUTLhXwefn533nZmZmZG1tTZrNppkIG0Tt7e3J3NxcMOGFCsZ1d3d3jSUB0YhyhfM7opicPOHHx8cyLoVbGGwXBoTf3d31ieJ3281dzs7OZFwKEYz7YS3Xkq5whN3e3uaudxsfggsJPBB7cHAgJycnPXGAZRF4eXnZmwzWbxosh/X1de8PrUIDDyyKcKxqr10VnsXy8rIcHh6a73nXjUKQ0FKFuxZXsCIPLWVqakqKImgsrcL39/d757D+0dGR+QxB0Fg6DSZBYe1j7TQv8MWPC7Y5PT2Voon5cNmJgn1Qr9eHjp5CU5jgi4uLb4WNLqSaj4+P8vn5KT7x+pTm/UpEpSKJrDjsbGgQxNe0Qai7ceADr4LJezleX19zhaeBUCzqbgMRU29sbJi42geF7mm5whUSBtweCDT47lqTazRdRLQvkhD14SzhaTABhJn/xZ7WILKE66YeyyErXfRF8hP/AaDCu91ub336dNs8kvgvDyUnCi47UXDZmTjBmS8/wj2qf7wneUdqbcj+m8IZ79K0fSjaavgIBBUkD7yDac9WrF5HIEK/oMkDO5ebm5u98otbpdAYWwt49DHMflimhWu1mgkOtORBhxosIPb6+tqUO/n74eHBHDZkO5RKaYeAq6srMzjNhOzrGDCQPNzc3Jg+2+22STERSjv64dqXlxfznYNx0K/2p+3zGBjeMJilpaV/ziGcGWZ7FRgUN2LG7RRQKxAMjGrDoNyWfumDAhzQJ+e4Dx6BICaMPuH+/l6SJDG/Mx4dB59ZsfhAwdycwtfOzk7vHNanmmcLA4TZgrGMFsZB42SEYz3AmrgvbcGeXL67nmNDW+6nYamKZCmNLJgZZ4D2jaenp/tunAZup6USrQMDn7rxjgfZa91OE/k+KMZ2r4e8jYahntLsZNiimHkmQSv9uB0b6u6sIoy9Zg47gdcNdw4VpO3piwnQh5e7nGx4QHGtPrRwefqbn5/PbDNUiqJlTrUyVrcLYgjT4tc4MLEsHx5EwLrV9ZyG1qSYJMaGWPrIs/DY2dIwbjdKn/CdfrHwMHtmMT0sO1Fw2YmCy04UXHai4LLzB2ICvssccWUOAAAAAElFTkSuQmCC"}
          alt="product-img"
          width={32}
          height={32}
        />
        <div className="ellipsis">
          {
            data.title ? data.title: '-'
          }
        </div>
      </div>
      <div className={`${styles['ant-col']} ant-col ant-col-3`} style={{paddingLeft: 8, paddingRight: 8}}>
        {new Date(data.upload_time).toLocaleDateString([], {year: "numeric", month: "short", day: "numeric"})}
      </div>
      <div className={`${styles['ant-col']} ant-col ant-col-4`} style={{paddingLeft: 8, paddingRight: 8}}>
        <a 
          href={`https://www.amazon.com/dp/${data.asin}/ref=sr_1_15&amp;th=1&amp;psc=1`} 
          className="link-main" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <AmazonIcon/>
          <div className="ellipsis">{data.asin}</div>
        </a>
      </div>
      <div className={`${styles['ant-col']} ant-col ant-col-4`} style={{paddingLeft: 8, paddingRight: 8}}>        
        {
          data.shopify_id ? 
          <a 
            href={`https://${process.env.SHOP}/products/${data.handle}`} 
            className="link-main" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ShopifyIcon/>{data.shopify_id}
          </a>
          : '-'
        }
      </div>
      <div className={`${styles['ant-col']} ant-col ant-col-4`} style={{paddingLeft: 8, paddingRight: 8}}>
        <i aria-label="icon: loading" className={`anticon anticon-loading ${styles['anticon-loading']}`}>
          {statusIcon}
        </i>
        {statusText}
      </div>
      <div className={`${styles['ant-col']} ant-col ant-col-1`} style={{paddingLeft: 8, paddingRight: 8}}></div>
    </div>
  )
}
