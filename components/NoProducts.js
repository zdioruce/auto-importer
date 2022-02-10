import styles from './NoProducts.module.scss'

export default function NoProducts({}) {
  return (
    <div height="420" className={styles.iEWzQZ}>
      <div className={styles.gwIBEu}>
        <div className={styles.hpZlJk}>
          <div className={styles.bMbqPw}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="add-product-icn">
              <path fillRule="evenodd" clipRule="evenodd" d="M24.1144 3.82104L42 12.7639V26H38V16.8859L33.9998 18.386V23L29.9998 24V19.886L26 21.3859V36.9419L30 35.1919V39.558L23.9434 42.2077L6 33.236V10.6139L24.1144 3.82104ZM10 15.236L22 21.236V36.7639L10 30.7639V15.236ZM35.0033 13.7377L32.1436 14.8101L21.4339 9.09824L23.8856 8.17882L35.0033 13.7377ZM12.9966 12.2622L16.443 10.9698L27.1528 16.6816L24.1144 17.821L12.9966 12.2622Z" fill="#CACACA"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M39 29C38.4477 29 38 29.4477 38 30V34H34C33.4477 34 33 34.4477 33 35V37C33 37.5523 33.4477 38 34 38H38V42C38 42.5523 38.4477 43 39 43H41C41.5523 43 42 42.5523 42 42V38H46C46.5523 38 47 37.5523 47 37V35C47 34.4477 46.5523 34 46 34H42V30C42 29.4477 41.5523 29 41 29H39Z" fill="#EA8C1F"></path>
            </svg>
          </div>
          <h3>You don&apos;t have any products yet...</h3>
          {/* <p>Save time and start your first upload here!</p>
          <button type="button" className="ant-btn ant-btn-primary ant-btn-lg" ant-click-animating-without-extra-node="false">
            <span>Add Products</span>
          </button> */}
        </div>
      </div>
    </div>  
  )
}
