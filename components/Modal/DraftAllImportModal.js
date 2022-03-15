import styles from './DraftAllImportModal.module.scss'
import ParentModal from './ParentModal'
import LargeButton from '@components/Button/LargeButton'
import LargeLinkButton from '@components/Button/LargeLinkButton'

export default function DraftAllImportModal({handleCancel, handleOK, count}) {
  return (
    <ParentModal
      handleClose={handleCancel}
    >
      <div className={styles.iMpmEY}>
        <h2>{count > 1? `Import ${count} Drafts`: 'Import Draft'}</h2>
        <p className="semi-bold">
          You are about to import {count > 1? count + ' drafts': 'a draft'}. Are you sure you want to Continue?
        </p>
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
