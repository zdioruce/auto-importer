import styles from './ProductDetailView.module.scss'
import TabPanel from '@components/Tab/TabPanel'
import Tab from '@components/Tab/Tab'
import ProductDetailTab from '@components/Tab/ProductDetailTab'
import ProductVariantsTab from '@components/Tab/ProductVariantsTab'
import ProductImagesTab from '@components/Tab/ProductImagesTab'
import React, { useState, useRef } from "react"
import ProductDescriptionTab from './Tab/ProductDescriptionTab'

export default function ProductDetailView(props) {

  const {data, expand, fullpage} = props
  const [tab, setTab] = useState(0)
  const refTab1 = useRef(null);
  const refTab2 = useRef(null);
  const refTab3 = useRef(null);
  const refTab4 = useRef(null);

  let tabX = 0
  let tabWidth = 0

  if(tab == 0) {
    tabX = 0
    tabWidth = refTab1.current? refTab1.current.offsetWidth: 90
  } else if(tab == 1){
    tabX = refTab1.current.offsetWidth
    tabWidth = refTab2.current.offsetWidth
  } else if(tab == 2){
    tabX = refTab2.current.offsetWidth + refTab1.current.offsetWidth
    tabWidth = refTab3.current.offsetWidth
  } else if(tab == 3){
    tabX = refTab1.current.offsetWidth + refTab2.current.offsetWidth + refTab3.current.offsetWidth
    tabWidth = refTab4.current.offsetWidth
  } 

  return (
    <div className={expand? (fullpage? styles.iLolDK: styles.dIqhFR): styles.hAAzhb}>
      <div className={styles.cHPnsn}>        
      </div>
      <div className={`ant-tabs ant-tabs-top ant-tabs-line ant-tabs-no-animation`}>
        <div role="tablist" className="ant-tabs-bar ant-tabs-top-bar" tabIndex="0">
          <div className="ant-tabs-nav-container">
            <div className="ant-tabs-nav-wrap">
              <div className="ant-tabs-nav-scroll">
                <div className="ant-tabs-nav ant-tabs-nav-animated">
                  <div>                      
                    <Tab
                      refTab={refTab1}
                      title={'Product'}
                      tab={0}
                      currentTab={tab}
                      onClick={() => setTab(0)}
                    />
                    <Tab
                      refTab={refTab2}
                      title={'Description'}
                      tab={1}
                      currentTab={tab}
                      onClick={() => setTab(1)}
                    />
                    <Tab
                      refTab={refTab3}
                      title={data.variants.length == 0? 'Variants': `Variants (${data.variants.length})`}
                      tab={2}
                      currentTab={tab}
                      onClick={() => setTab(2)}
                    />
                    <Tab
                      refTab={refTab4}
                      title={'Images'}
                      tab={3}
                      currentTab={tab}
                      onClick={() => setTab(3)}
                    />                      
                  </div>
                  <div className="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated" style={{display: 'block', transform: 'translate3d(' + tabX + 'px, 0px, 0px)', width: tabWidth}}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ant-tabs-content ant-tabs-content-no-animated ant-tabs-top-content">
          <TabPanel 
            currentTab={tab} 
            tab={0}>
            {
              tab == 0 &&
              <ProductDetailTab
                fullpage={fullpage}
                data={data}
              />
            }
          </TabPanel>
          <TabPanel 
            currentTab={tab} 
            tab={1}>
            {
              tab == 1 &&
              <ProductDescriptionTab
                description={data.description}
              />
            }
          </TabPanel>
          <TabPanel            
            currentTab={tab} 
            tab={2}>
            {
              tab == 2 &&
              <ProductVariantsTab
                fullpage={fullpage}
                variants={data.variants}
              />              
            }
          </TabPanel>
          <TabPanel
            currentTab={tab} 
            tab={3}>
            {
              tab == 3 &&
              <ProductImagesTab
                fullpage={fullpage}
                images={data.images.split(',')}
              />
            }
          </TabPanel>
        </div>
      </div>
    </div>  
  )
}
