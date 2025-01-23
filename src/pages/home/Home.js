import React from 'react';

import styles from './Home.css';
import Logo from '../../assets/Systemlab-logo.png'


const Home = () => {
    return (
        <div className="systemlab-menu">
            <img src={Logo} alt='SystemLab Web Logo' />
            <header>
                <a href="/home">
                </a>
                <nav>
                    <ul>
                        <li>
                            <a href="/cadpac">Cadastrar Pacientes</a>
                        </li>
                        <li>
                            <a href="/cadexam">Cadastrar Exames</a>
                        </li>
                        <li>
                            <a href="/reports">Gerar Relatório</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <br />
            <br />
            <section id="cadastrar-pacientes">
                <a href="/cadpac">
                    <h2>Cadastrar Pacientes</h2>
                </a>
            </section>

            <section id="cadastrar-exames">
                <a href="/cadexam">
                    <h2>Cadastrar Exames</h2>
                </a>
            </section>

            <section id="gerar-relatorio">
                <a href="/reports">
                    <h2>Gerar Relatório</h2>
                </a>
            </section>

            <footer>
                <p>©2025 SystemLab Web</p>
            </footer>
        </div>
    );
};

export default Home;