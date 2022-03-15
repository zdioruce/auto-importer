export default function SelectDropDown(props) {

  const { selectedValue, onClick } = props
  const { id, dataId, dataType, left, top, width, height, values, show } = props.item
  
  return (
    <div 
      className={show?"ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft": "ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft ant-select-dropdown-hidden"}
      style={{width: width, left: left, top: top + height}}>
      <div style={{overflow: 'auto', transform: 'translateZ(0px)'}}>
        <ul role="listbox" className="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" tabIndex="0">
          {
            values.map((element, index) => (
              <li 
                key={index}
                role="option" 
                unselectable="on" 
                className={element == selectedValue? "ant-select-dropdown-menu-item ant-select-dropdown-menu-item-selected":"ant-select-dropdown-menu-item"}
                aria-selected="true" 
                style={{userSelect: 'none'}}
                onClick={() => onClick(id, dataId, dataType, element)}>
                {element}
              </li>  
            ))
          }
        </ul>
      </div>
    </div>
  )
}


