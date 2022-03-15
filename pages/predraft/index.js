import styles from './styles.module.scss'
import React, { useEffect } from "react"
import { useRouter } from 'next/router'
import ProductDetailHeader from '@components/ProductDetailHeader'
import ProductDetailSkeleton from '@components/ProductDetailSkeleton'
import ProductDetailView from '@components/ProductDetailView'
import { connect } from 'react-redux'
import { 
  createProducts, 
  saveProduct, 
  importProducts 
} from "@redux/actions/product"
import LeftArrowIcon from '@assets/LeftArrowIcon'

function PreDraft(props) {
  
  const router = useRouter()
  const { uploadVariations, action } = router.query
  const { createProducts } = props
  const { products, loading, error } = props.product
  const { asins } = props.main

  useEffect(() => {
    createProducts(uploadVariations, asins, action)
  }, [uploadVariations, asins, createProducts, action])

  const handleBack = () => {
    router.replace('drafts')
  }

  function handleSave() {
    saveProduct(products[0])
  }

  function handleSaveImport() {
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
                  data={products[products.length - 1]}
                  handleSave={handleSave}
                  handleSaveImport={handleSaveImport}
                />
                <ProductDetailView
                  fullpage={true}
                  data={products[products.length - 1]}
                  expand={true}
                />
              </>
  }

  return (
    <div className={styles.iDDieF}>
      <button 
        type="button" 
        className="ant-btn ant-btn-link" 
        onClick={handleBack}
      >
        <i aria-label="icon: left" className="anticon anticon-left">
          <LeftArrowIcon/>
        </i>
        <span>Back</span>
      </button>
      {content}
    </div>
  )
}
  
const mapStateToProps = state => ({
  product: state.product,
  main: state.main
})

const mapDispatchToProps = {
  createProducts, 
  saveProduct, 
  importProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(PreDraft)