import styles from './StoreTableRow.module.scss'
import TrashIcon from '@assets/TrachIcon'
import CheckBox from '@components/Input/CheckBox'

export default function StoreTableRow(props) {

  const { data, handleCheck } = props

  return (
    <div className={styles.dCsZcK}>
      <CheckBox
        style={{marginRight: 20}}
        check={data.status == 1}
        handleCheck={handleCheck}
      />
      <span className={`${styles['edit-store']} ant-dropdown-trigger`}>
        <TrashIcon/>
      </span>
      <div className={styles.jMGhaE}>b</div>
      <div className={styles.info}>
        <div>
          <span className={styles['store-name']}>{data.url}</span>
        </div>
        <div className={styles['amount']}>
          <span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M21 7.38193L12.0572 2.91052L3 6.30697V17.618L11.9717 22.1039L21 18.154V7.38193ZM11 11.618L5 8.618V16.3819L11 19.3819V11.618ZM19 16.846L13 19.471V11.693L14.9999 10.943V13L16.9999 12.5V10.193L19 9.44297V16.846ZM16.0718 8.40504L17.5017 7.86884L11.9428 5.08941L10.7169 5.54912L16.0718 8.40504ZM8.22152 6.4849L6.49833 7.13109L12.0572 9.91052L13.5764 9.34082L8.22152 6.4849Z" fill="#B7B7B7"></path>
            </svg> 
            3
          </span>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 13.3333C10.9456 13.3333 13.3334 10.9455 13.3334 8C13.3334 5.05448 10.9456 2.66666 8.00008 2.66666C5.05456 2.66666 2.66675 5.05448 2.66675 8C2.66675 10.9455 5.05456 13.3333 8.00008 13.3333ZM5.52868 5.52859C5.78903 5.26824 6.21114 5.26824 6.47149 5.52859L8.00008 7.05719L9.52868 5.52859C9.78903 5.26824 10.2111 5.26824 10.4715 5.52859C10.7318 5.78894 10.7318 6.21105 10.4715 6.4714L8.94289 8L10.4715 9.52859C10.7318 9.78894 10.7318 10.2111 10.4715 10.4714C10.2111 10.7318 9.78903 10.7318 9.52868 10.4714L8.00008 8.94281L6.47149 10.4714C6.21114 10.7318 5.78903 10.7318 5.52868 10.4714C5.26833 10.2111 5.26833 9.78894 5.52868 9.52859L7.05727 8L5.52868 6.4714C5.26833 6.21105 5.26833 5.78894 5.52868 5.52859Z" fill="#B7B7B7"></path>
            </svg> 
            0
          </span>
        </div>
      </div>
    </div>
  )
}