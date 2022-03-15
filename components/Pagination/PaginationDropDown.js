export default function PaginationDropDown({show}) {

  return (
    <div>
      <div 
        className={show?"ant-select-dropdown supplier-source-dropdown dropdown-auto-width ant-select-dropdown--single ant-select-dropdown-placement-topLeft  ant-select-dropdown-hidden":"ant-select-dropdown supplier-source-dropdown dropdown-auto-width ant-select-dropdown--single ant-select-dropdown-placement-topLeft"} 
        style={{width: 52, left: 1188, top: 1071}}>
        <div style={{overflow: 'auto', transform: 'translateZ(0px)'}}>
          <ul role="listbox" className="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" tabIndex="0">
            <li 
              role="option" 
              unselectable="on" 
              className="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-active ant-select-dropdown-menu-item-selected" 
              aria-selected="true" style={{userSelect: 'none'}}
            >
              10
            </li>
            <li 
              role="option" 
              unselectable="on" 
              className="ant-select-dropdown-menu-item" 
              aria-selected="false" 
              style={{userSelect: 'none'}}
            >
              20
            </li>
          </ul>
        </div>
      </div>
    </div>  
  )
}
