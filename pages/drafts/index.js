import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import DraftDeleteModal from '@components/DraftDeleteModal'
import DraftAllImportModal from '@components/DraftAllImportModal'
import PageLayout from '@components/PageLayout'
import NoProducts from '@components/NoProducts'
import Loading from '@components/Loading'
import DraftTableRow from '@components/DraftTableRow'

export default function Drafts({drafts}) {

  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false)
  const [selectedProductIDs, setSelectProductIDs] = useState([])
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData();
  }, [data, error])

  async function fetchData() {
    await fetch('/api/drafts')
    .then(response => response.json())
    .then(data => {
      setData(data)
    })   
    .catch((error) => {
      setError(error)
    });
  }

  async function handleImport(id) {
    await fetch('/api/drafts/import/' + id)
    .then(response => response.json())
    .then(data => {
      fetchData()
    }) 
  }

  async function handleDelete() {
    setShowProductDeleteModal(false)

    await fetch('/api/drafts/delete/' + productID)
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

  function handleAllImport() {
    
  }

  let title = null
  let content = null
  
  if (error) {
    title = 'Upload (0)'
    content = <div>failed to load</div>
  }

  if (!data) {
    title = 'Upload (0)'
    content = <Loading color={'#e49e4c'}/>
  } else if(data.result.length == 0) {
    title = 'Upload (0)'
    content = <NoProducts/>
  } else {
    title = 'Upload (' + data.result.length + ')'
    content = []
    data.result.forEach((element, index) => {
      content.push(
        <DraftTableRow
          key={index} 
          check={selectedProductIDs.includes(element.id)}
          data={element}
          handleCheck={handleCheck}
          handleImport={handleImport}
        />
      )
    })  
  }

  return (
    <PageLayout
      title={title}
    >
      <div className={styles.zrVas}>     
        {/* {content} */}
        <div className={styles.ewSfgI}>
          <div className={styles.dqaTgJ}>
            <div className="ant-row-flex ant-row-flex-middle">
              <div className="ant-col ant-col-1">
                <label className={selectedProductIDs.length > 0? "ant-checkbox-wrapper ant-checkbox-wrapper-checked": "ant-checkbox-wrapper"}>
                  <span className={selectedProductIDs.length > 0? "ant-checkbox ant-checkbox-indeterminate ant-checkbox-checked": "ant-checkbox"}>
                    <input type="checkbox" className="ant-checkbox-input" value="" onChange={handleAllCheck}/>
                    <span className="ant-checkbox-inner"></span>
                  </span>
                </label>
              </div>
              <div className="ant-col ant-col-xl-15 ant-col-xxl-17">
                <div className={styles.bhqtkb}>
                  <span className={selectedProductIDs.length > 0? styles.checked: ''}>{selectedProductIDs.length > 0? selectedProductIDs.length + ' Items Selected': '0 Results Selected'}</span>
                  {
                    selectedProductIDs.length > 0 ? 
                    <>
                      <div>
                        <button type="button" className="ant-btn btn-link ant-btn-link">
                          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path className="plus-icon" d="M12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z" fill="#090E35"></path>
                          </svg>
                          <span>Import all</span>
                        </button>                    
                      </div>
                      <div>
                        <button type="button" className="ant-btn btn-link ant-btn-link" onClick={() => setShowProductDeleteModal(true)}>
                          <svg className="trash-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11 5H13V6H18V8H6V6H11V5ZM9 17V9H7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V9H15V17H9Z" fill="#727272"></path>
                          </svg>
                          <span> Remove from list</span>
                        </button>
                      </div>
                    </> : null
                  }
                </div>
              </div>
              {/* <div className="ant-col ant-col-xl-8 ant-col-xxl-6">
                <div className="gxNXxE">
                  <span>Single Uploads</span>
                  <span>View History</span>
                  <span>
                    Expand all
                    <span className="question-mark-icn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          {content}
        </div>
        <DraftDeleteModal
          show={showProductDeleteModal}
          handleClose={() => setShowProductDeleteModal(false)}
          handleDelete={() => handleDelete()}
          count={selectedProductIDs.length}
        />    
        <DraftAllImportModal
          show={showProductDeleteModal}
          handleClose={() => setShowProductDeleteModal(false)}
          handleOk={() => handleAllImport()}
          count={selectedProductIDs.length}
        />    
      </div> 
    </PageLayout>
  )
}
