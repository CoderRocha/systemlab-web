import React from 'react';

//styles
import styles from './Home.module.css';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {

    return (
        <>
            <Navbar />
            <div className={styles['home-container']}>
                <section className={styles['home-section']}>
                    <a href="/atendimentos">
                        <h2>Atendimentos</h2>
                    </a>
                </section>

                <section className={styles['home-section']}>
                    <a href="/exames">
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