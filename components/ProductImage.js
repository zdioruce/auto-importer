import styles from './ProductImage.module.scss'
import Image from 'next/image'

export default function ProductImage({index, image}) {
  return (
    <div className={index == 0 ? styles.gZoLZH: styles.bfMcOI} draggable="true">
      <label className={"ant-checkbox-wrapper " + styles["ant-checkbox-wrapper"]}>
        <span className="ant-checkbox">
          <input type="checkbox" className="ant-checkbox-input" value=""/>
          <span className="ant-checkbox-inner"></span>
        </span>
      </label>
      <Image className={styles.img} crossOrigin="anonymous" src={process.env.IMAGE_PATH + image} alt="pic" width="240px" height="240px"/>
    </div>      
  )
}
