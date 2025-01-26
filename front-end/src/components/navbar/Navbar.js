import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import styles from './Navbar.module.css';
import Logo from '../../assets/Systemlab-logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className={styles['navbar-container']}>
            {/* Logo with navigation to home */}
            <img
                src={Logo}
                alt="SystemLab Web Logo"
                className={styles['navbar-logo']}
                onClick={() => handleNavigate('/home')}
            />
            
            {/* Navigation Section */}
            <nav className={styles['navbar-nav']}>
                <ul className={styles['navbar-list']}>
                    <li className={styles['navbar-item']}>
                        <span
                            className={styles['navbar-link']}
                            onClick={() => handleNavigate('/atendimentos')}
                        >
                            Atendimentos
                        </span>
                    </li>
                    <li className={styles['navbar-item']}>
                        <span
                            className={styles['navbar-link']}
                            onClick={() => handleNavigate('/exames')}
                        >
                            Exames
                        </span>
                    </li>
                    <li className={styles['navbar-item']}>
                        <span
                            className={styles['navbar-link']}
                            onClick={() => handleNavigate('/relatorios')}
                        >
                            Relatórios
                        </span>
                    </li>
                    <li className={styles['navbar-item']}>
                        <span
                            className={styles['navbar-link']}
                            onClick={() => handleNavigate('/')}
                        >
                            Sair
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;