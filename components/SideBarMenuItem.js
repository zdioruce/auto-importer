import styles from '../styles/SideBarMenuItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import DashboardIcon from '../public/dashboard.svg'
import ProductsIcon from '../public/products.svg'
import DraftsIcon from '../public/drafts.svg'

export default function SideBarMenuItem({title, icon, active, href, handleMenu}) {  
  return (
    <Link href={href}>
      <a className={[active ? styles.container + " " + styles.active: styles.container]} onClick={handleMenu}>
        {icon == 0 && <DashboardIcon/>}
        {icon == 1 && <ProductsIcon/>}
        {icon == 2 && <DraftsIcon/>}
        <span>{title}</span>
      </a>
    </Link>    
  )
}
