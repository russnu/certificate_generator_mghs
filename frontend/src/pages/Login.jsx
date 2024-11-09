import React, { useContext, useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext.jsx';
import styles from './Login.module.css'

import Logo from '../components/Logo/Logo.jsx';
import Wave1 from '../assets/Wave1.jsx'
import Wave2 from '../assets/Wave2.jsx'
import { BsExclamationCircle } from "react-icons/bs";

function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const { login, authError } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const result = await login(userEmail, userPassword);
        if (result.success) {
            navigate('/');
          } else {
            console.log('Login failed: ', result.message);
            console.log(authError);
          }
    }

  return (
    <>
        <div className={styles.parentContainer}>
            <div className= {styles.loginLogo}>
                <Logo />
            </div>
            <div className={styles.loginContainer}>
                <h1>Log In</h1>
                
                <form action="" onSubmit={handleSubmit}>
                    <div className={styles.loginFormContainer}>
                        <div>
                            <label htmlFor="user_email">Email</label>
                            <input type="email"
                                    id="user_email" 
                                    placeholder='Enter your email'
                                    value = {userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="user_password">Password</label>
                            <input type="password"
                                    id="user_password"
                                    placeholder='Enter your password'
                                    value = {userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    required
                            />
                        </div>

                        <div className={styles.loginButtonContainer}>
                            <button type='submit'>Log In</button>
                        </div>
                    </div>

                    
                </form>
                    {authError && <div className={styles.errorMessageContainer}><BsExclamationCircle style={{ fontSize: '20px' }} /><p className={styles.errorMessage}>{authError}</p></div>}
               
            </div>
            <div className={styles.waveContainer}>
                <Wave1 className={styles.wave1}/>
                <Wave2 className={styles.wave2}/>
            </div>
        </div>
    </>
  );
}

export default Login;