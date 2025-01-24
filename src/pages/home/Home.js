import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css';

import Navbar from '../../components/navbar/Navbar';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
      };

    return (
        <>
        <Navbar />

        <div className={styles['systemlab-menu']}>
           
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
        </>
    );
};

export default Home;