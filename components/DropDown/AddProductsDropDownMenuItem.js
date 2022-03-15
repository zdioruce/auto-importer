import styles from './AddProductsDropDownMenuItem.module.scss'

export default function AddProductsDropDownMenuItem({icon, title, description, handleMenu}) {
    return (
        <li 
            className='ant-dropdown-menu-item' 
            onClick={handleMenu}
        >
            <div className={styles.bxZhDT}>
                {icon}
                <div>
                    <p className='fz-15 bold'>{title}</p>
                    <p>{description}</p>
                </div>
            </div>
        </li>
    )
}
