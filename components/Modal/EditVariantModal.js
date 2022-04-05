import styles from './EditVariantModal.module.scss'
import React, { useState, useRef } from "react"
import ParentModal from './ParentModal'
import LargeButton from '@components/Button/LargeButton'
import AmazonIcon from '@assets/AmazonIcon'
import InputNumber from '@components/Input/InputNumber'
import Tab from '@components/Tab/Tab'
import TabPanel from '@components/Tab/TabPanel'
import Input from '@components/Input/Input'
import { connect } from 'react-redux'
import { setVariant } from "@redux/actions/main"
import { saveVariant } from "@redux/actions/product"
import { numberWithCommas } from 'util/function'

function EditVariantModal(props) {

  const {
    handleClose,
    saveVariant,
    setVariant
  } = props

  const {variant} = props.main
  const [tab, setTab] = useState(0)
  const refTab1 = useRef(null);
  const refTab2 = useRef(null);

  const handleSave = () => {
    saveVariant(variant)
    handleClose()
  }

  const handleChangeOption1 = (e) => {
    variant.option1_value = e.target.value
    setVariant(variant)
  }

  const handleChangeOption2 = (e) => {
    variant.option2_value = e.target.value
    setVariant(variant)    
  }

  const handleChangeQuantity = (e) => {
    variant.quantity = e.target.value
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeUpQuantity = () => {
    let value = parseInt(variant.quantity)
    value += 1
    variant.quantity = value
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeDownQuantity = () => {
    let value = parseInt(variant.quantity)

    if(value <= 0)
      return
      
    value -= 1
    variant.quantity = value
    setVariant(variant)
    calculate(variant)
  }
  
  const handleChangeMinOrder = (e) => {
    variant.minOrder = e.target.value
    setVariant(variant)
  }

  const handleChangeUpMinOrder = () => {
    let value = parseInt(variant.minOrder)
    value += 1
    variant.minOrder = value
    setVariant(variant)
  }

  const handleChangeDownMinOrder = () => {
    let value = parseInt(variant.minOrder)

    if(value <= 0)
      return
      
    value -= 1
    variant.minOrder = value
    setVariant(variant)
  }

  const handleChangeWeight = (e) => {
    variant.weight = e.target.value
    setVariant(variant)
  }

  const handleChangeHeight = (e) => {
    variant.height = e.target.value
    setVariant(variant)
  }

  const handleChangeUpHeight = () => {
    let value = parseFloat(variant.height)
    value += 0.01
    variant.height = value.toFixed(2)
    setVariant(variant)
  }

  const handleChangeDownHeight = () => {
    let value = parseFloat(variant.height)

    if(value <= 0)
      return
      
    value -= 0.01
    variant.height = value.toFixed(2)
    setVariant(variant)
  }

  const handleChangeWidth = (e) => {
    variant.width = e.target.value
    setVariant(variant)
  }

  const handleChangeUpWidth = () => {
    let value = parseFloat(variant.width)
    value += 0.01
    variant.width = value.toFixed(2)
    setVariant(variant)
  }

  const handleChangeDownWidth = () => {
    let value = parseFloat(variant.width)

    if(value <= 0)
      return
      
    value -= 0.01
    variant.width = value.toFixed(2)
    setVariant(variant)
  }

  const handleChangeLength = (e) => {
    variant.length = e.target.value
    setVariant(variant)
  }

  const handleChangeUpLength = () => {
    let value = parseFloat(variant.length)
    value += 0.01
    variant.length = value.toFixed(2)
    setVariant(variant)
  }

  const handleChangeDownLength = () => {
    let value = parseFloat(variant.length)

    if(value <= 0)
      return
      
    value -= 0.01
    variant.length = value.toFixed(2)
    setVariant(variant)
  }

  const handleChangeBuyID = (e) => {
    variant.sku = e.target.value
    setVariant(variant)
  }

  const handleChangeUPC = (e) => {
    variant.barcode = e.target.value
    setVariant(variant)
  }

  const handleChangeBuyBoxPrice = (e) => {
    variant.buyBoxPrice = e.target.value
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeUpBuyBoxPrice = () => {
    let value = parseFloat(variant.buyBoxPrice)
    value += 0.01
    variant.buyBoxPrice = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeDownBuyBoxPrice = () => {
    let value = parseFloat(variant.buyBoxPrice)
    value -= 0.01
    variant.buyBoxPrice = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeFee = (e) => {
    variant.fee = e.target.value
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeUpFee = () => {
    let value = parseFloat(variant.fee)
    value += 0.01
    variant.fee = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeDownFee = () => {
    let value = parseFloat(variant.fee)

    if(value <= 0)
      return

    value -= 0.01
    variant.fee = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeProfit = (e) => {
    variant.profit = Number(e.target.value)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeUpProfit = () => {
    let value = parseFloat(variant.profit)
    value += 0.01
    variant.profit = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeDownProfit = () => {
    let value = parseFloat(variant.profit)
    value -= 0.01
    variant.profit = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeProfitAmount = (e) => {
    variant.profitAmount = Number(e.target.value)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeUpProfitAmount = () => {
    let value = parseFloat(variant.profitAmount)
    value += 1
    variant.profitAmount = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }

  const handleChangeDownProfitAmount = () => {
    let value = parseFloat(variant.profitAmount)
    value -= 1
    variant.profitAmount = value.toFixed(2)
    setVariant(variant)
    calculate(variant)
  }
  
  const handleChangePrice = (e) => {
    variant.price = Number(e.target.value)
    setVariant(variant)
    calculateProfit(variant)
  }

  const handleChangeUpPrice = () => {
    let value = parseFloat(variant.price)
    value += 1
    variant.price = value.toFixed(2)
    setVariant(variant)
    calculateProfit(variant)
  }

  const handleChangeDownPrice = () => {
    let value = parseFloat(variant.price)
    value -= 1
    variant.price = value.toFixed(2)
    setVariant(variant)
    calculateProfit(variant)
  }
  
  function calculate(variant) {
    let buyBoxPrice = variant.buyBoxPrice
    let fee = variant.fee
    let profit = variant.profit
    let profitAmount = variant.profitAmount
    let totalProfit = profitAmount + buyBoxPrice * profit / 100
    let price = buyBoxPrice + buyBoxPrice * fee / 100 + totalProfit

    variant.totalProfit = totalProfit.toFixed(2)
    variant.price = price.toFixed(2)
    variant.profit = profit.toFixed(2)
    setVariant(variant)
  }


  let tabX = 0
  let tabWidth = 0

  if(tab == 0) {
    tabX = 0
    tabWidth = refTab1.current? refTab1.current.offsetWidth: 84
  } else {
    tabX = refTab1.current.offsetWidth
    tabWidth = refTab2.current.offsetWidth
  }

  return (
    <ParentModal 
      handleClose={handleClose}     
    >
      <div className={styles.jAYqUM}>
        <div className="ant-tabs ant-tabs-top ant-tabs-line">
          <div role="tablist" className="ant-tabs-bar ant-tabs-top-bar" tabIndex="0" style={{display: 'none'}}>
            <div className="ant-tabs-nav-container">
              <div className="ant-tabs-nav-wrap">
                <div className="ant-tabs-nav-scroll">
                  <div className="ant-tabs-nav ant-tabs-nav-animated">
                    <div>
                      <div role="tab" aria-disabled="false" aria-selected="true" className="ant-tabs-tab-active ant-tabs-tab">settings</div>
                      <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">images</div>
                      <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">editImage</div>
                    </div>
                    <div className="ant-tabs-ink-bar ant-tabs-ink-bar-animated" style={{display: 'block', transform: 'translate3d(0px, 0px, 0px)', width: 0}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>          
          <div className="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content" style={{marginLeft: 0}}>
            <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
              <h2>Edit Variant</h2>
              <div className={styles['product-preview']}>
                <div className={styles.image}>
                  <img src={process.env.IMAGE_PATH + variant.image} alt="product-image" style={{transform: 'rotate(0deg) scaleX(1) scaleY(1)'}}/>
                </div>
                <div className={styles.description}>
                  <p className="ellipsis">{variant.title}</p>
                  {/* <div style={{whiteSpace: 'nowrap'}} className={styles.small}>
                    <i style={{color:'#f1bb00'}} className={variant.rating > 0 && variant.rating < 0.5?"fa fa-star-half-o":"fa fa-star"}></i>
                    <i style={{color:'#f1bb00'}} className={variant.rating > 1 && variant.rating < 1.5?"fa fa-star-half-o":"fa fa-star"}></i>
                    <i style={{color:'#f1bb00'}} className={variant.rating > 2 && variant.rating < 2.5?"fa fa-star-half-o":"fa fa-star"}></i>
                    <i style={{color:'#f1bb00'}} className={variant.rating > 3 && variant.rating < 3.5?"fa fa-star-half-o":"fa fa-star"}></i>
                    <i style={{color:'#f1bb00'}} className={variant.rating > 4 && variant.rating < 4.5?"fa fa-star-half-o":"fa fa-star"}></i> 
                    {numberWithCommas(variant.reviewCount)} Reviews
                  </div> */}
                  <div className={styles.info}>
                    {
                      variant.option1_name.length > 0 && 
                      <span>{variant.option1_name + ': ' + variant.option1_value}</span>
                    }
                    {
                      variant.option2_name && 
                      <span>{variant.option2_name + ': ' + variant.option2_value}</span>
                    }                    
                    <span>Buy ID: {variant.sku}</span>
                    <span><AmazonIcon/>US</span>
                  </div>
                </div>
                <div className={styles['total-profit']}>
                  <p>Deal Profit</p>
                  <span>${numberWithCommas(variant.totalProfit)}</span>
                </div>
              </div>
              <div className="ant-tabs ant-tabs-top ant-tabs-line">
                <div role="tablist" className="ant-tabs-bar ant-tabs-top-bar" tabIndex="0">
                  <div className="ant-tabs-nav-container">
                    <div className="ant-tabs-nav-wrap">
                      <div className="ant-tabs-nav-scroll">
                        <div className="ant-tabs-nav ant-tabs-nav-animated">
                          <div>
                            <Tab
                              refTab={refTab1}
                              title={'Pricing'}
                              tab={0}
                              currentTab={tab}
                              onClick={() => setTab(0)}
                            />
                            <Tab
                              refTab={refTab2}
                              title={'General'}
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
                      <div className={styles.ePbKfX + ' modal-form'}>
                        <div className={styles['form-wrapper']}>
                          <div className={styles['input-wrapper']}>
                            <label>
                              Amazon Buy Box $
                              <InputNumber                                
                                value={variant.buyBoxPrice}
                                handleUp={handleChangeUpBuyBoxPrice}
                                handleDown={handleChangeDownBuyBoxPrice}
                                handleChange={handleChangeBuyBoxPrice}
                              />
                            </label>
                          </div>
                          <div className={styles['input-wrapper']}>
                            <label>
                              Profit %
                              <InputNumber
                                value={variant.profit}
                                handleUp={handleChangeUpProfit}
                                handleDown={handleChangeDownProfit}
                                handleChange={handleChangeProfit}
                              />
                            </label>
                          </div>
                          <div className={styles['input-wrapper']}>
                            <label>
                              Profit $
                              <InputNumber
                                value={variant.profitAmount}
                                handleUp={handleChangeUpProfitAmount}
                                handleDown={handleChangeDownProfitAmount}
                                handleChange={handleChangeProfitAmount}
                              />
                            </label>
                          </div>
                          <div className={styles['input-wrapper']}>
                            <label>Fees %
                            <InputNumber
                              value={variant.fee}
                              handleUp={handleChangeUpFee}
                              handleDown={handleChangeDownFee}
                              handleChange={handleChangeFee}
                            />
                          </label>
                          </div>
                        </div>   
                        <div className={styles['form-wrapper']}>
                          <div className={styles['input-wrapper']}>
                            <label>
                              Sell Price
                              <InputNumber
                                value={variant.price}
                                handleUp={handleChangeUpPrice}
                                handleDown={handleChangeDownPrice}
                                handleChange={handleChangePrice}
                              />
                            </label>
                          </div>
                        </div>                 
                        {/* <div className="modal-form mb-10">
                          <div className="ant-row" style={{marginLeft: -12, marginRight: -12}}>
                            <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                              <CheckBox
                                className={'mb-15'}
                                title={'Include Shipping Price'}
                              />
                            </div>
                          </div>
                          <div className={"ant-row " + styles['round-cents']}>
                            <div className="ant-col ant-col-5">
                              <CheckBox
                                className={'mb-15'}
                                title={'Round cents to:'}
                              />
                            </div>
                            <div className="ant-col ant-col-3">
                              <InputNumber
                                min={0}
                                max={99}
                                step={1}                              
                              />
                            </div>
                          </div>
                          <div className="ant-row" style={{marginLeft:-12, marginRight:-12}}>
                            <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                              <CheckBox
                                className={'mb-15'}
                                title={'Allow Marketplace Sellers'}
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>                  
                    }
                  </TabPanel>
                  <TabPanel 
                    currentTab={tab} 
                    tab={1}
                  >
                    {
                      tab == 1 &&
                      <div className="modal-form">
                        <div className="ant-row" style={{marginLeft:-12, marginRight:-12}}>
                          {
                            variant.option1_name.length > 0 && 
                            <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                              <label>
                                {variant.option1_name}
                                <Input
                                  placeholder="Enter Color"
                                  value={variant.option1_value}
                                  onChange={handleChangeOption1}
                                />
                              </label>
                            </div>
                          }
                          {
                            variant.option2_name.length > 0 && 
                            <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                              <label>
                                {variant.option2_name}
                                <Input
                                  placeholder="Enter Color"
                                  value={variant.option2_value}
                                  onChange={handleChangeOption2}
                                />
                              </label>
                            </div>
                          }                          
                          <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              Total Available Qty
                              <InputNumber
                                placeholder="Enter Default Qty"
                                value={variant.quantity}
                                handleUp={handleChangeUpQuantity}
                                handleDown={handleChangeDownQuantity}
                                handleChange={handleChangeQuantity}
                              />
                            </label>
                          </div>
                          <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              Minimum Order
                              <InputNumber
                                placeholder="Enter Minimum Order"
                                value={variant.minOrder}
                                handleUp={handleChangeUpMinOrder}
                                handleDown={handleChangeDownMinOrder}
                                handleChange={handleChangeMinOrder}
                              />
                            </label>
                          </div>
                          <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              Special Weight
                              <span className="ant-input-group-wrapper ant-input-group-wrapper-lg">
                                <span className="ant-input-wrapper ant-input-group">
                                  <Input
                                    placeholder="Enter Weight"
                                    value={variant.weight}
                                    onChange={handleChangeWeight}
                                  />
                                  <span className="ant-input-group-addon">
                                    <div className="ant-select ant-select-enabled" style={{width: 80}}>
                                      <div className="ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="5334d84f-8451-497b-aab6-44bfa66fd70d" aria-expanded="false" tabIndex="0">
                                        <div className="ant-select-selection__rendered">
                                          <div className="ant-select-selection-selected-value" title="lb" style={{display: 'block', opacity: 1}}>lb</div>
                                        </div>
                                        <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
                                          <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                            </svg>
                                          </i>
                                        </span>
                                      </div>
                                    </div>
                                  </span>
                                </span>
                              </span>
                            </label>
                          </div>
                          <div className="ant-col ant-col-12 flex" style={{paddingLeft: 12, paddingRight: 12}}>
                          <label className={styles.aihPd}>
                            Height
                            <InputNumber
                              placeholder="Height"
                              value={variant.height}
                              handleUp={handleChangeUpHeight}
                              handleDown={handleChangeDownHeight}
                              handleChange={handleChangeHeight}
                            />
                          </label>
                          <label className={styles.aihPd}>
                            Width
                            <InputNumber
                              placeholder="Width"
                              value={variant.width}
                              handleUp={handleChangeUpWidth}
                              handleDown={handleChangeDownWidth}
                              onChange={handleChangeWidth}
                            />                          
                          </label>
                          <label className={styles.aihPd}>
                            Length
                            <InputNumber
                              placeholder="Length"
                              value={variant.length}
                              handleUp={handleChangeUpLength}
                              handleDown={handleChangeDownLength}
                              onChange={handleChangeLength}
                            />                          
                          </label>
                          </div>
                        </div>
                        <div className="ant-row" style={{marginLeft:-12, marginRight:-12}}>
                          <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              Buy ID
                              <Input
                                placeholder="Enter Buy ID"
                                value={variant.sku}
                                onChange={handleChangeBuyID}
                              />
                            </label>
                          </div>
                          {/* <div className="ant-col ant-col-6" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              Supplier
                              <Select
                                value={'amazon'}
                              />
                            </label>
                          </div>
                          <div className="ant-col ant-col-6" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              Region
                              <Select
                                value={'United States'}
                              />
                            </label>
                          </div> */}
                          <div className="ant-col ant-col-12" style={{paddingLeft: 12, paddingRight: 12}}>
                            <label>
                              UPC
                              <Input
                                placeholder="Enter UPC"
                                value={variant.barcode}
                                onChange={handleChangeUPC}
                              />
                            </label>
                          </div>
                        </div>
                      </div>     
                    }
                  </TabPanel>
                </div>              
              </div>
              <footer>
                <LargeButton
                  title={'Save'}
                  onClick={handleSave}
                />
              </footer>            
            </div>
          </div>        
        </div>
      </div>      
    </ParentModal>    
  )
}

const mapStateToProps = state => ({
  main: state.main
})

const mapDispatchToProps = {
  saveVariant,
  setVariant
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVariantModal)