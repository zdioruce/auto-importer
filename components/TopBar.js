import styles from './TopBar.module.scss'

export default function TopBar({title}) {
  return (
    <div className={styles.cFZvyK}>
      <div className='ant-row'>
        <div className='ant-col ant-col-xl-12 ant-col-xxl-14'>
          <h2>{title}</h2>
        </div>        
      </div>
    </div>  
  )
}
