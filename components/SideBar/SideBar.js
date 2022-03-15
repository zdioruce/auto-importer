import styles from './SideBar.module.scss'
import SideBarMenuItem from './SideBarMenuItem'
import PlusIcon from '@assets/PlusIcon'
import { connect } from "react-redux"
import { showAddProductsMenu, removeAllSelect } from "@redux/actions/menu"
import { setMenu } from "@redux/actions/main"
import { useEffect } from 'react';

function SideBar(props) {

  const {
    setMenu,
    showAddProductsMenu,
    removeAllSelect
  } = props

  const {draftCount} = props.product
  const {
    addProductsMenu    
  } = props.menu
  const {menu} = props.main

  useEffect(() => {
    setMenu(localStorage.getItem('menu'))
  }, [setMenu])

  const handleClickMenu = (index) => {
    removeAllSelect()
    setMenu(index)
  }

  return (
    <div className={styles.kyBGgY}>
      <div className={styles.edONPB}></div>
      <div className={styles.fhoual}>
        <div className={`${styles['ant-dropdown-trigger']} flex jc-c ai-c`}>
          <span>Auto Importer</span>
        </div>
      </div>
      <div className={styles.ggSlQC}>
        <div>
          <div className={styles.hmjpfq}>    
            <button 
              className={`${styles['btn1']} ${styles['ant-dropdown-trigger']} btn`} 
              onClick={() => showAddProductsMenu(!addProductsMenu)}
            >
              <PlusIcon/>
              <span>Add Products</span>
            </button>
          </div>
          <SideBarMenuItem
            title="Dashboard"
            icon={0}
            active={menu == 0}
            href="/"
            handleMenu={() => handleClickMenu(0)}
          />
          <SideBarMenuItem
            title="Products"
            icon={1}
            active={menu == 1 || menu == 4}
            href="/products"
            handleMenu={() => handleClickMenu(1)}
          />
          <SideBarMenuItem
            title={`Drafts (${draftCount})`}
            icon={2}
            active={menu == 2}
            href="/drafts"
            handleMenu={() => handleClickMenu(2)}
          />
        </div>
        <div>
          <SideBarMenuItem
            title={`Settings`}
            icon={3}
            active={menu == 3}
            href="/settings"
            handleMenu={() => handleClickMenu(3)}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  main: state.main,
  menu: state.menu,
  product: state.product,
  modal: state.modal
})

const mapDispatchToProps = {
  setMenu,
  showAddProductsMenu,
  removeAllSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)