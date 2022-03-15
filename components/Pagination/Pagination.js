import styles from './Pagination.module.scss'
import LeftArrowIcon from '@assets/LeftArrowIcon'
import RightArrowIcon from '@assets/RightArrowIcon'
import DownArrowIcon from '@assets/DownArrowIcon'
import React, { useState } from "react"

export default function Pagination({show, total, page, handlePage, handleShow}) {

  const [showDropDown, setShowDropDown] = useState(false)

  let pages = Math.ceil(total / show)
  
  var items = [];
  for (var i = 0; i < pages; i++) {
    if(i == page)
      items.push(<li 
                  key={i}
                  title={i+1} 
                  className={`ant-pagination-item ant-pagination-item-active ${styles['ant-pagination-item-active']}`} 
                  tabIndex="0"
                  onClick={() => handlePage(i)}
                >
                  <a>{i+1}</a>
                </li>);
    else
      items.push(<li 
                  key={i}
                  title={i+1} 
                  className={`ant-pagination-item ${styles['ant-pagination-item']}`} 
                  tabIndex="0"
                  onClick={() => handlePage(i)}
                >
                  <a>{i+1}</a>
                </li>);
  }

  return (
    <div className={styles.dGGvnC} style={{}}>
      {
        total > show &&
        <ul 
          className={`ant-pagination ${styles['ant-pagination']}`} 
          unselectable="unselectable"
        >
          <li 
            title="Previous Page" 
            className={(page == 0?"ant-pagination-disabled":"") + " ant-pagination-prev " + styles['ant-pagination-prev']}
            onClick={() => handlePage(page > 0? page - 1: page)}
          >
            <a className="ant-pagination-item-link">
              <i 
                aria-label="icon: left" 
                className="anticon anticon-left"
              >
                <LeftArrowIcon/>
              </i>
            </a>
          </li>
          {
            items
          }        
          <li 
            title="Next Page" 
            tabIndex="0" 
            className={(page == pages - 1? "ant-pagination-disabled":"") + " ant-pagination-next " + styles['ant-pagination-next']}
            onClick={() => handlePage(page < pages - 1? page + 1: page)}
          >
            <a className="ant-pagination-item-link">
              <i 
                aria-label="icon: right" 
                className="anticon anticon-right"
              >
                <RightArrowIcon/>
              </i>
            </a>
          </li>
        </ul>
      }
      <div className="inline-dropdown">
        <p>Show</p>
        <div className={showDropDown? "dark-select ant-select ant-select-open ant-select-enabled": "dark-select ant-select ant-select-enabled"}>
          <div 
            className="ant-select-selection ant-select-selection--single" 
            role="combobox" 
            autoComplete="list" 
            aria-haspopup="true" 
            aria-controls="330b3eee-027c-4b5b-9dbd-e5a96ff9547d" 
            aria-expanded={showDropDown}
            tabIndex="0"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <div className="ant-select-selection__rendered">
              <div className="ant-select-selection-selected-value" title="" style={{display: 'block', opacity: 1}}>{show}</div>
            </div>
            <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
              <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                <DownArrowIcon/>
              </i>
            </span>
          </div>
        </div>
        <p>Drafts out of {total}</p>
      </div>
    </div>
  )
}
