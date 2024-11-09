import logo from '../../assets/mghs_logo.jpg'
import styles from './Logo.module.css'

function Logo(){
    return(
        <>
            <div className={styles.logoContainer}>
                <div className={styles.logoItem}>
                    <img src={logo} alt="sample logo"></img>
                </div>
                <div>
                    <h1>MGHS Services</h1>    
                </div>
            </div>
            
        </>
    
    );
}

export default Logo