import profilePic from '../../assets/sampleprofilepic.png'
import styles from './ProfileMenu.module.css'
import { BsPersonFillGear, BsPersonFillCheck  } from "react-icons/bs";

import {useAuth} from '../Auth/AuthContext'

function ProfileMenu(){

    const { user } = useAuth();
    return(
        <>
            <div className={styles.profileContainer}>
                <div>
                    {/* <img src={profilePic} alt="sample profile photo"></img> */}
                    {user?.role === 'admin' ? (
                                            <>
                                                <BsPersonFillGear style={{fontSize: '24px'}}/>
                                                <h2>Administrator</h2>
                                            </>
                                        ) : 
                                        (
                                            <>
                                                <BsPersonFillCheck  style={{fontSize: '24px'}}/>
                                                <h2>User</h2>
                                            </>
                                        )
                    }
                </div>
                <div className={styles.profileTextContainer}>
                    <h2>{user?.user_fullname}</h2>
                    <h2>{user?.user_email}</h2>
                </div>
            </div>
        </>
        
    );
}

export default ProfileMenu