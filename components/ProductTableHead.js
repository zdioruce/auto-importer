import styles from './ProductTableHead.module.scss'

export default function ProductTableHead({item}) {
  return (
    <thead className={styles.dfBkFB}>
      <tr>
        <th className={styles.fixed} style={{width: '36px', minWidth: '36px', maxWidth: '36px', left: '0px'}}></th>
        <th className={styles.fixed} style={{width: '260px', minWidth: '260px', maxWidth: '260px', left: '36px'}}>Name</th>
        <th className={styles.fixed} style={{width: '120px', minWidth: '120px', maxWidth: '120px', left: '296px'}}>
          <div className={styles.fNoord}>
            <div>
              Uploaded
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th>
        <th className={styles.fixed + ' ' + styles['last-fixed']} style={{width: '80px', minWidth: '80px', maxWidth: '80px', left: '416px'}}></th>
        <th style={{width: '85px', minWidth: '85px', maxWidth: '85px'}}>
          <div className={styles.gMfxae}>
            <div>
              Available
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles.anticon + ' ' + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th>
        {/* <th style={{width: '80px', minWidth: '80px', maxWidth: '80px'}}>
          <div className={styles.fNoord}>
            <div>
              On Hold
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th>
        <th style={{width: '110px', minWidth: '110px', maxWidth: '110px'}}>
          <div className={styles.fNoord}>
            <div>
              Out Of Stock
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th>
        <th style={{width: '60px', minWidth: '60px', maxWidth: '60px'}}>
          <div className={styles.fNoord}>
            <div>
              Total
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th>
        <th style={{width: '90px', minWidth: '90px', maxWidth: '90px'}}>
          <div className={styles.fNoord}>
            <div>
              OOS Days
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th> */}
        <th style={{width: '190px', minWidth: '190px', maxWidth: '190px'}}>
          <div className={styles.fNoord}>
            <div>
              Price
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" size="20" className={styles['custom-sort-icon']} height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"></path>
              </g>
            </svg>
          </div>
        </th>
        {/* <th style={{width: '140px', minWidth: '140px', maxWidth: '140px'}}>
          <div className={styles.fNoord}>
            <div>
              Profit
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th> */}
        <th style={{width: '200px', minWidth: '200px', maxWidth: '200px'}}>Item ID</th>
        {/* <th style={{width: '55px', minWidth: '55px', maxWidth: '55px'}}>
          <div className={styles.fNoord}>
            <div>
              Sold
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th>
        <th style={{width: '55px', minWidth: '55px', maxWidth: '55px'}}>
          <div className={styles.fNoord}>
            <div>
              <span>DWS</span>
              <div className={styles['sort-icons']}>
                <i aria-label="icon: caret-up" className={"anticon " + styles['anticon-caret-up']} style={{color: 'rgb(229, 229, 229)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                  </svg>
                </i>
                <i aria-label="icon: caret-down" className={"anticon " + styles['anticon-caret-down']} style={{color: 'rgb(228, 158, 76)'}}>
                  <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </th> */}
        {/* <th style={{width: '170px', minWidth: '170px', maxWidth: '170px'}}>Store</th> */}
        <th style={{width: '200px', minWidth: '200px', maxWidth: '200px'}}>Tags</th>
        <th style={{width: '200px', minWidth: '200px', maxWidth: '200px'}}>Collections</th>
      </tr>
    </thead>
  )
}
