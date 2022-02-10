import styles from './ProductDetailTab.module.scss'
import React, { useEffect, useState } from "react"

export default function ProductDetailTab({data}) {

  const [title, setTitle] = useState(data.title)
  const [brand, setBrand] = useState(data.brand)

  function handleChangeTitle(value) {
    setTitle(value)
  }

  function handleChangeBrand(value) {
    setBrand(value)
  }

  return (
    <div className={styles.lavMwR}>
      <div className="ant-row modal-form" style={{marginLeft: '-9px', marginRight: '-9px'}}>
        <div className="ant-col ant-col-24" style={{paddingLeft: '9px', paddingRight: '9px'}}>
          <label>
              Title
              <div className={styles.MNMZy}>
                  <span>{title.length}/255</span>
                  <input placeholder="Title" type="text" className="ant-input ant-input-lg" value={title} style={{width: '100%'}} onChange={e => handleChangeTitle(e.target.value)}/>
              </div>
          </label>
        </div>
        {/* <div className="ant-col ant-col-24" style={{paddingLeft: '9px', paddingRight: '9px'}}>
          <label>Collections
              <div className="ant-select-lg ant-select-show-arrow multiple-select ant-select ant-select-enabled">
                  <div className="ant-select-selection ant-select-selection--multiple" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="b153914e-79b8-4f16-fa2c-ebfacaee00a1" aria-expanded="false">
                      <div className="ant-select-selection__rendered">
                          <div unselectable="on" className="ant-select-selection__placeholder" style={{display: 'block', userSelect: 'none'}}>Enter Collections</div>
                          <ul>
                              <li className="ant-select-search ant-select-search--inline">
                                  <div className="ant-select-search__field__wrap">
                                      <input autoComplete="off" className="ant-select-search__field" value=""/>
                                      <span className="ant-select-search__field__mirror">&nbsp;</span>
                                  </div>
                              </li>
                          </ul>
                      </div>
                      <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
                          <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                              </svg>
                          </i>
                      </span>
                  </div>
              </div>
          </label>
        </div>
        <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: '9px', paddingRight: '9px'}}>
          <label>
              Tags
              <span className="question-mark-icn">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                  </svg>
              </span>
              <div className="ant-select-lg ant-select-show-arrow multiple-select ant-select ant-select-enabled">
                  <div className="ant-select-selection ant-select-selection--multiple" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="a13c5a61-e5f9-4263-c92a-09cdc233d0f5" aria-expanded="false">
                      <div className="ant-select-selection__rendered">
                          <div unselectable="on" className="ant-select-selection__placeholder" style={{display: 'none', userSelect: 'none'}}>Enter Tag</div>
                          <ul>
                            {
                              data.tags.split(',').map((element, index) => (
                                <li key={index} unselectable="on" className="ant-select-selection__choice" role="presentation" title={element} style={{userSelect: 'none'}}>
                                    <div className="ant-select-selection__choice__content">{element}</div>
                                    <span className="ant-select-selection__choice__remove">
                                        <i aria-label="icon: close" className="anticon anticon-close ant-select-remove-icon">
                                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                            </svg>
                                        </i>
                                    </span>
                                </li>
                              ))
                            }
                              <li className="ant-select-search ant-select-search--inline">
                                  <div className="ant-select-search__field__wrap">
                                      <input autoComplete="off" className="ant-select-search__field" value=""/>
                                      <span className="ant-select-search__field__mirror">&nbsp;</span>
                                  </div>
                              </li>
                          </ul>
                      </div>
                      <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
                          <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                              </svg>
                          </i>
                      </span>
                  </div>
              </div>
          </label>
        </div> */}
        {/* <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: '9px', paddingRight: '9px'}}>
          <label>
              Shipping Methods
              <span className="question-mark-icn">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                  </svg>
              </span>
              <div className="ant-select-lg ant-select ant-select-enabled">
                  <div className="ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="980980ac-d6ce-40ce-8b9a-b5fadd2cddb1" aria-expanded="false" tabIndex="0">
                      <div className="ant-select-selection__rendered">
                          <div unselectable="on" className="ant-select-selection__placeholder" style={{display: 'none', userSelect: 'none'}}>Shipping Method</div>
                          <div className="ant-select-selection-selected-value" title="Cheapest with tracking" style={{display: 'block', opacity: 1}}>Cheapest with tracking</div>
                      </div>
                      <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
                          <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                              </svg>
                          </i>
                      </span>
                  </div>
              </div>
          </label>
        </div> */}
      </div>
      <div className="ant-row modal-form" style={{marginLeft: '-9px', marginRight: '-9px'}}>
          {/* <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: '9px', paddingRight: '9px'}}>
              <label>Country Location
                  <span className="question-mark-icn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                      </svg>
                  </span>
                  <div className="ant-select-lg ant-select ant-select-enabled">
                      <div className="ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="a1cdfa60-0450-4878-b840-37846209c13f" aria-expanded="false" tabIndex="0">
                          <div className="ant-select-selection__rendered">
                              <div unselectable="on" className="ant-select-selection__placeholder" style={{display: 'none', userSelect: 'none'}}>Country Location</div>
                              <div className="ant-select-selection-selected-value" title="United States" style={{display: 'block', opacity: 1}}>United States</div>
                          </div>
                          <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
                              <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                  </svg>
                              </i>
                          </span>
                      </div>
                  </div>
              </label>
          </div>
          <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: '9px', paddingRight: '9px'}}>
              <label className="sc-1gfsgs6-0 dEDYEl required">
                  <span>Default City</span>
                  <span className="question-mark-icn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                      </svg>
                  </span>
                  <input placeholder="City Location" className="ant-input ant-input-lg" type="text" value="Denver, Colorado"/>
                  <p className=""></p>
              </label>
          </div> */}
          <div className="ant-col ant-col-24 ant-col-xl-12" style={{paddingLeft: '9px', paddingRight: '9px'}}>
              <label>Brand
                  <input placeholder="Brand" type="text" className="ant-input ant-input-lg" value={brand} style={{width: '100%'}} onChange={e => handleChangeBrand(e.target.value)}/>
              </label>
          </div>
          {/* <div className="dDoLKG">
              <div className="ant-col ant-col-24" style={{paddingLeft: '9px', paddingRight: '9px'}}>
                  <p className="flex ai-c jc-sb semi-bold">Monitoring</p>
              </div>
              <div className="ant-col ant-col-24" style={{paddingLeft: '9px', paddingRight: '9px'}}>
                  <label className="switch">
                      <button type="button" role="switch" aria-checked="true" className="ant-switch ant-switch-checked">
                          <span className="ant-switch-inner"></span>
                      </button>
                      Stock Monitoring
                  </label>
                  <span className="question-mark-icn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                      </svg>
                  </span>
              </div>
              <div className="ant-col ant-col-24" style={{paddingLeft: '9px', paddingRight: '9px'}}>
                  <label className="switch">
                      <button type="button" role="switch" aria-checked="true" className="ant-switch ant-switch-checked">
                          <span className="ant-switch-inner"></span>
                      </button>
                      Price Monitoring
                  </label>
                  <span className="question-mark-icn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                      </svg>
                  </span>
              </div>
              <div className="ant-col ant-col-24" style={{paddingLeft: '9px', paddingRight: '9px'}}>
                  <label className="switch">
                      <button type="button" role="switch" aria-checked="true" className="ant-switch ant-switch-checked">
                          <span className="ant-switch-inner"></span>
                      </button>
                      Auto Order
                  </label>
                  <span className="question-mark-icn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM4.27394 6.07612V6.17317H5.39941V6.07612C5.40337 5.79829 5.45979 5.58135 5.56867 5.42531C5.67756 5.26927 5.8488 5.12369 6.08241 4.98858C6.35956 4.83064 6.58129 4.64034 6.74759 4.4177C6.91586 4.19505 7 3.91627 7 3.58135C7 3.24833 6.91388 2.96384 6.74165 2.72788C6.56941 2.49191 6.33185 2.31208 6.02895 2.18839C5.72606 2.0628 5.37763 2 4.98367 2C4.62534 2 4.2977 2.06089 4.00074 2.18268C3.70379 2.30447 3.46523 2.49001 3.28508 2.7393C3.10492 2.98858 3.0099 3.30352 3 3.68411H4.21158C4.22148 3.45195 4.30265 3.27498 4.45509 3.15319C4.6095 3.0314 4.78372 2.9705 4.97773 2.9705C5.17768 2.9705 5.34793 3.03045 5.48849 3.15033C5.63103 3.26832 5.7023 3.42626 5.7023 3.62417C5.7023 3.81066 5.63994 3.9705 5.51522 4.10371C5.3905 4.23501 5.23707 4.3568 5.05494 4.46908C4.88864 4.56993 4.74709 4.68126 4.63029 4.80304C4.51547 4.92293 4.42737 5.08183 4.366 5.27973C4.30661 5.47764 4.27592 5.7431 4.27394 6.07612ZM4.35412 7.80019C4.49468 7.9334 4.66295 8 4.85895 8C5.049 8 5.2143 7.9334 5.35486 7.80019C5.4974 7.66698 5.56966 7.50523 5.57164 7.31494C5.56966 7.12845 5.4974 6.9686 5.35486 6.83539C5.2143 6.70219 5.049 6.63558 4.85895 6.63558C4.66295 6.63558 4.49468 6.70219 4.35412 6.83539C4.21356 6.9686 4.14427 7.12845 4.14625 7.31494C4.14427 7.50523 4.21356 7.66698 4.35412 7.80019Z" fill="white"></path>
                      </svg>
                  </span>
              </div>
          </div> */}
      </div>
    </div>
  )
}
