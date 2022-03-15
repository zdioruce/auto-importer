import styles from './HistoryItemsModal.module.scss'
import { connect } from 'react-redux'
import ParentModal from './ParentModal'
import HistoryItemTableRow from '@components/Row/HistoryItemTableRow'
import ProgressIcon from '@assets/ProgressIcon'
import CompleteIcon from '@assets/CompleteIcon'
import FailIcon from '@assets/FailIcon'
import Spin from '@components/Spin'
import Tab from '@components/Tab/Tab'
import TabPanel from '@components/Tab/TabPanel'
import LinkButton from '@components/Button/LinkButton'
import { useState, useRef } from 'react'
function HistoryItemsModal(props) {

  const { handleClose } = props
  const { loading, error, items, detail } = props.history
  const [tab, setTab] = useState(0)
  const refTab1 = useRef(null);
  const refTab2 = useRef(null);
  const refTab3 = useRef(null);

  let content = null
  let detailId = null
  let action = null
  let statusIcon = null
  let statusText = null
  let title = null

  if (error) {
    content = <div>Failed to load</div>
  }

  if (loading) {
    detailId = ''
    action = ''
    content = <div className={styles['spin-wrapper']}>
                <Spin/>
              </div>   
  } else {
    detailId = detail.id
    
    if(detail.action == 0) {
      title = 'Create Drafts'
      action = 'Create draft'
    }      
    else if(detail.action == 1) {
      title = 'Import Products'
      action = 'Import to Store from Drafts'
    }      
    else if(detail.action == 2) {
      title = 'Bulk Delete'
      action = 'Delete from Auto Importer and Selling Platform'
    }
    else {
      title = 'Bulk Delete'
      action = 'Delete from Auto Importer'
    }      

    if(detail.status == 0) {
      statusIcon = <ProgressIcon/>
      statusText= detail.complete + '/' + detail.total + ' In Progress'
    }
    else if(detail.status == 1) {
      statusIcon = <CompleteIcon/>
      statusText= detail.complete + '/' + detail.total + ' Done'
    }
    else {
      statusIcon = <FailIcon/>
      statusText= detail.complete + '/' + detail.total + ' Done'
    }

    content = 
    <div className={styles.dibOVc}>
      {
        items && items.map((element, index) => (
          <HistoryItemTableRow
            key={index}
            data={element}
          />
        ))
      }
    </div>
  }

  let tabX = 0
  let tabWidth = 0

  if(tab == 0) {
    tabX = 0
    tabWidth = refTab1.current? refTab1.current.offsetWidth: 117
  } else if(tab == 1){
    tabX = refTab1.current.offsetWidth
    tabWidth = refTab2.current.offsetWidth
  } else {
    tabX = refTab1.current.offsetWidth + refTab2.current.offsetWidth
    tabWidth = refTab3.current.offsetWidth
  }

  return (
    <ParentModal
      handleClose={handleClose}
    >
      <div className={styles.bDKnMC}>
        <button type="button" className="ant-btn ant-btn-link">
          <span>&lt; Back</span>
        </button>
        <div className={styles.cutvFw}>
          <h2>{title} #{detailId}</h2>
          <div>
            {statusIcon}
            {statusText}
          </div>
          <div>                      
          </div>
        </div>
        <p>Actions: {action}</p>
        <div className="ant-tabs ant-tabs-top ant-tabs-line ant-tabs-no-animation">
          <div role="tablist" className="ant-tabs-bar ant-tabs-top-bar" tabIndex="0">
            <div className="ant-tabs-nav-container">                        
              <div className="ant-tabs-nav-wrap">
                <div className="ant-tabs-nav-scroll">
                  <div className="ant-tabs-nav ant-tabs-nav-animated">
                    <div>
                      <Tab
                        refTab={refTab1}
                        title={`All Products (${items.length})`}
                        tab={0}
                        currentTab={tab}
                        onClick={() => setTab(0)}
                      />
                      <Tab
                        refTab={refTab2}
                        title={`Failed (0)`}
                        tab={1}
                        currentTab={tab}
                        onClick={() => setTab(1)}
                      />
                      <Tab
                        refTab={refTab3}
                        title={`Successful (0)`}
                        tab={2}
                        currentTab={tab}
                        onClick={() => setTab(2)}
                      />
                    </div>
                    <div className="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated" style={{display: 'block', transform: 'translate3d(' + tabX + 'px, 0px, 0px)', width: tabWidth}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['ant-tabs-content'] + " ant-tabs-content ant-tabs-content-no-animated ant-tabs-top-content"}>
            <TabPanel 
              currentTab={tab} 
              tab={0}
            >
              {
                tab == 0 &&
                <>
                  <div className="ant-row fz-13" style={{marginLeft: '-8px', marginRight: '-8px'}}>
                    <div className="ant-col ant-col-5" style={{paddingLeft: 8, paddingRight: 8}}>
                      <span>Product</span>
                    </div>
                    <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight: 8}}>Created</div>
                    <div className="ant-col ant-col-4" style={{paddingLeft: 8, paddingRight: 8}}>Source Item ID</div>
                    <div className="ant-col ant-col-4" style={{paddingLeft: 8, paddingRight: 8}}>Sell Item ID</div>
                    <div className="ant-col ant-col-5" style={{paddingLeft: 8, paddingRight: 8}}>Status</div>
                  </div>
                  {content}
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
                  <div className="ant-row fz-13" style={{marginLeft: '-8px', marginRight: '-8px'}}>
                    <div className="ant-col ant-col-5" style={{paddingLeft: 8, paddingRight: 8}}>
                      <span>Product</span>
                    </div>
                    <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight: 8}}>Created</div>
                    <div className="ant-col ant-col-4" style={{paddingLeft: 8, paddingRight: 8}}>Source Item ID</div>
                    <div className="ant-col ant-col-4" style={{paddingLeft: 8, paddingRight: 8}}>Sell Item ID</div>
                    <div className="ant-col ant-col-5" style={{paddingLeft: 8, paddingRight: 8}}>Status</div>
                  </div>
                  {content}
                </>
              }
            </TabPanel>
            <TabPanel 
              currentTab={tab} 
              tab={2}
            >
              {
                tab == 2 &&
                <>
                  <div className="ant-row fz-13" style={{marginLeft: '-8px', marginRight: '-8px'}}>
                    <div className="ant-col ant-col-5" style={{paddingLeft: 8, paddingRight: 8}}>
                      <span>Product</span>
                    </div>
                    <div className="ant-col ant-col-3" style={{paddingLeft: 8, paddingRight: 8}}>Created</div>
                    <div className="ant-col ant-col-4" style={{paddingLeft: 8, paddingRight: 8}}>Source Item ID</div>
                    <div className="ant-col ant-col-4" style={{paddingLeft: 8, paddingRight: 8}}>Sell Item ID</div>
                    <div className="ant-col ant-col-5" style={{paddingLeft: 8, paddingRight: 8}}>Status</div>
                  </div>
                  {content}
                </>
              }
            </TabPanel>            
          </div>
        </div>
      </div>
    </ParentModal>   
  )
}


const mapStateToProps = state => ({
  history: state.history
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItemsModal)
