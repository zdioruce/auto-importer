import styles from './ProductImagesTab.module.scss'
import ProductImage from '@components/Row/ProductImage'
import CheckBox from '@components/Input/CheckBox'
import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import TrashIcon from '@assets/TrachIcon'
import PlusIcon from '@assets/PlusIcon'

export default function ProductImagesTab(props) {  

  const {fullpage, images} = props
  const dispatch = useDispatch()      
  const [selectedImages, setSelectedImages] = useState([])

  function handleCheck(id) {
    let ids = []
    
    selectedImages.forEach(element => {
      ids.push(element)
    })    

    if(ids.includes(id)){
      const index = ids.indexOf(id);
      if (index > -1) {
        ids.splice(index, 1);
      }
    }else{
      ids.push(id)
    }
    setSelectedImages(ids)
  }
  
  function handleAllCheck() {
    if(selectedImages.length > 0){
      setSelectedImages([])
    } else{
      let ids = []
      images.forEach((element, index) => {
          ids.push(index)
      })  
      setSelectedImages(ids)
    }
  }

  return (
    <div className={fullpage? styles.iEyGNo: styles.gxiHCB}>
      <div className={selectedImages.length > 0? styles.gHsaWi: styles.egDxQG}>
        <div>                   
          <CheckBox
            check={selectedImages.length > 0}
            indeterminate={selectedImages.length != images.length}      
            handleCheck={handleAllCheck}
          />
          <span>{selectedImages.length} {selectedImages.length > 1? 'Images':'Image'} Selected:</span>
        </div>
        {
          selectedImages.length > 0 &&
          <div>
            <span>
              <TrashIcon/>
            </span>
          </div>
        }
      </div>
      <div className={styles.iYUFFy}>
        {
          images.map((element, index) => (
            <ProductImage
              key={index}
              index={index}
              check={selectedImages.includes(index)}
              image={element}
              handleCheck={handleCheck}
            />
          ))
        }
        <div 
          className={styles.bWUink} 
          onClick={() => dispatch(showAddImageModal({ value: true }))}
        >
          <div>
            <PlusIcon/>
            <p>Add Image</p>
          </div>
        </div>
      </div>            
    </div>
  )
}
