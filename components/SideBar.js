import styles from '../styles/SideBar.module.scss'
import SideBarMenuItem from './SideBarMenuItem'
import { useState, useCallback } from 'react';
import Image from 'next/image';

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
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Auto Importer</span>
      </div>
      <div className={styles.buttons}>
        <div>
          <div className={styles.add_products}>    
            <button className={styles.btn} onClick={handleAddProducts}>
              <Image src={"/plus.svg"} width={24} height={24}/>
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
