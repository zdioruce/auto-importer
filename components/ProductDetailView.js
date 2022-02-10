import styles from './ProductDetailView.module.scss'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VariantTableRow from '@components/VariantTableRow'
import ProductImage from '@components/ProductImage'
import ProductDetailTab from '@components/ProductDetailTab'
import React, { useEffect, useState } from "react"

export default function ProductDetailView({data, expand}) {

  const [tab, setTab] = useState(0)
  const [variants, setVariants] = useState([])

  async function fetchData() {
    await fetch('/api/product/variants', {
      method: 'POST',
      body: JSON.stringify({id: data.id})
    })
    .then(response => response.json())
    .then(data => {
      setVariants(data.result)
    })   
    .catch((error) => {
    });
  }
  
  function handleTab(tab){
    setTab(tab)

    if(tab == 2) {
      fetchData()
    }
  }

  return (
    <div className={expand? styles.dIqhFR: styles.hAAzhb}>
      <div className={styles.cHPnsn}>        
      </div>
      <div className='ant-tabs ant-tabs-top ant-tabs-line ant-tabs-no-animation'>
        <div role="tablist" className="ant-tabs-bar ant-tabs-top-bar" tabIndex="0">
          <div className="ant-tabs-nav-container">
            <span unselectable="unselectable" className="ant-tabs-tab-prev ant-tabs-tab-btn-disabled">
              <span className="ant-tabs-tab-prev-icon">
                <i aria-label="icon: left" className="anticon anticon-left ant-tabs-tab-prev-icon-target">
                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                  </svg>
                </i>
              </span>
            </span>
            <span unselectable="unselectable" className="ant-tabs-tab-next ant-tabs-tab-btn-disabled">
              <span className="ant-tabs-tab-next-icon">
                <i aria-label="icon: right" className="anticon anticon-right ant-tabs-tab-next-icon-target">
                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                  </svg>
                </i>
              </span>
            </span>
            <div className="ant-tabs-nav-wrap">
              <div className="ant-tabs-nav-scroll">
                  <div className="ant-tabs-nav ant-tabs-nav-animated">
                    <div>
                      <div role="tab" aria-disabled="false" aria-selected={tab == 0} className={tab == 0? 'ant-tabs-tab-active ant-tabs-tab': 'ant-tabs-tab'} style={{marginRight: '0px'}} onClick={() => handleTab(0)}>
                        <span className="">Product</span>
                      </div>
                      <div role="tab" aria-disabled="false" aria-selected={tab == 1} className={tab == 1? 'ant-tabs-tab-active ant-tabs-tab': 'ant-tabs-tab'} style={{marginRight: '0px'}} onClick={() => handleTab(1)}>
                        <span className="">Description</span>
                      </div>
                      <div role="tab" aria-disabled="false" aria-selected={tab == 2} className={tab == 2? 'ant-tabs-tab-active ant-tabs-tab': 'ant-tabs-tab'} style={{marginRight: '0px'}} onClick={() => handleTab(2)}>
                        <span className="">{variants.length == 0? 'Variants': 'Variants(' + variants.length + ')'}</span>
                      </div>
                      <div role="tab" aria-disabled="false" aria-selected={tab == 3} className={tab == 3? 'ant-tabs-tab-active ant-tabs-tab': 'ant-tabs-tab'} style={{marginRight: '0px'}} onClick={() => handleTab(3)}>
                        <span className="">Images</span>
                      </div>
                      <div role="tab" aria-disabled="false" aria-selected={tab == 4} className={tab == 4? 'ant-tabs-tab-active ant-tabs-tab': 'ant-tabs-tab'} style={{marginRight: '0px'}} onClick={() => handleTab(4)}>
                        <span className="">Item Specifications</span>
                      </div>
                    </div>
                    <div className="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated" style={{display: 'block', transform: 'translate3d(0px, 0px, 0px)', width: '90px'}}>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ant-tabs-content ant-tabs-content-no-animated ant-tabs-top-content">
          <div role="tabpanel" aria-hidden="false" className={tab == 0 ? 'ant-tabs-tabpane ant-tabs-tabpane-active': 'ant-tabs-tabpane ant-tabs-tabpane-inactive'}>
            <ProductDetailTab
              data={data}
            />
          </div>
          <div role="tabpanel" aria-hidden="true" className={tab == 1 ? 'ant-tabs-tabpane ant-tabs-tabpane-active': 'ant-tabs-tabpane ant-tabs-tabpane-inactive'}>
            <div className={styles.kJFhJx}>                
              <div className={styles.jqZpcr}>
                <div height="312px" className={styles.QBEDW}>
                  <div style={{visibility: 'hidden', display: 'none'}}></div>
                  {/* <CKEditor
                    editor={ ClassicEditor }
                    data={data.description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" aria-hidden="true" className={tab == 2 ? 'ant-tabs-tabpane ant-tabs-tabpane-active': 'ant-tabs-tabpane ant-tabs-tabpane-inactive'}>
            <div className={styles.gYyuar}>
              <div className={styles.gJGdtq + ' flex ai-c jc-sb'}>
                <div className="flex ai-c">
                  <label className={styles['ant-checkbox-wrapper'] + " ant-checkbox-wrapper"}>
                    <span className="ant-checkbox">
                      <input type="checkbox" className="ant-checkbox-input" value=""/>
                      <span className="ant-checkbox-inner"></span>
                    </span>
                  </label>
                  0&nbsp; Variant Selected
                </div>
                {/* <div>
                  <button type="button" className="ant-btn ant-btn-link">
                    <span>Edit Variations Options</span>
                  </button>
                </div> */}
              </div>
              <div className={styles.dLmOkh}>
                {
                  variants.map((element, index) => (
                    <VariantTableRow
                      key={index}
                      data={element}
                    />
                  ))
                }                  
              </div>
            </div>              
          </div>
          <div role="tabpanel" aria-hidden="true" className={tab == 3 ? 'ant-tabs-tabpane ant-tabs-tabpane-active': 'ant-tabs-tabpane ant-tabs-tabpane-inactive'}>
            <div className={styles.gxiHCB}>
              <div className={styles.egDxQG}>
                <div>
                  <label className="ant-checkbox-wrapper">
                    <span className="ant-checkbox">
                      <input type="checkbox" className="ant-checkbox-input" value=""/>
                      <span className="ant-checkbox-inner"></span>
                    </span>
                  </label>
                  <span>0 Image Selected:</span>
                </div>
              </div>
              <div className={styles.iYUFFy}>
                {
                  data.images.split(',').map((element, index) => (
                    <ProductImage
                      key={index}
                      index={index}
                      image={element}
                    />
                  ))
                }
                <div className={styles.bWUink}>
                  <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path className="plus-icon" d="M12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z" fill="#090E35"></path>
                    </svg>
                    <p>Add Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" aria-hidden="true" className={tab == 4 ? 'ant-tabs-tabpane ant-tabs-tabpane-active': 'ant-tabs-tabpane ant-tabs-tabpane-inactive'}></div>
        </div>
      </div>
    </div>  
  )
}
