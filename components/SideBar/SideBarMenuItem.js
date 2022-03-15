import styles from './SideBar.module.scss'
import Link from 'next/link'
import DashboardIcon from '@assets/DashboardIcon'
import ProductsIcon from '@assets/ProductsIcon'
import DraftsIcon from '@assets/DraftsIcon'
import SettingsIcon from '@assets/SettingsIcon'

export default function SideBarMenuItem({title, icon, active, href, handleMenu}) {  
  return (
    <Link href={href}>
      <a className={active ? styles.active:''} onClick={handleMenu}>
        {icon == 0 && <DashboardIcon className={styles['dashboard-icon']}/>}
        {icon == 1 && <ProductsIcon/>}
        {icon == 2 && <DraftsIcon/>}
        {icon == 3 && <SettingsIcon/>}
        <span>{title}</span>
      </a>
    </Link>    
  )
}
