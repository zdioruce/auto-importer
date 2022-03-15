import styles from './ProductDeleteModal.module.scss'
import React, { useState } from "react"
import ParentModal from './ParentModal'
import LargeButton from '@components/Button/LargeButton'
import LargeLinkButton from '@components/Button/LargeLinkButton'
import Radio from '@components/Input/Radio'

export default function ProductDeleteModal({handleClose, handleDelete, count}) {

    const [option, setOption] = useState(1)

    return (
        <ParentModal
            handleClose={handleClose}
        >
            <div className={styles.eGrwdU}>
                <h2>Confirm delete ({count > 1? count + ' products': 'A Product'})</h2>
                <p>What would you like to do with {count > 1? count + ' products': 'a product'}</p>
                <div className="ant-radio-group ant-radio-group-outline">
                    <Radio
                        title={'Delete only from Auto Importer'}
                        currentValue={option}
                        value={0}
                        onChange={() => setOption(0)}
                    />
                    <Radio
                        title={'Delete from Auto Importer and Selling Platform'}
                        currentValue={option}
                        value={1}
                        onChange={() => setOption(1)}
                    />
                </div>
                <div className="ant-divider ant-divider-horizontal" role="separator"></div>
                <div className="flex jc-sb">
                    <LargeLinkButton
                        title={'No, Cancel'}
                        onClick={handleClose}                    
                    />
                    <LargeButton
                        title={'Delete'}
                        onClick={() => handleDelete(option)}
                    />                    
                </div>
            </div>
        </ParentModal>        
    )
}
