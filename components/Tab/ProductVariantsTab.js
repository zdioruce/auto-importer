import styles from './ProductVariantsTab.module.scss'
import VariantTableRow from '@components/Row/VariantTableRow'
import CheckBox from '@components/Input/CheckBox'
import React, { useState } from "react"
import TrashIcon from '@assets/TrachIcon'

export default function ProductVariantsTab(props) {

  const {fullpage, variants} = props
  const [selectedVariants, setSelectedVariants] = useState([])

  function handleCheck(id) {
    let ids = []
    
    selectedVariants.forEach(element => {
      ids.push(element)
    })    

    if(ids.includes(id)){
      const index = ids.indexOf(id);
      if (index > -1) {
        ids.splice(index, 1); // 2nd parameter means remove one item only
      }
    }else{
      ids.push(id)
    }

    setSelectedVariants(ids)
  }
  
  function handleAllCheck() {
    if(selectedVariants.length > 0){
      setSelectedVariants([])
    } else{
      let ids = []
      variants.forEach((element, index) => {
        ids.push(element.id)
      })  
      
      setSelectedVariants(ids)
    }
  }
    
  return (
    <div className={styles.gYyuar}>
      <div className={(selectedVariants.length > 0? styles.FLPxa : styles.gJGdtq) + ' flex ai-c jc-sb'}>
        <div className="flex ai-c">
          <CheckBox
            check={selectedVariants.length > 0}
            indeterminate={selectedVariants.length != variants.length}      
            handleCheck={handleAllCheck}
            style={{marginRight:10}}
          />
          {selectedVariants.length}&nbsp;{selectedVariants.length > 1? 'Variants':'Variant'} Selected
          {
            selectedVariants.length > 0 &&
            <span>
              <TrashIcon/>
            </span>
          }
        </div>        
      </div>
      <div className={fullpage? styles.kWZePG: styles.dLmOkh}>
      {
        variants.map((element, index) => (
          <VariantTableRow
            key={index}
            check={selectedVariants.includes(element.id)}
            data={element}
            handleCheck={handleCheck}
          />
        ))
      }                  
      </div>
    </div>     
  )
}
