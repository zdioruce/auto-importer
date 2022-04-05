import styles from './StoreEditIItem.module.scss'

export default function StoreEditIItem(props) {  

  const { title, onClick } = props

  return (
    <div className={styles.fGEwhV} onClick={onClick}>
      <div className={`${styles.kcHXWX} ${styles.kcbqrj}`}>b</div>
      <span className={styles['store-title']}>
        <span>{title}</span>
      </span> 
      <svg className="edit-icn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13 7.58231L14.2894 6.29289C14.6813 5.90101 15.3171 5.90257 15.7071 6.29637L17.2851 7.88994C17.6724 8.28101 17.6708 8.9115 17.2816 9.30067L16 10.5823L13 7.58231ZM12 8.58231L6 14.5823L9 17.5823L15 11.5823L12 8.58231ZM6 17.5823V14.5823L9 17.5823H6Z" fill="#727272"></path>
      </svg>
    </div>   
  )
}