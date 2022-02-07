import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import SingleDraftDeleteModal from '../../components/SingleDraftDeleteModal'
import Image from 'next/image';
export default function Drafts() {

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  const customStyles = {
    rows: {
        style: {
          opacity: 1,
          pointerEvents: 'all',
          transition: 'all 0.3s ease 0s',
          minHeight: '82px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent transparent rgb(229, 229, 229)',
          position: 'relative',
          overflow: 'hidden',
        },
    },
  };

  const columns = [
    {
        cell: row => (      
          <div className={styles.eppMTg}>
            <div className={styles.ccTyjK}>
              <Image src={'https://images-na.ssl-images-amazon.com/images/I/' + row.images.split(',')[0]} alt="product-pic" width='60px' height='60px' style={{transform: "rotate('0deg') scaleX(1) scaleY(1)"}}/>
              <div data-product-id="61ff4325440fc8fcbc29c696" data-store-id="55814" data-store-type="3" className={styles.info + " ellipsis"} style={{zIndex: 2}}>
                <p className="ellipsis">{row.title}</p>
                <div className={styles['info-sub']}>
                  <span className={styles['with-icon']}>
                    Destination:
                    <svg className="site-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.9893 19.8791L13.9895 19.873L13.9618 19.8791L5 18.186C5 18.186 6.15132 9.1907 6.19737 8.87442C6.25263 8.45581 6.26184 8.44651 6.70395 8.30698C6.73889 8.29185 6.91994 8.23574 7.20456 8.14752L7.20469 8.14748C7.4452 8.07294 7.75964 7.97548 8.12237 7.86047C8.42632 6.55814 9.40263 4 11.4289 4C11.6868 4 12 4.14884 12.2395 4.46512H12.3224C13.1974 4.46512 13.6855 5.2186 13.9711 6.04651C14.2566 5.95349 14.4316 5.89767 14.4408 5.89767C14.4884 5.88565 14.5784 5.86974 14.6609 5.8851L14.6616 5.86975C14.6985 5.86975 14.7445 5.88836 14.7814 5.92557C14.8827 6.00929 15.7208 6.8558 15.7208 6.8558C15.7208 6.8558 16.9274 6.94882 16.9827 6.94882C17.0379 6.96743 17.1024 7.00464 17.1393 7.08836C17.1485 7.17208 18.8524 18.8186 18.8524 18.8186L13.9893 19.8791ZM13.4737 6.17674C13.2526 6.24186 12.9855 6.32558 12.7184 6.4186V6.25116C12.7184 5.74884 12.6539 5.33953 12.5342 5.01395C12.9947 5.06977 13.2803 5.58139 13.4737 6.17674ZM11.9724 5.11628C12.0921 5.43256 12.175 5.87907 12.175 6.49302V6.58605C11.9759 6.64935 11.7724 6.71266 11.565 6.77716C11.2543 6.87378 10.9351 6.97308 10.6092 7.07907C10.9132 5.90697 11.4934 5.33023 11.9724 5.11628ZM11.3829 4.53953C11.475 4.53953 11.5671 4.57674 11.6408 4.63256C10.9868 4.93953 10.2961 5.71163 10.0105 7.27442C9.81009 7.33903 9.61359 7.39964 9.42105 7.45905C9.19776 7.52793 8.97978 7.59518 8.76711 7.66512C9.09868 6.47442 9.92763 4.53953 11.3829 4.53953ZM11.7328 11.4605L12.3222 9.66519C12.3222 9.66519 11.917 9.42333 11.1249 9.43263C8.99725 9.43263 7.94725 10.8652 7.94725 12.3443C7.94725 13.3383 8.495 13.788 8.97436 14.1815C9.34729 14.4877 9.67882 14.7599 9.67882 15.228C9.67882 15.4884 9.49461 15.8419 9.0433 15.8419C8.36172 15.8419 7.55119 15.135 7.55119 15.135L7.13672 16.5117C7.13672 16.5117 7.9104 17.4791 9.45777 17.4791C10.738 17.4791 11.6867 16.5024 11.6867 14.9861C11.6867 13.8205 10.9105 13.2446 10.2978 12.79C9.89829 12.4936 9.5683 12.2487 9.5683 11.9257C9.5683 11.7768 9.61435 11.1722 10.563 11.1722C11.1986 11.1722 11.7328 11.4605 11.7328 11.4605Z" fill="#5A5859"></path>
                    </svg>
                    holiday limited
                  </span>
                  <span size="16" className="ijFQRZ">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M448 348.106V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80v351.988c0 26.51 21.49 48 48 48h268.118a48 48 0 0 0 33.941-14.059l83.882-83.882A48 48 0 0 0 448 348.106zm-128 80v-76.118h76.118L320 428.106zM400 80v223.988H296c-13.255 0-24 10.745-24 24v104H48V80h352z"></path>
                    </svg>
                  </span>
                  <span>Supplier: Amazon US</span>
                  <span>Variants: 6</span>
                  <span className="view">
                    <a href="https://www.amazon.com/dp/B08GH9KL4M/ref=sr_1_10&amp;th=1&amp;psc=1" target="_blank" rel="noopener noreferrer">
                      <span>View Source Product</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.iPOzKR}>
              <svg className="trash-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleSingleProductDeleteModal(row.id)}>
                <path fillRule="evenodd" clipRule="evenodd" d="M11 5H13V6H18V8H6V6H11V5ZM9 17V9H7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V9H15V17H9Z" fill="#727272"></path>
              </svg>
              <button type="button" className={"ant-btn " + styles.import} onClick={() => handleImport(row.id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z" fill="#727272"></path>
                </svg>
                <span> Import</span>
              </button>
            </div>
          </div>    
        ),
    },
  ];

  const [data, setData] = useState([])
  const [showSingleProductDeleteModal, setShowSingleProductDeleteModal] = useState(false)
  const [productID, setProductID] = useState()

  useEffect(() => {
    console.log('refresh')

    fetchData();
  }, [])

  async function fetchData() {
    await fetch('/api/drafts')
    .then(response => response.json())
    .then(data => {
      setData(data.result)
    })   
  }

  async function handleImport(id) {
    console.log(id)

    await fetch('/api/drafts/import/' + id)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      fetchData();
    }) 
  }

  async function handleDelete() {
    console.log(productID)
    setShowSingleProductDeleteModal(false)

    await fetch('/api/drafts/delete/' + productID)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      fetchData();
    }) 
  }

  function handleSingleProductDeleteModal(id) {
    setProductID(id)
    setShowSingleProductDeleteModal(true)
  }

  return (
    <div>   
      <div className={styles.cFZvyK}>
        <div className='ant-row'>
          <div className='ant-col ant-col-xl-12 ant-col-xxl-14'>
            <h2>Upload ({data.length}) </h2>
          </div>
        </div>
      </div>   
      <div className={styles.zrVas}>
        {
          data.length > 0?
            <DataTable
              pagination
              columns={columns}
              data={data}
              selectableRows
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              customStyles={customStyles}
            /> :
            <div height="420" className={styles.iEWzQZ}>
              <div className={styles.gwIBEu}>
                <div className={styles.hpZlJk}>
                  <div className={styles.bMbqPw}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="add-product-icn">
                      <path fillRule="evenodd" clipRule="evenodd" d="M24.1144 3.82104L42 12.7639V26H38V16.8859L33.9998 18.386V23L29.9998 24V19.886L26 21.3859V36.9419L30 35.1919V39.558L23.9434 42.2077L6 33.236V10.6139L24.1144 3.82104ZM10 15.236L22 21.236V36.7639L10 30.7639V15.236ZM35.0033 13.7377L32.1436 14.8101L21.4339 9.09824L23.8856 8.17882L35.0033 13.7377ZM12.9966 12.2622L16.443 10.9698L27.1528 16.6816L24.1144 17.821L12.9966 12.2622Z" fill="#CACACA"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M39 29C38.4477 29 38 29.4477 38 30V34H34C33.4477 34 33 34.4477 33 35V37C33 37.5523 33.4477 38 34 38H38V42C38 42.5523 38.4477 43 39 43H41C41.5523 43 42 42.5523 42 42V38H46C46.5523 38 47 37.5523 47 37V35C47 34.4477 46.5523 34 46 34H42V30C42 29.4477 41.5523 29 41 29H39Z" fill="#EA8C1F"></path>
                    </svg>
                  </div>
                  <h3>You don&apos;t have any products yet...</h3>
                  <p>Save time and start your first upload here!</p>
                  <button type="button" className="ant-btn ant-btn-primary ant-btn-lg" ant-click-animating-without-extra-node="false">
                    <span>Add Products</span>
                  </button>
                </div>
              </div>
            </div>  
        }
      </div>  
      <SingleDraftDeleteModal
        show={showSingleProductDeleteModal}
        handleClose={() => setShowSingleProductDeleteModal(false)}
        handleDelete={() => handleDelete()}
      />    
    </div>
  )
}
