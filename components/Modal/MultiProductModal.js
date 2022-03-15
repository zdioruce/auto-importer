import styles from './MultiProductModal.module.scss'
import * as XLSX from 'xlsx';
import { useState, useRef } from 'react'
import ParentModal from './ParentModal'
import Spin from '@components/Spin'
import TabPanel from '@components/Tab/TabPanel'
import Tab from '@components/Tab/Tab'
import CheckBox from '@components/Input/CheckBox'
import AddProductIcon from '@assets/AddProductIcon'
import DropCSVFileIcon from '@assets/DropCSVFileIcon'

export default function MultiProductModal({handleClose, handleImport}) {

  const [uploadVariations1, setUploadVariations1] = useState(0)
  const [uploadVariations2, setUploadVariations2] = useState(0)
  const [productIDs, setProductIDs] = useState('')
  const [productIDs1, setProductIDs1] = useState([])
  const [productIDs2, setProductIDs2] = useState([])
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const refTab1 = useRef(null);
  const refTab2 = useRef(null);

  const handleChange = (e) => {
    setProductIDs(e.target.value)
    if(e.target.value.length == 0) {
      setProductIDs1([])
    }
    else {
      let ids = e.target.value.split("\n")
      ids = ids.filter(element => element.length > 0)
      setProductIDs1(ids)
    }
  }

  const handleCsvUpload = (e) => {
    setLoading(true)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  } 

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
          if (d[0] == '"')
            d = d.substring(1, d.length - 1);
          if (d[d.length - 1] == '"')
            d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
      
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
    
    // prepare columns list from headers
    // const columns = headers.map(c => ({
    //     name: c,
    //     selector: c,
    // }));

    let asins = []
    list.map(element => asins.push(element.ASIN))
    setProductIDs2(asins)
    setLoading(false)
  }

  let tabX = 0
  let tabWidth = 0

  if(tab == 0) {
    tabX = 0
    tabWidth = refTab1.current? refTab1.current.offsetWidth: 63
  } else {
    tabX = refTab1.current.offsetWidth
    tabWidth = refTab2.current.offsetWidth
  }

  return (
    <ParentModal
      handleClose={handleClose}
      className={"add-prod-modal"}
    >
      <div className={styles.dsoMOu}>
        <div className={styles.iMSxfz + " " + styles.jIYPtr}>
          <AddProductIcon/>
          <div>
              <h2>Add Products</h2>
          </div>
        </div>
        <div className="ant-tabs ant-tabs-top ant-tabs-line ant-tabs-no-animation">
          <div role="tablist" className={styles['ant-tabs-bar'] + " ant-tabs-bar ant-tabs-top-bar"} tabIndex="0">                                            
            <div className="ant-tabs-nav-container">                        
              <div className="ant-tabs-nav-wrap">
                <div className="ant-tabs-nav-scroll">
                  <div className="ant-tabs-nav ant-tabs-nav-animated">
                    <div>
                      <Tab
                        refTab={refTab1}
                        title={"ID's"}
                        tab={0}
                        currentTab={tab}
                        onClick={() => setTab(0)}
                      />
                      <Tab
                        refTab={refTab2}
                        title={"Upload CSV"}
                        tab={1}
                        currentTab={tab}
                        onClick={() => setTab(1)}
                      />
                    </div>                                                            
                    <div className="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated" style={{display: 'block', transform: 'translate3d(' + tabX + 'px, 0px, 0px)', width: tabWidth}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ant-tabs-content ant-tabs-content-no-animated ant-tabs-top-content">
            <TabPanel 
              currentTab={tab} 
              tab={0}
            >
              {
                tab == 0 &&
                <>
                  <div className={styles.cLXRNz}>
                    <div>
                      Product ID’s<span> (For multiple products, click &lt;enter&gt; to separate them)</span>
                    </div>
                    <textarea className={"ant-input " + styles.textarea} value={productIDs} onChange={handleChange}></textarea>                                                                                                        
                    <div className='m-t-20'>
                      <CheckBox
                        check={uploadVariations1 == 1}
                        handleCheck={() => setUploadVariations1(uploadVariations1 == 1? 0: 1)}
                      />
                      Upload Variations
                    </div>
                  </div>
                  <div className={styles.JwezC} style={{marginTop: '30px'}}>
                    <button 
                      disabled={productIDs1.length == 0} 
                      type="button" 
                      className="ant-btn ant-btn-lg ant-btn-primary" 
                      onClick={() => handleImport(uploadVariations1, productIDs1, 0)}>
                      <span>Add As draft</span>
                    </button>
                    <button 
                      disabled={productIDs1.length == 0} 
                      type="button" 
                      className="ant-btn ant-btn-lg ant-btn-primary"
                      style={{marginLeft:10}}
                      onClick={() => handleImport(uploadVariations1, productIDs1, 1)}>
                      <span>Create and Publish</span>
                    </button>
                  </div>
                </>
              }              
            </TabPanel>
            <TabPanel 
              currentTab={tab} 
              tab={1}
            >
              {
                tab == 1 &&
                <>
                  <div className={styles.jFEbyV}>
                    <div className={styles['ant-row-flex'] + " ant-row-flex"} style={{marginLeft: '-8px', marginRight: '-8px'}}>
                      <div className="ant-col ant-col-16" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                        <div className={styles.cnfHfX}>
                          {
                            loading ? 
                            <>
                              <Spin/>
                              <p>Processing CSV</p>
                            </>:
                            <>
                              <input type="file" title="No file chosen" accept=".csv" onChange={handleCsvUpload}/>
                              <DropCSVFileIcon/>
                              <p>{productIDs2.length > 0? 'File is uploaded': 'Or select file from your computer'}</p>
                            </>
                          }
                        </div>
                      </div>
                      <div className="ant-col ant-col-8" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                        <div className={styles.ecpRYb}>
                          <p className={styles.bold}>CSV format</p>
                          <p>The file must be a CSV file with the following fields as column titles:</p>
                          <div className="text-list">
                            <p>BuyId (Required)</p>
                          </div>
                          {/* <a href="https://autods.s3-us-west-2.amazonaws.com/v2_bulk_upload_example.csv" target="_blank" className="link" rel="noopener noreferrer">Download Example File</a> */}
                        </div>
                      </div>
                    </div>
                    <div className='m-t-20'>
                      <CheckBox
                        check={uploadVariations2 == 1}
                        handleCheck={() => setUploadVariations2(uploadVariations2 == 1? 0: 1)}
                      />
                      Upload Variations
                    </div>
                  </div>
                  <div className={styles.JwezC} style={{marginTop: '30px'}}>
                    <button 
                      disabled={productIDs2.length == 0} 
                      type="button" 
                      className="ant-btn ant-btn-lg ant-btn-primary" 
                      onClick={() => handleImport(uploadVariations2, productIDs2, 0)}>
                      <span>Add As draft</span>
                    </button>
                    <button 
                      disabled={productIDs2.length == 0} 
                      type="button" 
                      className="ant-btn ant-btn-lg ant-btn-primary"
                      style={{marginLeft:10}}
                      onClick={() => handleImport(uploadVariations2, productIDs2, 1)}>
                      <span>Create and Publish</span>
                    </button>
                  </div>
                </>
              }
            </TabPanel>
          </div>
        </div>
      </div>
    </ParentModal>
  )
}
