import styles from './SideBar.module.scss'
import SideBarMenuItem from './SideBarMenuItem'
import { useState, useCallback } from 'react';
import PlusIcon from '../public/plus.svg'

export default function SideBar({handleAddProducts}) {

  const [menu, setMenu] = useState(0)

  const handleMenu = useCallback((value) => {
    console.log(value)
    if(value == 0)
      setMenu(1)
    else if(value == 1)
      setMenu(2)
    else
      setMenu(3)
  }, []);

  return (
    <div className={styles.kyBGgY}>
      <div className={styles.fhoual}>
        <div className={styles['ant-dropdown-trigger'] + ' flex jc-c ai-c'}>
          <span>Auto Importer</span>
        </div>
      </div>
      <div className={styles.ggSlQC}>
        <div>
          <div className={styles.hmjpfq}>    
            <button className={styles['btn1'] + ' ' + styles['ant-dropdown-trigger'] + ' btn'} onClick={handleAddProducts}>
              <PlusIcon/>
              <span>Add Products</span>
            </button>
          </div>
          <SideBarMenuItem
            title="Dashboard"
            icon={0}
            active={menu == 1? true: false}
            href="/"
            handleMenu={() => handleMenu(0)}
          />
          <SideBarMenuItem
            title="Products"
            icon={1}
            active={menu == 2? true: false}
            href="/products"
            handleMenu={() => handleMenu(1)}
          />
          <SideBarMenuItem
            title="Drafts"
            icon={2}
            active={menu == 3? true: false}
            href="/drafts"
            handleMenu={() => handleMenu(2)}
          />
        </div>
      </div>
    </div>
  )
}
