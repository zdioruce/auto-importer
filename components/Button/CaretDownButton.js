import styles from './CaretDownButton.module.scss'
import CaretDownIcon from '@assets/CaretDownIcon'

export default function CaretDownButton(props) {
  const { style } = props

  return (
    <i 
      aria-label="icon: caret-down" 
      className={`anticon ${styles["anticon"]} ${styles['anticon-caret-down']}`} 
      style={style}
    >
      <CaretDownIcon/>
    </i>
  )
}
