export default function TabPanel(props) {

  const { tab, currentTab, children }= props

  return (
    <div 
      role="tabpanel" 
      aria-hidden={tab == currentTab? false: true} 
      className={tab == currentTab? 'ant-tabs-tabpane ant-tabs-tabpane-active': 'ant-tabs-tabpane ant-tabs-tabpane-inactive'}
    >
      {children}
    </div>
  )
}
