export default function ProductImportDropDown({handleMenu}) {
  return (
    <div style={{position: 'absolute', top: '0px', left: '0px', width: '100%'}}>
      <div>
        <div className="ant-dropdown ant-dropdown-placement-topRight" style={{left: '722px', top: '441px'}}>
          <ul className="ant-dropdown-menu dropdown-button ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical" role="menu" tabIndex="0">
            <li className="ant-dropdown-menu-item" role="menuitem">
              <span>Edit Now(Quick)</span>
              <p>Edit the item right now (faster processing time)</p>
            </li>
            <li className="ant-dropdown-menu-item" role="menuitem">
              <span>Publish to Store</span>
              <p>The item will be published to your store</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
