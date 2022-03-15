export default function Tab(props) {

  const { refTab, tab, currentTab, onClick, title }= props

  return (
    <div
      ref={refTab} 
      role="tab" 
      aria-selected={tab == currentTab} 
      className={tab == currentTab? 'ant-tabs-tab-active ant-tabs-tab': 'ant-tabs-tab'} 
      style={{marginRight: 0}} 
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  )
}
