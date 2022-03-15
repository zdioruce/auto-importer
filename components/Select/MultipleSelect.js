import React from "react"
import DownArrowIcon from "@assets/DownArrowIcon"
import CloseIcon from "@assets/CloseIcon"

const MultipleSelect = (props, ref) => {

  const { placeholder, expand, handleExpand, values, handleDelete } = props

  return (
    <div 
      className={expand? "ant-select-lg ant-select-show-arrow multiple-select ant-select ant-select-open ant-select-focused ant-select-enabled": "ant-select-lg ant-select-show-arrow multiple-select ant-select ant-select-enabled"}
      ref={ref}
      onClick={handleExpand}>
      <div 
        className="ant-select-selection ant-select-selection--multiple" 
        role="combobox" 
        aria-autocomplete="list" 
        aria-haspopup="true" 
        aria-controls="7c942aa6-e7a8-4199-f752-1b4f96cb904b" 
        aria-expanded={expand}>
        <div className="ant-select-selection__rendered">
          <div unselectable="on" className="ant-select-selection__placeholder" style={{display: 'none', userSelect: 'none'}}>{placeholder}</div>
          <ul>
            {
              values.map((value, index) => (
                <li 
                  key={index}
                  unselectable="on" 
                  className="ant-select-selection__choice" 
                  role="presentation" 
                  title={value} 
                  style={{userSelect: 'none'}}
                >
                  <div className="ant-select-selection__choice__content">{value}</div>
                  <span className="ant-select-selection__choice__remove" onClick={() => handleDelete(value)}>
                    <i aria-label="icon: close" className="anticon anticon-close ant-select-remove-icon">
                      <CloseIcon/>
                    </i>
                  </span>
                </li>  
              ))
            }
          </ul>
        </div>   
        <span 
          className="ant-select-arrow" 
          unselectable="on" 
          style={{userSelect: 'none'}}
          onClick={handleExpand}>
          <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
            <DownArrowIcon/>
          </i>
        </span>                
      </div>
    </div>
  )
}

export default React.forwardRef(MultipleSelect);
