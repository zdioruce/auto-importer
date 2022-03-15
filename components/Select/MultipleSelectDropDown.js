export default function MultipleSelectDropDown(props) {

  const { selectedValues, onClick } = props
  const { dataId, dataType, left, top, width, height, values, show } = props.item

  return (
    <div 
      className={show?"ant-select-dropdown multiple-dropdown ant-select-dropdown--multiple ant-select-dropdown-placement-bottomLeft":"ant-select-dropdown multiple-dropdown ant-select-dropdown--multiple ant-select-dropdown-placement-bottomLeft ant-select-dropdown-hidden"}
      style={{width: width, left: left, top: top + height}}>
      <div style={{overflow: 'auto', transform: 'translateZ(0px)'}}>
        <ul role="listbox" className="ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" tabIndex="0">
          {
            values.map((value, index) => (
              <li 
                key={index}
                role="option" 
                unselectable="on" 
                className={selectedValues.includes(value)? "ant-select-dropdown-menu-item ant-select-dropdown-menu-item-selected":"ant-select-dropdown-menu-item"}
                aria-selected="false" 
                style={{userSelect: 'none'}}
                onClick={() => onClick(dataId, dataType, value)}
              >
                {value}
                <i aria-label="icon: check" className="anticon anticon-check ant-select-selected-icon">
                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </i>
              </li>   
            ))
          }
        </ul>
      </div>
    </div>
  )
}


