import styles from './ProductTableHead.module.scss'
import CaretUpButton from './Button/CaretUpButton'
import CaretDownButton from './Button/CaretDownButton'

export default function ProductTableHead() {
  return (
    <thead className={styles.dfBkFB}>
      <tr>
        <th className={styles.th + ' ' + styles.fixed} style={{width: 36, minWidth: 36, maxWidth: 36, left: 0}}></th>
        <th className={styles.th + ' ' + styles.fixed} style={{width: 260, minWidth: 260, maxWidth: 260, left: 36}}>Name</th>
        <th className={styles.th + ' ' + styles.fixed} style={{width: 120, minWidth: 120, maxWidth: 120, left: 296}}>
          <div className={styles.fNoord}>
            <div>
              Uploaded
              <div className={styles['sort-icons']}>
                <CaretUpButton
                  style={{color: 'rgb(229, 229, 229)'}}
                />
                <CaretDownButton
                  style={{color: 'rgb(229, 229, 229)'}}
                />
              </div>
            </div>
          </div>
        </th>
        <th className={styles.th + ' ' + styles.fixed + ' ' + styles['last-fixed']} style={{width: 80, minWidth: 80, maxWidth: 80, left: 416}}></th>
        <th className={styles.th} style={{width: 85, minWidth: 85, maxWidth: 85}}>
          <div className={styles.gMfxae}>
            <div>
              Available
              <div className={styles['sort-icons']}>
                <CaretUpButton
                  style={{color: 'rgb(229, 229, 229)'}}
                />
                <CaretDownButton
                  style={{color: 'rgb(229, 229, 229)'}}
                />
              </div>
            </div>
          </div>
        </th>        
        <th className={styles.th} style={{width: 190, minWidth: 190, maxWidth: 190}}>
          <div className={styles.fNoord}>
            <div>
              Price
              <div className={styles['sort-icons']}>
                <CaretUpButton
                  style={{color: 'rgb(229, 229, 229)'}}
                />
                <CaretDownButton
                  style={{color: 'rgb(229, 229, 229)'}}
                />
              </div>
            </div>
          </div>
        </th>
        <th className={styles.th} style={{width: 200, minWidth: 200, maxWidth: 200}}>Item ID</th>
        <th className={styles.th} style={{width: 200, minWidth: 200, maxWidth: 200}}>Tags</th>
      </tr>
    </thead>
  )
}
