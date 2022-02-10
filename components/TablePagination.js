import styles from './TablePagination.module.scss'

export default function TablePagination({}) {
  return (
    <div className={styles.dGGvnC} style={{}}>
      <ul className="ant-pagination" unselectable="unselectable">
        <li title="Previous Page" className="ant-pagination-disabled ant-pagination-prev" aria-disabled="true">
          <a className="ant-pagination-item-link">
            <i aria-label="icon: left" className="anticon anticon-left">
              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
              </svg>
            </i>
          </a>
        </li>
        <li title="1" className="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active" tabIndex="0">
          <a>1</a>
        </li>
        <li title="2" className="ant-pagination-item ant-pagination-item-2" tabIndex="0">
          <a>2</a>
        </li>
        <li title="3" className="ant-pagination-item ant-pagination-item-3" tabIndex="0">
          <a>3</a>
        </li>
        <li title="Next Page" tabIndex="0" className=" ant-pagination-next" aria-disabled="false">
          <a className="ant-pagination-item-link">
            <i aria-label="icon: right" className="anticon anticon-right">
              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
              </svg>
            </i>
          </a>
        </li>
      </ul>
      <div className="inline-dropdown">
        <p>Show</p>
        <div className="dark-select ant-select ant-select-enabled">
          <div className="ant-select-selection ant-select-selection--single" role="combobox" autoComplete="list" aria-haspopup="true" aria-controls="330b3eee-027c-4b5b-9dbd-e5a96ff9547d" aria-expanded="false" tabIndex="0">
            <div className="ant-select-selection__rendered">
              <div className="ant-select-selection-selected-value" title="" style={{display: 'block', opacity: 1}}>20</div>
            </div>
            <span className="ant-select-arrow" unselectable="on" style={{userSelect: 'none'}}>
              <i aria-label="icon: down" className="anticon anticon-down ant-select-arrow-icon">
                <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </i>
            </span>
          </div>
        </div>
        <p>Drafts out of 48</p>
      </div>
    </div>      
  )
}
