import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './Login.module.css'
import Logo from '../../assets/Systemlab-logo.png'

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home');
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <img src={Logo} alt='SystemLab Web Logo' />
            <h2>Bem vindo!</h2>
            <label>
                <span>Usuário</span>
                <input
                    type="text"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                />
            </label>
            <label>
                <span>Senha</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button className="btn">Entrar</button>
        </form>
    )
}

export default Login;