import styles from './styles.module.scss'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import PageLayout from '@components/PageLayout'
import ProductDetailView from '@components/ProductDetailView'
import ProductDetailHeader from '@components/ProductDetailHeader'
import ProductDetailSkeleton from '@components/ProductDetailSkeleton'

export default function DraftProductDetail() {

    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
  
    useEffect(() => {
        fetchData();
    }, [id])

    async function fetchData() {
        await fetch('/api/products/' + id)
        .then(response => response.json())
        .then(data => {
            setData(data.result[0])
        })   
        .catch((error) => {
            setError(error)
        });
    }
    
    function handleBack() {
        router.back()
    }

    function handleSave() {

    }

    function handleSaveImport() {

    }

    let content = null
    
    if (error) {
        content = <div>failed to load</div>
    }

    if (!data) {
        content = <ProductDetailSkeleton/>
    } else {
        content = <>
                    <ProductDetailHeader
                        data={data}
                        handleSave={handleSave}
                        handleSaveImport={handleSaveImport}
                    />
                    <ProductDetailView
                        data={data}
                        expand={true}
                    />
                </>
    }

    return (
      <PageLayout
        title={'Upload (1)'}
      >
        <div className={styles.iDDieF}>
            <button type="button" className="ant-btn ant-btn-link" onClick={() => handleBack()}>
                <i aria-label="icon: left" className="anticon anticon-left">
                    <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                    </svg>
                </i>
                <span>Back</span>
            </button>
            {content}
        </div>        
      </PageLayout>        
    )
}
