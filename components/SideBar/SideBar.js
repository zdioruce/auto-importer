import styles from './SideBar.module.scss'
import SideBarMenuItem from './SideBarMenuItem'
import PlusIcon from '@assets/PlusIcon'
import { connect } from "react-redux"
import { showAddProductsMenu, removeAllSelect } from "@redux/actions/menu"
import { setMenu, getStores } from "@redux/actions/main"
import { useEffect } from 'react';
import { showStoreListModal } from "@redux/actions/modal"
import StoreEditIItem from './StoreEditIItem';

function SideBar(props) {

  const {
    setMenu,
    showAddProductsMenu,
    removeAllSelect,
    showStoreListModal,
    getStores
  } = props

  const { 
    allDraftIds 
  } = props.product

  const {
    addProductsMenu,       
  } = props.menu

  const {
    menu,
    stores
  } = props.main

  useEffect(() => {
    setMenu(localStorage.getItem('menu'))
    getStores()
  }, [setMenu, getStores])

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
      <StoreEditIItem
        title={stores.length > 0? stores.find(item => item.status == 1).name: ''}
        onClick={() => showStoreListModal(true)}
      />
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
            title={`Drafts (${allDraftIds.length})`}
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
  removeAllSelect,
  showStoreListModal,
  getStores
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)