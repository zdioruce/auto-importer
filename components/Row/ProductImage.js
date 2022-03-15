import styles from './ProductImage.module.scss'
import Image from 'next/image'
import CheckBox from '@components/Input/CheckBox'

export default function ProductImage({index, check, image, handleCheck}) {
  return (
    <div className={index == 0 ? styles.gZoLZH: styles.bfMcOI} draggable="true">
      <CheckBox
        check={check}
        className={styles['ant-checkbox-wrapper']}
        handleCheck={() => handleCheck(index)}
      />
      <Image 
        className={styles.img} 
        crossOrigin="anonymous" 
        src={process.env.IMAGE_PATH + image} 
        alt="pic" 
        width={240}
        height={240}
      />
    </div>      
  )
}
