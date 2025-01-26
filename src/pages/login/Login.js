import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './Login.module.css'
import Logo from '../../assets/Systemlab-logo.png'

//pages & components
import Footer from '../../components/footer/Footer';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home');
    }

    return (
        <>
            <div className={styles['login-container']}>
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    <img src={Logo} alt='SystemLab Web Logo' />
                    <h2>Bem vindo!</h2>
                    <label>
                        <input
                            type="text"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            placeholder="Usuário"
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Senha"
                        />
                    </label>
                    <button className={styles['btn']}>Entrar</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;