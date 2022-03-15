import styles from './CaretUpButton.module.scss'
import CaretUpIcon from '@assets/CaretUpIcon'

export default function CaretUpButton(props) {
  const { style } = props
  return (
    <i 
      aria-label="icon: caret-up" 
      className={`anticon ${styles["anticon"]} ${styles['anticon-caret-up']}`} 
      style={style}
    >
      <CaretUpIcon/>
    </i>
  )
}
