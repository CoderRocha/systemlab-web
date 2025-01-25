import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

//styles
import styles from './Atendimentos.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Atendimentos() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate('/cadastraratendimento');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={handleClick}>Criar Novo Atendimento</button>
        <div className={styles.listContainer}>
          <h2>Listagem de Atendimentos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data de Cadastro</th>
                <th>Código do Paciente</th>
                <th>Nome Completo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/01/2023</td>
                <td>12345</td>
                <td>João Silva</td>
                <td>Acessar</td>
              </tr>
              <tr>
                <td>15/02/2023</td>
                <td>67890</td>
                <td>Maria Oliveira</td>
                <td>Acessar</td>
              </tr>
              <tr>
                <td>10/03/2023</td>
                <td>11223</td>
                <td>Carlos Souza</td>
                <td>Acessar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}