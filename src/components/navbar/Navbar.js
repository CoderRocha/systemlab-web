import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import styles from './Navbar.module.css';
import Logo from '../../assets/Systemlab-logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <div className={styles['navbar-container']}>
            <img
                src={Logo}
                alt="SystemLab Web Logo"
                className={styles['navbar-logo']}
                onClick={handleClick}
            />
            
            {/* Navigation Section */}
            <nav className={styles['navbar-nav']}>
                <ul className={styles['navbar-list']}>
                    <li className={styles['navbar-item']}>
                        <a href="/atendimentos">Atendimentos</a>
                    </li>
                    <li className={styles['navbar-item']}>
                        <a href="/exames">Exames</a>
                    </li>
                    <li className={styles['navbar-item']}>
                        <a href="/relatorios">Relatório</a>
                    </li>
                    <li className={styles['navbar-item']}>
                        <a href="/">Sair</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;