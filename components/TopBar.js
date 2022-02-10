import styles from './TopBar.module.scss'

export default function TopBar({title}) {
  return (
    <div className={styles.cFZvyK}>
      <div className='ant-row'>
        <div className='ant-col ant-col-xl-12 ant-col-xxl-14'>
          <h2>{title}</h2>
        </div>
        {/* <div className="ant-col search-panel ant-col-xl-12 ant-col-xxl-10">
          <div className={styles.bHGWiK}>
            <span className={"ant-input-search main ant-input-affix-wrapper"}>
              <input placeholder="Search anything" className="ant-input" type="text" value=""/>
              <span className="ant-input-suffix">
                <i aria-label="icon: search" tabIndex="-1" className="anticon anticon-search ant-input-search-icon">
                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                  </svg>
                </i>
              </span>
            </span>
            <div className={styles.foKrX}>
              <div className="ant-tabs ant-tabs-top ant-tabs-line ant-tabs-no-animation">
                <div role="tablist" className="ant-tabs-bar ant-tabs-top-bar" tabIndex="0">
                  <div className="ant-tabs-nav-container">
                    <span unselectable="unselectable" className="ant-tabs-tab-prev ant-tabs-tab-btn-disabled">
                      <span className="ant-tabs-tab-prev-icon">
                        <i aria-label="icon: left" className="anticon anticon-left ant-tabs-tab-prev-icon-target">
                          <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                          </svg>
                        </i>
                      </span>
                    </span>
                    <span unselectable="unselectable" className="ant-tabs-tab-next ant-tabs-tab-btn-disabled">
                      <span className="ant-tabs-tab-next-icon">
                        <i aria-label="icon: right" className="anticon anticon-right ant-tabs-tab-next-icon-target">
                          <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                          </svg>
                        </i>
                      </span>
                    </span>
                    <div className="ant-tabs-nav-wrap">
                      <div className="ant-tabs-nav-scroll">
                        <div className="ant-tabs-nav ant-tabs-nav-animated">
                          <div>
                            <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">products</div>
                            <div role="tab" aria-disabled="false" aria-selected="true" className="ant-tabs-tab-active ant-tabs-tab">drafts</div>
                            <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">orders</div>
                          </div>
                          <div className="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated" style={{display: 'block', transform: 'translate3d(95px, 0px, 0px)', width: '78px'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ant-tabs-content ant-tabs-content-no-animated ant-tabs-top-content">
                  <div role="tabpanel" aria-hidden="true" className="ant-tabs-tabpane ant-tabs-tabpane-inactive"></div>
                  <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
                    <div className="flex column w-p-100">
                      <div className="ant-empty ant-empty-normal">
                        <div className="ant-empty-image">
                          <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                              <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                              <g fillRule="nonzero" stroke="#D9D9D9">
                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="ant-empty-description">No Data</p>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" aria-hidden="true" className="ant-tabs-tabpane ant-tabs-tabpane-inactive"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>  
  )
}
