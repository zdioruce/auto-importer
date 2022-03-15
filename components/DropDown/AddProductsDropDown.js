import styles from './AddProductsDropDown.module.scss'
import SingleProductIcon from '@assets/SingleProductIcon'
import MultipleProductsIcon from '@assets/MultipleProductsIcon'
import AddProductsDropDownMenuItem from './AddProductsDropDownMenuItem'

export default function AddProductsDropDown({handleMenu}) {
    return (
        <div className='ant-dropdown ant-dropdown-placement-bottomLeft' style={{position: "absolute", left: 20, top: 126}}>
            <ul className='ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical'>
                <AddProductsDropDownMenuItem
                    icon={<SingleProductIcon/>}
                    title={'Single Product'}
                    description={'Import one product'}
                    handleMenu={() => handleMenu(1)}                    
                />
                <AddProductsDropDownMenuItem
                    icon={<MultipleProductsIcon/>}
                    title={'Multiple Products'}
                    description={'Import multiple products together'}
                    handleMenu={() => handleMenu(2)}                    
                />                
            </ul>
        </div>
    )
}
