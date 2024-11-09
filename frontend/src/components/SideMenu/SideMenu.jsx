import React, { useState } from 'react';
import styles from './SideMenu.module.css'
import { NavLink,Link } from "react-router-dom";
import {useAuth} from '../Auth/AuthContext'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

import { BsHouse, BsPrinter, BsPatchCheck, BsFileEarmarkText , BsGear, BsBoxArrowRight, BsPeople  } from "react-icons/bs";
import { IconContext } from 'react-icons';

function SideMenu(){

    const { logout, user } = useAuth();
    const [modalShow, setModalShow] = useState(false);

    const handleLogout = async() => {
        await logout();
        setModalShow(false);
    }
    return(
        <div className={styles.navContainer}>
            <nav className={styles.sideNav}>
            <IconContext.Provider value={{size: '20px'}}>
                <NavLink to={'/'} className={({ isActive }) => isActive ? styles.active : styles.text} ><BsHouse />Dashboard</ NavLink>
                <NavLink to={'/generate'} className={({ isActive }) => isActive ? styles.active : styles.text}><BsPrinter />Generate</NavLink>
                <NavLink to={'/verify'} className={({ isActive }) => isActive ? styles.active : styles.text}><BsPatchCheck />Verify</NavLink>
                <NavLink to={'/certificates'} className={({ isActive }) => isActive ? styles.active : styles.text}><BsFileEarmarkText  />Certificates</NavLink>
                {user?.role === 'admin' && <NavLink to={'/settings'} className={({ isActive }) => isActive ? styles.active : styles.text}><BsGear />Settings</NavLink>}
                {user?.role === 'admin' && <NavLink to={'/users'} className={({ isActive }) => isActive ? styles.active : styles.text}><BsPeople  />Users</NavLink>}
                <span onClick={() => setModalShow(true)} className={`${styles.text} ${styles.lastItem}`} style={{ cursor: 'pointer' }}><BsBoxArrowRight />Log Out</span>
            </IconContext.Provider>
            </nav>
            <ConfirmationModal modalShow = {modalShow} setModalShow = {setModalShow} onConfirm = {handleLogout}  />
        </div>
    );
}

export default SideMenu