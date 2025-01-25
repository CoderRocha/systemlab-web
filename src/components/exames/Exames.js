import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import styles from './Exames.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Exames() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate('/cadastrarexame');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={handleClick}>Criar Novo Exame</button>
        <div className={styles.listContainer}>
          <h2>Exames Cadastrados</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HEMO</td>
                <td>Hemograma</td>
                <td>R$ 120,00</td>
                <td>Acessar</td>
              </tr>
              <tr>
                <td>URE</td>
                <td>Ureia</td>
                <td>R$ 250,00</td>
                <td>Acessar</td>
              </tr>
              <tr>
                <td>GLID</td>
                <td>Glicose</td>
                <td>R$ 180,00</td>
                <td>Acessar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}