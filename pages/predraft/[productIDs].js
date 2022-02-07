import styles from './styles.module.scss'
import React, { useEffect } from "react"
import { useRouter } from 'next/router'

export default function PreDraft() {
    const router = useRouter()
    const { productIDs } = router.query

    useEffect(() => {
      fetchData();
    })

    async function fetchData() {
      await fetch('/api/product/' + productIDs)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        router.back()
      })   
    }

    function handleBack() {
      router.back()
    }

    return (
      <div>
        <div className={styles.cFZvyK}>
          <div className="ant-row">
            <div className="ant-col ant-col-xl-12 ant-col-xxl-14">
              <h2>Add new product </h2>
            </div>
            <div className="ant-col search-panel ant-col-xl-12 ant-col-xxl-10">
              {/*<div className="bHGWiK">
                <span className="ant-input-search sc-2q7waq-1 gocuvu main ant-input-affix-wrapper">
                  <input placeholder="Search anything" className="ant-input" type="text" value=""/>
                  <span className="ant-input-suffix">
                    <i aria-label="icon: search" tabIndex="-1" className="anticon anticon-search ant-input-search-icon">
                      <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                      </svg>
                    </i>
                  </span>
                </span>
                <div className="sc-2q7waq-2 foKrX">
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
                                <div role="tab" aria-disabled="false" aria-selected="true" className="ant-tabs-tab-active ant-tabs-tab">products</div>
                                <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">drafts</div>
                                <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">orders</div>
                              </div>
                              <div className="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated" style="display: block; transform: translate3d(0px, 0px, 0px); width: 95px;"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div tabIndex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;"></div>
                    <div className="ant-tabs-content ant-tabs-content-no-animated ant-tabs-top-content">
                      <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
                        <div tabIndex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;">
                        </div>
                        <div className="flex column w-p-100"><div className="ant-empty ant-empty-normal">
                          <div className="ant-empty-image">
                            <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                              <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                                <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                                <g fill-rule="nonzero" stroke="#D9D9D9">
                                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                  <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <p className="ant-empty-description">No Data</p>
                        </div>
                      </div>
                      <div tabIndex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;">
                      </div>
                    </div>
                    <div role="tabpanel" aria-hidden="true" className="ant-tabs-tabpane ant-tabs-tabpane-inactive">                    
                    </div>
                    <div role="tabpanel" aria-hidden="true" className="ant-tabs-tabpane ant-tabs-tabpane-inactive">                    
                    </div>
                  </div>
                  <div tabIndex="0" role="presentation" style="width: 0px; height: 0px; overflow: hidden; position: absolute;">                  
                  </div>
                </div>
                </div>
              </div>
              <button type="button" className="ant-btn m-r-10 m-l-10 ant-btn-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M14 5V3H10V5H14ZM9 3H6.77778C5.79594 3 5 3.79594 5 4.77778V19.2222C5 20.2041 5.79594 21 6.77778 21H13L14.3333 19H7V5H9V3ZM13.25 16L12.625 17H9V16H13.25ZM17 10H19V4.77778C19 3.79594 18.2041 3 17.2222 3H15V5H17V10ZM9 7H15V8H9V7ZM15 11V10H9V11H15ZM14 13H9V14H14V13Z" fill="#727272"></path>
                  <circle cx="18" cy="17" r="2" fill="white"></circle><path d="M18 12H23L19.5 15H22L15 21L17 17H15L18 12Z" fill="#5A5859"></path>
                </svg>
                <span>Balance: $0</span>
              </button>
              <button type="button" className="ant-btn affiliate-button ant-btn-link">
                <svg data-color="basic" className="heart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M12.0013 6.31966C13.7198 4.75897 16.3946 4.47191 18.2827 6.05274L18.2839 6.0537C20.4569 7.87863 20.5607 11.1251 18.6262 13.0882L18.6246 13.0898L13.3322 18.4354C12.6117 19.1881 11.3882 19.1881 10.6677 18.4354L5.37536 13.0898L5.37373 13.0882C3.43918 11.1251 3.54301 7.87863 5.71606 6.0537L5.7172 6.05274C7.59927 4.47698 10.2994 4.75323 12.0013 6.31966ZM13.2446 7.89638L12.0318 9.14723L10.7604 7.90161L10.7536 7.89461C9.70842 6.82965 8.05673 6.70298 7.00171 7.58573C5.73372 8.65111 5.67359 10.5423 6.79754 11.6836C6.79778 11.6839 6.79802 11.6841 6.79826 11.6844L12 16.9384L17.2016 11.6844C17.2019 11.6842 17.2014 11.6846 17.2016 11.6844C18.3256 10.5431 18.2662 8.65131 16.9984 7.58587C15.9489 6.70762 14.3235 6.82358 13.2446 7.89638Z" fill="#727272"></path>
                </svg>
              </button>
              <span className="beamerTrigger beamer_beamerSelector beamer_beamerSelectorRelative" data-beamer-keypress="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M7 5C5.89543 5 5 5.89543 5 7V13C5 14.1046 5.89543 15 7 15H8.73333H9V19L13 15H17C18.1046 15 19 14.1046 19 13V7C19 5.89543 18.1046 5 17 5H7Z" fill="transparent"></path>
                  <path d="M9 15H10C10 14.4477 9.55228 14 9 14V15ZM9 19H8C8 19.4045 8.24364 19.7691 8.61732 19.9239C8.99099 20.0787 9.42111 19.9931 9.70711 19.7071L9 19ZM13 15V14C12.7348 14 12.4804 14.1054 12.2929 14.2929L13 15ZM6 7C6 6.44772 6.44772 6 7 6V4C5.34315 4 4 5.34315 4 7H6ZM6 13V7H4V13H6ZM7 14C6.44772 14 6 13.5523 6 13H4C4 14.6569 5.34315 16 7 16V14ZM8.73333 14H7V16H8.73333V14ZM9 14H8.73333V16H9V14ZM8 15V19H10V15H8ZM9.70711 19.7071L13.7071 15.7071L12.2929 14.2929L8.29289 18.2929L9.70711 19.7071ZM17 14H13V16H17V14ZM18 13C18 13.5523 17.5523 14 17 14V16C18.6569 16 20 14.6569 20 13H18ZM18 7V13H20V7H18ZM17 6C17.5523 6 18 6.44772 18 7H20C20 5.34315 18.6569 4 17 4V6ZM7 6H17V4H7V6Z" fill="#5a5859"></path>
                  <rect x="8" y="9" width="2" height="3" fill="#5a5859"></rect><rect x="11" y="8" width="2" height="4" fill="#5a5859"></rect><rect x="14" y="10" width="2" height="2" fill="#5a5859"></rect>
                </svg>
                <div className="beamer_icon" style="display: none; inset: 0px; background-color: rgb(213, 153, 85);" data-beamer-keypress="true">1</div>
              </span>
              <a href="/help-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M10 18.7101V16.584C8.84656 16.08 7.92 15.1534 7.41604 14H5.28988C5.96183 16.2578 7.74222 18.0382 10 18.7101ZM5.28988 10H7.41604C7.92 8.84656 8.84656 7.92 10 7.41604V5.28988C7.74222 5.96183 5.96183 7.74222 5.28988 10ZM10 4.25203C10.6392 4.08751 11.3094 4 12 4C12.6904 4 13.3603 4.08744 13.9993 4.25186C13.9995 4.25192 13.9998 4.25198 14 4.25203C16.8112 4.97559 19.0244 7.18879 19.748 10C19.9125 10.6392 20 11.3094 20 12C20 12.6904 19.9126 13.3603 19.7481 13.9993C19.7481 13.9995 19.748 13.9998 19.748 14C19.0244 16.8112 16.8112 19.0244 14 19.748C13.3608 19.9125 12.6906 20 12 20C11.3096 20 10.6397 19.9126 10.0007 19.7481C10.0005 19.7481 10.0002 19.748 10 19.748C7.18878 19.0244 4.97559 16.8112 4.25203 14C4.08751 13.3608 4 12.6906 4 12C4 11.3096 4.08744 10.6397 4.25186 10.0007C4.25192 10.0005 4.25198 10.0002 4.25203 10C4.97559 7.18878 7.18878 4.97559 10 4.25203ZM14 18.7101C16.2578 18.0382 18.0382 16.2578 18.7101 14H16.584C16.08 15.1534 15.1534 16.08 14 16.584V18.7101ZM16.584 10H18.7101C18.0382 7.74222 16.2578 5.96183 14 5.28988V7.41604C15.1534 7.92 16.08 8.84656 16.584 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#727272"></path>
                </svg>
              </a>
              <svg width="24" height="24" className="ant-dropdown-trigger" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clipRule="evenodd" d="M14.6141 11.7484C15.4683 10.9294 16 9.77679 16 8.5C16 6.01472 13.9853 4 11.5 4C9.01472 4 7 6.01472 7 8.5C7 9.77679 7.53174 10.9294 8.38585 11.7484C5.6914 13.1331 4 16.2512 4 19.5C4 19.6671 4.00447 19.8338 4.01333 20H6.01603C6.00541 19.835 6 19.6682 6 19.5C6 15.9101 8.46243 13 11.5 13C14.5376 13 17 15.9101 17 19.5C17 19.6682 16.9946 19.835 16.984 20H18.9867C18.9955 19.8338 19 19.6671 19 19.5C19 16.2512 17.3086 13.1331 14.6141 11.7484ZM14 8.5C14 9.88071 12.8807 11 11.5 11C10.1193 11 9 9.88071 9 8.5C9 7.11929 10.1193 6 11.5 6C12.8807 6 14 7.11929 14 8.5Z" fill="#727272"></path>
              </svg> */}
            </div>
          </div>
        </div>
        <div className={styles.iDDieF}>
          <button type="button" className="ant-btn ant-btn-link" onClick={() => handleBack()}>
              <i aria-label="icon: left" className="anticon anticon-left">
                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                  </svg>
              </i>
              <span>Back</span>
          </button>
          <div className={styles.iBeWfn + ' ' + styles.bZIpjk}>
            <div className={styles.eEamKo + " ant-skeleton ant-skeleton-active "}>
              <div className="ant-skeleton-content">
                <h3 className="ant-skeleton-title"></h3>
              </div>
            </div>
            <div className={"ant-skeleton ant-skeleton-active " + styles.fbhFxO}>
              <div className="ant-skeleton-content">
                <h3 className="ant-skeleton-title" style={{width: "38%"}}></h3>
                <ul className="ant-skeleton-paragraph">
                  <li style={{width: '60%'}}></li>
                </ul>
              </div>
            </div>
            <div className={"ant-skeleton ant-skeleton-active " + styles.kKhPDE}>
              <div className="ant-skeleton-content">
                <h3 className="ant-skeleton-title"></h3>
              </div>
            </div>
            <div className={"ant-skeleton ant-skeleton-active " + styles.kKhPDE}>
              <div className="ant-skeleton-content">
                <h3 className="ant-skeleton-title"></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
  