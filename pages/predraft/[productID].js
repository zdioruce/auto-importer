import styles from '../../styles/Home.module.css'
import React, { useEffect } from "react"
import { useRouter } from 'next/router'
import { Placeholder } from 'react-bootstrap';

export default function PreDraft() {
    const router = useRouter()
    const { productID } = router.query

    useEffect(() => {
        async function fetchData() {
          await fetch('/api/product/' + productID)
          .then(response => response.json())
          .then(data => {
            router.back()
          })   
        }
    
        fetchData();
    })
  
    return (
        <main className={styles.main}>
          
        </main>
    )
}
  