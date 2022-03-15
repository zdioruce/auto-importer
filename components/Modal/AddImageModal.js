import styles from './AddImageModal.module.scss'
import React, { useState } from "react"
import ParentModal from './ParentModal'
import LargeButton from '@components/Button/LargeButton'

export default function AddImageModal() {
  const [imageUrl, setImageUrl] = useState('')

  return (
    <ParentModal      
    >
      <div className={styles.hUuBkO + " modal-form"}>
        <h2>Add Image</h2>
        <label>
          Image URL
          <div>
            <input 
              placeholder="Enter Image URL" 
              type="text" 
              className="ant-input ant-input-lg" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <LargeButton
              title={'Add Image'}
              onClick={() => {}}
            />                    
          </div>
        </label>
        <button 
          type="button" 
          className={`ant-btn ant-btn-link ${styles["ant-btn-link"]}`}
          onClick={() => {}}
        >
          <input 
            type="file" 
            accept=".png, .jpg, .jpeg"
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="upload-icon" fillRule="evenodd" clipRule="evenodd" d="M12.5 4C10.1171 4 8.16605 5.85278 8.01009 8.19563L7.92979 9.40193L6.75994 9.09684C6.51831 9.03382 6.26385 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15H9V17H6C3.23858 17 1 14.7614 1 12C1 9.23858 3.23858 7 6 7C6.058 7 6.1158 7.00099 6.17338 7.00296C6.8497 4.13444 9.42526 2 12.5 2C15.5989 2 18.1906 4.16804 18.8422 7.07062C21.2026 7.47099 23 9.52559 23 12C23 14.7614 20.7614 17 18 17H15V15H18C19.6569 15 21 13.6569 21 12C21 10.3436 19.6576 9.00073 18.0013 9L18 9L17.0639 9.00273L16.9816 8.0898C16.7751 5.79727 14.8469 4 12.5 4ZM12.7593 8.84921C12.5693 8.62756 12.2919 8.5 12 8.5C11.7081 8.5 11.4307 8.62756 11.2408 8.84921L8.24076 12.3492C7.88134 12.7685 7.9299 13.3998 8.34923 13.7593C8.76855 14.1187 9.39985 14.0701 9.75927 13.6508L11 12.2033V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V12.2033L14.2408 13.6508C14.6002 14.0701 15.2315 14.1187 15.6508 13.7593C16.0701 13.3998 16.1187 12.7685 15.7593 12.3492L12.7593 8.84921Z" fill="#EA8C1F"></path>
          </svg>
          <span>Upload image</span>
        </button>
      </div>
    </ParentModal>    
  )
}
