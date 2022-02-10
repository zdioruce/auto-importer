import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import ProductDeleteModal from '@components/ProductDeleteModal'
import PageLayout from '@components/PageLayout'
import NoProducts from '@components/NoProducts'
import Loading from '@components/Loading'
import ProductTableRow from '@components/ProductTableRow'
import ProductTableHead from '@components/ProductTableHead'
import TablePagination from '@components/TablePagination'

export default function Products() {

  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false)
  const [selectedProductIDs, setSelectProductIDs] = useState([])
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData();
  })

  async function fetchData() {
    await fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      setData(data)
    })   
    .catch((error) => {
      setError(error)
    });
  }

  async function handleDelete(option) {
    setShowProductDeleteModal(false)

    await fetch('/api/products/delete/', {
      method: 'post',
      body: JSON.stringify({productIDs, option})
    })
    .then(response => response.json())
    .then(data => {
      fetchData()
    }) 
  }

  function handleProductDeleteModal() {
    setShowProductDeleteModal(true)
  }

  function handleCheck(id) {
    if(selectedProductIDs.includes(id)){
      const index = selectedProductIDs.indexOf(id);
      if (index > -1) {
        selectedProductIDs.splice(index, 1); // 2nd parameter means remove one item only
      }
    }else{
      selectedProductIDs.push(id)
    }

    setSelectProductIDs(selectedProductIDs)
  }

  function handleAllCheck() {
    if(selectedProductIDs.length > 0){
      setSelectProductIDs([])
    } else{
      let ids = []
      data.result.map(element => {
        ids.push(element.id)
      })  

      setSelectProductIDs(ids)
    }
  }

  let title = null
  let content = null
  
  if (error) {
    title = 'Products (0)'
    content = <div>failed to load</div>
  }

  if (!data) {
    title = 'Products (0)'
    content = <Loading color={'#e49e4c'}/>
  } else if(data.result.length == 0) {
    title = 'Products (0)'
    content = <NoProducts/>
  } else {
    title = 'Products (' + data.result.length + ')'
    let rows = []
    data.result.forEach((element, index) => {
      rows.push(
        <ProductTableRow 
          key={index} 
          check={selectedProductIDs.includes(element.id)}
          item={element}
          handleCheck={handleCheck}
        />
      )
    }) 

    content = <div>
                <table>
                  <ProductTableHead/>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
                {/* <TablePagination/> */}
              </div>
  }

  return (
    <PageLayout
      title={title}
    >
      <div className={styles.zrVas}>
        <div className={styles.iwrWXZ}>
          <div>
            <div className={styles.hFzCJJ}>
              <label className="ant-checkbox-wrapper">
                <span className={selectedProductIDs.length > 0? "ant-checkbox ant-checkbox-indeterminate": "ant-checkbox"}>
                  <input type="checkbox" className="ant-checkbox-input" value="" checked="" onChange={handleAllCheck}/>
                  <span className="ant-checkbox-inner"></span>
                </span>
              </label>
              <p className={selectedProductIDs.length > 0? styles.checked: ''}>
                {selectedProductIDs.length > 0? selectedProductIDs.length + ' Items Selected': '0 Results Selected'}
              </p>
              {
                selectedProductIDs.length > 0?
                <span onClick={handleProductDeleteModal}>
                  <svg className="trash-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 5H13V6H18V8H6V6H11V5ZM9 17V9H7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V9H15V17H9Z" fill="#727272"></path>
                  </svg>
                </span> : null
              }
            </div>
            {/* <div className="fhZQmL">
              <span>View History</span>
              <span>
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 8C8 7.44772 8.44772 7 9 7C9.55228 7 10 7.44772 10 8V16C10 16.5523 9.55228 17 9 17C8.44772 17 8 16.5523 8 16V8ZM12 8C12 7.44772 12.4477 7 13 7C13.5523 7 14 7.44772 14 8V16C14 16.5523 13.5523 17 13 17C12.4477 17 12 16.5523 12 16V8ZM17 7C16.4477 7 16 7.44772 16 8V16C16 16.5523 16.4477 17 17 17C17.5523 17 18 16.5523 18 16V8C18 7.44772 17.5523 7 17 7Z" fill="#B7B7B7"></path>
                </svg>
              </span>
            </div> */}
          </div>
        </div>
        <div id="products-table" className={styles.bJBQtm + ' with-custom-heading'}>
          {content}
        </div>        
        <ProductDeleteModal
          show={showProductDeleteModal}
          handleClose={() => setShowProductDeleteModal(false)}
          handleDelete={handleDelete}
          count={selectedProductIDs.length}
        />     
      </div> 
    </PageLayout>   
  )
}
