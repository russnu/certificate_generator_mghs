import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';

import styles from './ConfirmationModal.module.css';


function ConfirmationModal({modalShow, setModalShow, onConfirm}){

    Modal.setAppElement('#root');

    function closeModal() {

        setModalShow(false);
    }

    //=========================================================================================================//  
    return(
        <>
            <div>
                <Modal
                    isOpen={modalShow}
                    onRequestClose={closeModal}
                    className={styles.modalContainer}
                    overlayClassName={styles.modalOverlay}
                    contentLabel="Confirmation"
                >
                    <div className={styles.modalContentContainer}>
                        <h2>Confirm Logout</h2>
                        <p>Are you sure you want to log out?</p>
                        <div className={styles.buttonGroup}>
                            <button onClick={onConfirm} className={styles.confirmButton}>Yes, Log Out</button>
                            <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
            
        </>
    
    );
}

export default ConfirmationModal