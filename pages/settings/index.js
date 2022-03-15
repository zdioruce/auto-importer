import styles from './styles.module.scss'
import React, { useRef, useEffect } from "react"
import { connect } from 'react-redux'
import CheckBox from '@components/Input/CheckBox'
import LargeButton from '@components/Button/LargeButton'
import Spin from '@components/Spin'
import InputNumber from '@components/Input/InputNumber'
import { addNotification, getSetting, setSetting, updateSetting } from "@redux/actions/main"
import BraceSVG from '@assets/BraceSVG'

function Settings(props) {

  const { addNotification, getSetting, setSetting, updateSetting } = props
  const { error, loading, setting } = props.main
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  useEffect(() => {
    getSetting()
  }, [getSetting])

  const handleClickSave = () => {
    setSetting(setting)
    addNotification({
      id: notifications.length,
      message: 'Settings have been saved'
    })
  }

  const handleChangeFee = (e) => {
    setting.fee = Number(e.target.value)
    updateSetting(setting)
  }

  const handleChangeUpFee = () => {
    let value = parseFloat(setting.fee)
    value += 1
    setting.fee = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeDownFee = () => {
    let value = parseFloat(setting.fee)

    if(value <= 0)
      return

    value -= 1
    setting.fee = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeProfit = (e) => {
    setting.profit = parseFloat(e.target.value)
    updateSetting(setting)
  }

  const handleChangeUpProfit = () => {
    let value = parseFloat(setting.profit)
    value += 1
    setting.profit = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeDownProfit = () => {
    let value = parseFloat(setting.profit)
    value -= 1
    setting.profit = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeProfitAmount = (e) => {
    setting.profitAmount = parseFloat(e.target.value)
    updateSetting(setting)
  }

  const handleChangeUpProfitAmount = () => {
    let value = parseFloat(setting.profitAmount)
    value += 1
    setting.profitAmount = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeDownProfitAmount = () => {
    let value = parseFloat(setting.profitAmount)
    value -= 1
    setting.profitAmount = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeMinProfitAmount = (e) => {
    setting.minProfitAmount = parseFloat(e.target.value)
    updateSetting(setting)
  }

  const handleChangeUpMinProfitAmount = () => {
    let value = parseFloat(setting.minProfitAmount)
    value += 0.01
    setting.minProfitAmount = value.toFixed(2)
    updateSetting(setting)
  }

  const handleChangeDownMinProfitAmount = () => {
    let value = parseFloat(setting.minProfitAmount)
    value -= 0.01
    setting.minProfitAmount = value.toFixed(2)
    updateSetting(setting)
  }

  let content = null
  
  if (error) {
    content = <div>failed to load</div>
  }

  if (loading || !setting) {
    content = <div className={styles['spin-wrapper']}>
                <Spin/>
              </div>
  } else {

    let buyBoxPrice = 100
    let price = buyBoxPrice + parseFloat(setting.profit) + parseFloat(setting.profitAmount)
    let fee = price * parseFloat(setting.fee) / 100
    let total = price + fee

    if(ref2.current) {
      ref2.current.style.width = buyBoxPrice * 100 / price + '%';
    }

    if(ref3.current) {
      ref3.current.style.width = setting.profit * 100 / price + '%'
    }

    if(ref4.current) {
      ref4.current.style.width = setting.profitAmount * 100 / price + '%'
    }

    content = <div className={styles.zrVas}>
                <div className={styles.fgBQOc}>
                  <h6>Profits settings</h6>
                  <div className={styles.gxAOOz + ' flex ai-c m-b-20'}>
                    <div className="flex">
                      <div ref={ref2} className={styles.cost}>
                        <p>Product cost</p>
                        <span>e.g: $100.00</span>
                      </div>
                      <div ref={ref3} className={styles.profit}>
                        <p>Profits</p>
                        <span>{setting.profit}%</span>
                      </div>
                      <div ref={ref4} className={styles['add-profit']}>
                        <span>${setting.profitAmount}</span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className={styles.braces}>
                        <BraceSVG/>
                      </div>
                      <div className={"ellipsis flex column " + styles['with-plus']}>
                        <p className="mb-0">{setting.fee}% Fees</p>
                        <span>${fee.toFixed(2)}</span>
                      </div>
                      <div className={"ellipsis flex column " + styles['with-equal']}>
                        <p className="mb-0">Total Price</p>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>                  
                </div>
                <div className="ant-row-flex ant-row-flex-middle modal-form" style={{marginLeft: -8, marginRight: -8}}>
                  <div className="ant-col ant-col-xl-8 ant-col-xxl-5" style={{paddingLeft: 8, paddingRight: 8}}>
                    <label>
                      Fees %
                      <InputNumber
                        value={setting.fee}
                        handleUp={handleChangeUpFee}
                        handleDown={handleChangeDownFee}
                        handleChange={handleChangeFee}
                      />
                    </label>
                  </div>
                  <div className="ant-col ant-col-xl-8 ant-col-xxl-5" style={{paddingLeft: 8, paddingRight: 8}}>
                    <label>
                      Additional Profit in %
                      <InputNumber
                        value={setting.profit}
                        handleUp={handleChangeUpProfit}
                        handleDown={handleChangeDownProfit}
                        handleChange={handleChangeProfit}
                      />
                    </label>
                  </div>
                  <div className="ant-col ant-col-xl-8 ant-col-xxl-5" style={{paddingLeft: 8, paddingRight: 8}}>
                    <label>
                      Additional Profit in $
                      <InputNumber
                        value={setting.profitAmount}
                        handleUp={handleChangeUpProfitAmount}
                        handleDown={handleChangeDownProfitAmount}
                        handleChange={handleChangeProfitAmount}
                      />
                    </label>
                  </div>
                </div>
                <div className="ant-row-flex ant-row-flex-middle modal-form" style={{marginLeft: -8, marginRight: -8}}>
                  <div className="ant-col ant-col-xl-8 ant-col-xxl-5" style={{paddingLeft: 8, paddingRight: 8}}>
                    <label>
                      Minimum profit per product
                      <InputNumber
                        value={setting.minProfitAmount}
                        handleUp={handleChangeUpMinProfitAmount}
                        handleDown={handleChangeDownMinProfitAmount}
                        handleChange={handleChangeMinProfitAmount}
                      />
                    </label>
                  </div>                    
                </div>
                <div className="ant-col ant-col-24" style={{padding:4}}>
                  <div className='flex ai-c'>
                    <CheckBox
                      check={setting.upload_first_image_only}
                      handleCheck={() => {
                        setting.upload_first_image_only = !setting.upload_first_image_only
                        updateSetting(setting)
                      }}
                      style={{marginRight:0}}
                    />
                    Upload First Image Only
                  </div>
                </div>
                <LargeButton
                  title={'Save'}
                  onClick={handleClickSave}
                />
              </div> 
  }

  return (
    <>
      {content}
    </>    
  )
}


const mapStateToProps = state => ({
  main: state.main
})

const mapDispatchToProps = {
  addNotification, getSetting, setSetting, updateSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)