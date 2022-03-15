import styles from './ProductDescriptionTab.module.scss'
import React, { useState } from "react"
import dynamic from 'next/dynamic'
const DynamicCKEditor = dynamic(() => import("../DynamicCKEditor"), { ssr: false });

export default function ProductDescriptionTab({description}) {

  return (
    <div className={styles.kJFhJx}>                
      <div className={styles.jqZpcr}>
        <div className={styles.QBEDW}>
          <div style={{visibility: 'hidden', display: 'none'}}></div>
          {
            <DynamicCKEditor
              description={description}
            />                    
          }                  
        </div>
      </div>
    </div>
  )
}
