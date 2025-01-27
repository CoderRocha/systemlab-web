import React, { useState } from 'react';
import axios from 'axios';

// styles
import styles from './Relatorios.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchRelatorios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/relatorios`);
      setRelatorios(response.data);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchRelatorios();  // Refaz a busca de relatórios quando o botão for clicado
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={handleClick}>
          Gerar Relatório
        </button>
        <div className={styles.listContainer}>
          <h2>Relatório de Pacientes por Data (Geral)</h2>
          {loading ? (
            <p>Carregando relatórios...</p>
          ) : relatorios.length === 0 ? (
            <p>Não há relatórios disponíveis.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data de Cadastro</th>
                  <th>Código do Paciente</th>
                  <th>Nome Completo</th>
                  <th>Sexo</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Exames Cadastrados</th>
                </tr>
              </thead>
              <tbody>
                {relatorios.map((relatorio, index) => (
                  <tr key={index}>
                    <td>{new Date(relatorio.data_cadastro).toLocaleDateString()}</td>
                    <td>{relatorio.codigo_paciente}</td>
                    <td>{relatorio.nome_completo}</td>
                    <td>{relatorio.sexo}</td>
                    <td>{relatorio.email}</td>
                    <td>{relatorio.celular}</td>
                    <td>{relatorio.exames}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}