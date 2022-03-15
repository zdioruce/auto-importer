import styles from './DraftDeleteModal.module.scss'
import ParentModal from './ParentModal'
import LargeButton from '@components/Button/LargeButton'
import LargeLinkButton from '@components/Button/LargeLinkButton'

export default function DraftDeleteModal({handleCancel, handleOK, count}) {
    return (
        <ParentModal
            handleClose={handleCancel}
        >
            <div className={styles.iMpmEY}>
                <h2>{count > 1? `Delete ${count} Drafts`: 'Delete A Draft'}</h2>
                <p className="semi-bold">You are about to delete {count > 1? count + ' drafts': 'a draft'}. Are you sure you want to Continue?</p>
                <div>
                <LargeLinkButton
                    title={'No, Cancel'}
                    onClick={handleCancel}                    
                />
                <LargeButton
                    title={'Yes, I’m Sure'}
                    onClick={handleOK}
                />
                </div>
            </div>
        </ParentModal>        
    )
}
