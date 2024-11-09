import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';

import styles from './ConfirmationModal.module.css';


function DeleteConfirmation({deleteConfirmationShow, setDeleteConfirmationShow, userDetails, onConfirm}){

    Modal.setAppElement('#root');

    function closeModal() {
        setDeleteConfirmationShow(false);
    }

    
    //=========================================================================================================//  
    return(
        <>
            <div>
                <Modal
                    isOpen={deleteConfirmationShow}
                    onRequestClose={closeModal}
                    className={styles.modalContainer}
                    overlayClassName={styles.modalOverlay}
                    contentLabel="Confirmation"
                >
                    <div className={styles.modalContentContainer}>
                        
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete {userDetails.role == 'admin' ? "administrator" : "user"} <b>{userDetails.user_fullname}</b>?</p>
                        <div className={styles.buttonGroup}>
                            <button onClick={onConfirm} className={styles.confirmDeleteButton}>Delete</button>
                            <button onClick={closeModal} className={styles.cancelDeleteButton}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
            
        </>
    
    );
}

export default DeleteConfirmation