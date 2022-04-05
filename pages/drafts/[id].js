import styles from './styles.module.scss'
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import ProductDetailView from '@components/ProductDetailView'
import ProductDetailHeader from '@components/ProductDetailHeader'
import ProductDetailSkeleton from '@components/ProductDetailSkeleton'
import BackIcon from '@assets/BackIcon'
import { connect } from 'react-redux'
import { 
  getProduct, 
  saveProduct, 
  importProducts 
} from "@redux/actions/product"

function DraftProductDetail(props) {

  const router = useRouter()
  const {getProduct, saveProduct, importProducts} = props
  const {error, loading, products} = props.product

  useEffect(() => {
    if(router.isReady){
      const { id } = router.query
      getProduct(id, 0)
    }
  }, [router])

  const handleBack = () => {
    router.replace("/drafts")
  }

  const handleSave = () => {
    saveProduct(products[0])
  }

  const handleSaveImport = () => {
    importProducts([products[0].id])
  }

  let content = null

  if (error) {
    content = <div>failed to load</div>
  }

  if (products.length == 0) {
    content = <ProductDetailSkeleton/>
  } else {
    content = <>
                <ProductDetailHeader
                  loading={loading}
                  data={products[0]}
                  handleSave={handleSave}
                  handleSaveImport={handleSaveImport}
                />
                <ProductDetailView
                  fullpage={true}
                  data={products[0]}
                  expand={true}
                />
              </>
  }

  return (
    <div className={styles.iDDieF}>
      <button 
        type="button" 
        className="ant-btn ant-btn-link" 
        onClick={handleBack}>
        <i aria-label="icon: left" className="anticon anticon-left">
          <BackIcon/>
        </i>
        <span>Back</span>
      </button>
      {content}
    </div>
  )
}

const mapStateToProps = state => ({
  product: state.product,
})

const mapDispatchToProps = {
  getProduct, 
  saveProduct, 
  importProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftProductDetail)