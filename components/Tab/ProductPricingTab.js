import styles from './ProductPricingTab.module.scss'
import React from "react"
import InputNumber from '@components/Input/InputNumber'
import { connect } from 'react-redux'
import { updateProducts } from "../../redux/actions/product"

function ProductPricingTab(props) {

  const { data, updateProducts } = props

  const handleChangeFee = (e) => {
    data.fee = e.target.value
    data.updated = true
    updateProducts(data)
    calculate(data)
  }

  const handleChangeUpFee = () => {
    let value = parseFloat(data.fee)
    value += 0.01
    data.fee = value.toFixed(2)
    updateProducts(data)
    calculate(data)
  }

  const handleChangeDownFee = () => {
    let value = parseFloat(data.fee)

    if(value <= 0)
      return

    value -= 0.01
    data.fee = value.toFixed(2)
    updateProducts(data)
    calculate(variant)
  }

  const handleChangeProfit = (e) => {
    data.profit = e.target.value
    data.updated = 1
    updateProducts(data)
    calculate(data)
  }

  const handleChangeUpProfit = () => {
    let value = parseFloat(data.profit)
    value += 1
    data.profit = value.toFixed(2)
    data.updated = 1
    updateProducts(data)
    calculate(data)
  }

  const handleChangeDownProfit = () => {
    let value = parseFloat(data.profit)
    value -= 1
    data.profit = value.toFixed(2)
    data.updated = 1
    updateProducts(data)
    calculate(data)
  }

  const handleChangeMinOrder = (e) => {
    data.minOrder = e.target.value
    data.updated = 1
    updateProducts(data)
  }
  
  const handleChangeUpMinOrder = () => {
    let value = parseInt(data.minOrder)
    value += 1
    data.minOrder = value
    data.updated = 1
    updateProducts(data)
  }

  const handleChangeDownMinOrder = () => {
    let value = parseInt(data.minOrder)

    if(value <= 0)
      return
      
    value -= 1
    data.minOrder = value
    data.updated = 1
    updateProducts(data)
  }

  const handleChangeQuantity = (e) => {
    data.quantity = e.target.value
    data.updated = 1
    updateProducts(data)
    calculate(data)
  }

  const handleChangeUpQuantity = () => {
    let value = parseInt(data.quantity)
    value += 1
    data.quantity = value
    updateProducts(data)
    calculate(data)
  }

  const handleChangeDownQuantity = () => {
    let value = parseInt(data.quantity)

    if(value <= 0)
      return
      
    value -= 1
    data.quantity = value
    updateProducts(data)
    calculate(data)
  }

  const handleChangeBuyBoxPrice = (e) => {
    data.buyBoxPrice = e.target.value
    updateProducts(data)
    calculate(data)
  }

  const handleChangeUpBuyBoxPrice = () => {
    let value = parseFloat(data.buyBoxPrice)
    value += 0.01
    data.buyBoxPrice = value.toFixed(2)
    updateProducts(data)
    calculate(data)
  }

  const handleChangeDownBuyBoxPrice = () => {
    let value = parseFloat(data.buyBoxPrice)
    value -= 0.01
    data.buyBoxPrice = value.toFixed(2)
    updateProducts(data)
    calculate(data)
  }

  const handleChangeProfitAmount = (e) => {
    data.profitAmount = e.target.value
    updateProducts(data)
    calculate(data)
  }

  const handleChangeUpProfitAmount = () => {
    let value = parseFloat(data.profitAmount)
    value += 1
    data.profitAmount = value.toFixed(2)
    update(data)
    calculate(data)
  }

  const handleChangeDownProfitAmount = () => {
    let value = parseFloat(data.profitAmount)
    value -= 1
    data.profitAmount = value.toFixed(2)
    updateProducts(data)
    calculate(data)
  }

  function calculate(product) {
    let buyBoxPrice = product.buyBoxPrice
    let fee = product.fee
    let profit = product.profit
    let profitAmount = product.profitAmount
    let totalProfit = profitAmount + buyBoxPrice * profit / 100
    let price = buyBoxPrice + buyBoxPrice * fee / 100 + totalProfit

    product.totalProfit = totalProfit.toFixed(2)
    product.price = price.toFixed(2)
    product.profit = profit.toFixed(2)

    updateProducts(product)
  }

  return (
    <div className={styles.lavMwR}>
      <div className="ant-row modal-form" style={{marginLeft: -9, marginRight: -9}}>     
        <div className='ant-col ant-col-24 ant-col-xl-24'>
          <div className="ant-col ant-col-12 ant-col-xl-6" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>Amazon Buy Box $
              <InputNumber                                
                value={data.buyBoxPrice}
                handleUp={handleChangeUpBuyBoxPrice}
                handleDown={handleChangeDownBuyBoxPrice}
                handleChange={handleChangeBuyBoxPrice}
              />
            </label>
          </div> 
          <div className="ant-col ant-col-8 ant-col-xl-6" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>Profit %
              <InputNumber
                value={data.profit}
                handleChange={handleChangeProfit}
                handleUp={handleChangeUpProfit}
                handleDown={handleChangeDownProfit}
              />
            </label>
          </div>  
          <div className="ant-col ant-col-8 ant-col-xl-6" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>Profit $
              <InputNumber
                value={data.profitAmount}
                handleUp={handleChangeUpProfitAmount}
                handleDown={handleChangeDownProfitAmount}
                handleChange={handleChangeProfitAmount}
              />          
            </label>
          </div> 
          <div className="ant-col ant-col-8 ant-col-xl-6" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>Fees %
              <InputNumber
                value={data.fee}
                handleChange={handleChangeFee}
                handleUp={handleChangeUpFee}
                handleDown={handleChangeDownFee}
              />
            </label>           
          </div>                  
        </div>  
        <div className='ant-col ant-col-24 ant-col-xl-24'>
          <div className="ant-col ant-col-8 ant-col-xl-6" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>Total Available Qty
              <InputNumber
                value={data.quantity}
                handleChange={handleChangeQuantity}
                handleUp={handleChangeUpQuantity}
                handleDown={handleChangeDownQuantity}
              />
            </label>
          </div>
          <div className="ant-col ant-col-8 ant-col-xl-6" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>Minimum Order
              <InputNumber
                value={data.minOrder}
                handleChange={handleChangeMinOrder}
                handleUp={handleChangeUpMinOrder}
                handleDown={handleChangeDownMinOrder}
              />
            </label>
          </div>         
        </div>                        
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = {
  updateProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPricingTab)