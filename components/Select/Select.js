import React from "react"
import DownArrowIcon from "@assets/DownArrowIcon"

const Select = (props, ref) => {

  const { placeholder, expand, handleExpand, value } = props

  return (
    <div 
      className={expand? "ant-select-lg ant-select ant-select-open ant-select-focused ant-select-enabled": "ant-select-lg ant-select ant-select-enabled"}
      ref={ref}
      onClick={handleExpand}>
      <div className="ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="7db6a411-193c-4d51-cdb4-cc1b4829e8cf" aria-expanded="false" tabIndex="0">
        <div className="ant-select-selection__rendered">
          <div className="ant-select-selection-selected-value" title={value} style={{display: 'block', opacity: 1}}>{value}</div>
        </div>
        <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
          <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
            <DownArrowIcon/>
          </i>
        </span>
      </div>
    </div>  
  )
}

export default React.forwardRef(Select);