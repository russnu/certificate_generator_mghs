import React, { useState } from 'react';
import styles from './GenerateForm.module.css'

function GenerateButtons() {

    return (
        <div className = {styles.generateButtonsContainer}>
            <button className = {styles.generateButton} type="submit"> Generate</button>
            <button className = {styles.cancelButton} type="reset">Cancel</button>
        </div>
    )
}

export default GenerateButtons;