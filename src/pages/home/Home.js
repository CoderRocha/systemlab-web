import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
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
            <div className={styles['home-container']}>
                <section className={styles['home-section']}>
                    <a href="/cadpac">
                        <h2>Atendimentos</h2>
                    </a>
                </section>

                <section className={styles['home-section']}>
                    <a href="/cadexam">
                        <h2>Exames</h2>
                    </a>
                </section>

                <section className={styles['home-section']}>
                    <a href="/reports">
                        <h2>Relatório</h2>
                    </a>
                </section>
                <section className={styles['home-section']}>
                    <a href="/">
                        <h2>Sair</h2>
                    </a>
                </section>
            </div>
        </>
    );
};

export default Home;