import styles from './ProductDetailTab.module.scss'
import React, { useRef, useState } from "react"
import { connect } from 'react-redux'
import { updateProducts } from "@redux/actions/product"
import { 
  addSelect,
  updateSelect 
} from "@redux/actions/menu"

import Input from '@components/Input/Input'
import Select from '@components/Select/Select'
import MultipleSelect from '@components/Select/MultipleSelect'

function ProductDetailTab(props) {

  const { 
    fullpage,
    data, 
    updateProducts,
    addSelect,
    updateSelect
  } = props

  const { 
    arrDropDown 
  } = props.menu

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const collections = [
    'Accessories',
    'All in One',
    'Cameras',
    'Eyewear',
    'Gadgets',
    'Gaming',
    'Headphone',
    'Home page',
    'Keyboard',
    'Laptops & Computer',
    'Mac Computers',
    'Mouse',
    'MP3 Players',
    'Music',
    'PC Computers',
    'Phones & PDAs',
    'Photography',
    'Printers & Ink',
    'Software',
    'TV & Audio',
    'Ultrabooks',
    'Watches'
  ]

  const countries = [
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'China',
    'Thailand',
    'Spain',
    'Australia',
    'Canada',
    'Poland',
    'Russia',
    'Belgium',
    'Czech Republic'
  ]

  const shippingMethods = [
    'Cheapest',
    'Cheapest with tracking',
    'Fastest with tracking'
  ]

  const handleChangeTitle = (e) => {    
    data.title = e.target.value
    data.updated = 1
    updateProducts(data)
  }

  const handleChangeBrand = (e) => {
    data.brand = e.target.value
    data.updated = 1
    updateProducts(data)
  }

  const handleChangeCity = (e) => {
    data.city = e.target.value
    data.updated = 1
    updateProducts(data)
  }

  const [expandCollection, setExpandCollection] = useState(false)

  const handleExpandCollection = () => {
    setExpandCollection(!expandCollection)

    const id = "collections_" + data.id
    const element = arrDropDown.find(element => element.id == id)
    
    if(element) {
      updateSelect(
        id,          
        ref1.current.getBoundingClientRect(),
        data.collections.split(',').filter(Boolean),
        !element.show
      )
    } else {
      addSelect(
        id,
        data.id,
        1,
        ref1.current.getBoundingClientRect(),
        collections,
        data.collections.split(',').filter(Boolean),
        true,
        true
      )  
    }
  }

  const [expandTags, setExpandTags] = useState(false)
  const handleExpandTags = () => {
    setExpandTags(!expandTags)

    const id = "tags_" + data.id
    const element = arrDropDown.find(element => element.id == id)
    
    if(element) {
      updateSelect(
        id,  
        ref2.current.getBoundingClientRect(),
        data.collections.split(',').filter(Boolean),
        !element.show
      )
    } else {
      addSelect(
        id,
        data.id,
        2,
        ref2.current.getBoundingClientRect(),
        data.tags.split(',').filter(Boolean),
        data.tags.split(',').filter(Boolean),
        true,
        true
      )  
    }
  }

  const [expandShippingMethod, setExpandShippingMethod] = useState(false)
  const handleExpandShippingMethod = () => {
    setExpandShippingMethod(!expandShippingMethod)

    const id = "shippingmethod_" + data.id
    const element = arrDropDown.find(element => element.id == id)
    
    if(element) {
      updateSelect(
        id,  
        ref3.current.getBoundingClientRect(),
        data.collections.split(',').filter(Boolean),
        !element.show
      )
    } else {
      addSelect(
        id,
        data.id,
        3,
        ref3.current.getBoundingClientRect(),
        shippingMethods,
        data.shippingMethod,
        true,
        false
      )  
    }
  }

  const [expandCountry, setExpandCountry] = useState(false)
  const handleExpandCountry = () => {
    setExpandCountry(!expandCountry)

    const id = "country_" + data.id
    const element = arrDropDown.find(element => element.id == id)
    
    if(element) {
      updateSelect(
        id,  
        ref4.current.getBoundingClientRect(),
        data.collections.split(',').filter(Boolean),
        !element.show
      )
    } else {
      addSelect(
        id,
        data.id,
        4,
        ref4.current.getBoundingClientRect(),
        countries,
        data.country,
        true,
        false
      )  
    }
  }
  
  function handleCollectionDelete(value) {
    const id = "collections_" + data.id
    const products = JSON.parse(localStorage.getItem('products'))
    const product = products.find(element => element.id == data.id)   
    const collections = product.collections.split(',').filter(Boolean);
    collections.splice(collections.indexOf(value), 1)
    product.collections = collections.join()
    product.updated = 1
    updateProducts(product)
    updateSelect(
      id,  
      ref4.current.getBoundingClientRect(),
      product.collections.split(',').filter(Boolean),
      false
    )
  }

  function handleTagDelete(value) {
    const id = "tags_" + data.id
    const drafts = JSON.parse(localStorage.getItem('drafts'))
    const draft = drafts.find(element => element.id == data.id)   
    const tags = draft.tags.split(',').filter(Boolean);
    tags.splice(tags.indexOf(value), 1)
    draft.tags = tags.join()
    draft.updated = 1
    updateProducts(draft)
    updateSelect(
      id,  
      ref4.current.getBoundingClientRect(),
      draft.tags.split(',').filter(Boolean),
      false
    )
  }

  return (
    <div className={fullpage? styles.lavMwR: styles.egURed}>
      <div className="ant-row modal-form" style={{marginLeft: -9, marginRight: -9}}>
        <div className="ant-col ant-col-24" style={{paddingLeft: 9, paddingRight: 9}}>
          <label>
            Title
            <div className={styles.MNMZy}>
              <span>{data.title.length}/255</span>
              <Input
                placeholder="Title"
                maxLength={255}
                value={data.title}
                onChange={handleChangeTitle}
              />
            </div>
          </label>
        </div>
        <div className="ant-col ant-col-24" style={{paddingLeft: 9, paddingRight: 9}}>
          <label>
            Collections
            <MultipleSelect
              ref={ref1}
              placeholder={'Enter Collections'}
              expand={expandCollection}
              handleExpand={handleExpandCollection}
              handleDelete={handleCollectionDelete}
              values={data.collections.split(',').filter(Boolean)}
            />
          </label>
        </div>
        <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: 9, paddingRight: 9}}>
          <label>
            Tags
            <MultipleSelect
              ref={ref2}
              placeholder={'Enter Tag'}
              expand={expandTags}
              handleExpand={handleExpandTags}
              handleDelete={handleTagDelete}
              values={data.tags.split(',').filter(Boolean)}
            />
          </label>
        </div>
        <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: 9, paddingRight: 9}}>
          <label>
            Shipping Methods
            <Select
              ref={ref3}
              expand={expandShippingMethod}
              handleExpand={handleExpandShippingMethod}
              value={data.shipping_method}
            />
          </label>
        </div>
      </div>
      <div className="ant-row modal-form" style={{marginLeft: -9, marginRight: -9}}>   
        <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: 9, paddingRight: 9}}>
          <label>
            Country Location
            <Select
              ref={ref4}
              expand={expandCountry}
              handleExpand={handleExpandCountry}
              value={data.country}
            />
          </label>
        </div>  
        <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: 9, paddingRight: 9}}>
          <label className="dEDYEl required">
            <span>Default City</span>
            <Input
              placeholder="City Location"
              value="New York" 
              onChange={handleChangeCity}
            />
          </label>
        </div>
        <div className='ant-col ant-col-24 ant-col-xl-12'>
          <div className="ant-col ant-col-24 ant-col-xl-24" style={{paddingLeft: 9, paddingRight: 9}}>
            <label>
              Brand
              <Input
                placeholder="Brand"
                value={data.brand} 
                onChange={handleChangeBrand}
              />
            </label>
          </div>                      
        </div>         
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  product: state.product,
  menu: state.menu
})

const mapDispatchToProps = {
  updateProducts, 
  updateProducts,
  addSelect,
  updateSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailTab)