import styles from './AddProductsDropDown.module.scss'

export default function AddProductsDropDown({show, handleMenu}) {
    return show ? (
        <div style={{position: "absolute", top: "0px", left: "0px", width: "100%"}}>
            <div>
                <div className='ant-dropdown ant-dropdown-placement-bottomLeft' style={{position: "absolute", left: "20px", top: "146px"}}>
                    <ul className='ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical'>
                        <li className='ant-dropdown-menu-item' onClick={() => handleMenu(1)}>
                            <div className={styles.bxZhDT}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21 7.38193L12.0572 2.91052L3 6.30697V17.618L11.9717 22.1039L21 18.154V7.38193ZM11 11.618L5 8.618V16.3819L11 19.3819V11.618ZM19 16.846L13 19.471V11.693L14.9999 10.943V13L16.9999 12.5V10.193L19 9.44297V16.846ZM16.0718 8.40504L17.5017 7.86884L11.9428 5.08941L10.7169 5.54912L16.0718 8.40504ZM8.22152 6.4849L6.49833 7.13109L12.0572 9.91052L13.5764 9.34082L8.22152 6.4849Z" fill="#B7B7B7"></path>
                                </svg>
                                <div>
                                    <p className='fz-15 bold'>Single Product</p>
                                    <p>Import one product</p>
                                </div>
                            </div>
                        </li>
                        <li className='ant-dropdown-menu-item' onClick={() => handleMenu(2)}>
                            <div className={styles.bxZhDT}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.542 5.505L12.532 3L7.45789 4.90278V11.0733L2.97607 12.754V19.0908L8.00227 21.6039L12.7829 19.5124L16.9659 21.6039L22.0238 19.391V13.3563L17.542 11.1153V5.505ZM11.9397 7.87816L8.57834 6.19748V10.547L11.9397 12.2277V7.87816ZM16.4215 10.807L13.0602 12.2776V7.92016L14.1805 7.50002V8.6524L15.301 8.37228V7.07985L16.4215 6.65965V10.807ZM14.7811 6.07818L15.5821 5.77778L12.4679 4.22067L11.7811 4.47821L14.7811 6.07818ZM10.3831 5.00246L9.41775 5.36448L12.532 6.92159L13.3831 6.60243L10.3831 5.00246ZM13.0602 18.3983V14.0487L16.4215 15.7294V20.079L13.0602 18.3983ZM11.9397 14.5109V18.6582L8.57834 20.1288V15.7714L9.6988 15.3512V16.5038L10.8193 16.2236V14.9311L11.9397 14.5109ZM7.45789 15.7294L4.09653 14.0487V18.3983L7.45789 20.079V15.7294ZM10.2992 13.9295L11.1003 13.629L7.98608 12.0719L7.29921 12.3295L10.2992 13.9295ZM5.90122 12.8537L4.93593 13.2157L8.05015 14.7728L8.90115 14.4537L5.90122 12.8537ZM20.9033 18.6582L17.542 20.1288V15.7714L18.6624 15.3512V16.5038L19.7829 16.2236V14.9311L20.9033 14.5109V18.6582ZM19.2628 13.9295L20.0639 13.629L16.9497 12.0719L16.2628 12.3295L19.2628 13.9295ZM14.8649 12.8537L13.8996 13.2157L17.0138 14.7728L17.8648 14.4537L14.8649 12.8537Z" fill="#B7B7B7"></path>
                                </svg>
                                <div>
                                    <p className='fz-15 bold'>Multiple Products</p>
                                    <p>Import multiple products together</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) : null
}
