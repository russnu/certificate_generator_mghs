import styles from './Header.module.css'
import Logo from '../Logo/Logo.jsx';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';

function Header(){
    return(
    <header className={styles.header}>
        <div className={styles.container}>
            <Logo/>
            <ProfileMenu/>
        </div>
    </header>
    );
}

export default Header