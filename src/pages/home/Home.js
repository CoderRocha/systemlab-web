import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css';
import Logo from '../../assets/Systemlab-logo.png'

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
      };

    return (

        <div className={styles['systemlab-menu']}>
            <img
            src={Logo}
            alt='SystemLab Web Logo'
            onClick={handleClick}
            />
            <header>
                <a href="/home">
                </a>
                <nav>
                    <ul>
                        <li>
                            <a href="/cadpac">Atendimentos</a>
                        </li>
                        <li>
                            <a href="/cadexam">Exames</a>
                        </li>
                        <li>
                            <a href="/reports">Geral</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <br />
            <br />
            <section>
                <a href="/cadpac">
                    <h2>Atendimentos</h2>
                </a>
            </section>

            <section id="cadastrar-exames">
                <a href="/cadexam">
                    <h2>Exames</h2>
                </a>
            </section>

            <section id="gerar-relatorio">
                <a href="/reports">
                    <h2>Relatório</h2>
                </a>
            </section>
        </div>
    );
};

export default Home;