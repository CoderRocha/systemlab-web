import React from 'react';

//styles
import styles from './GerarRelatorio.module.css';

export default function GerarRelatorio() {
  return (
    <div className={styles.container}>
      <h2>Relatório de Pacientes por Data (Geral)</h2>
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
          <tr>
            <td>01/01/2023</td>
            <td>12345</td>
            <td>João Silva</td>
            <td>Masculino</td>
            <td>joao.silva@email.com</td>
            <td>(11) 99999-9999</td>
            <td>HEMOD, URI</td>
          </tr>
          <tr>
            <td>15/02/2023</td>
            <td>67890</td>
            <td>Maria Oliveira</td>
            <td>Feminino</td>
            <td>maria.oliveira@email.com</td>
            <td>(21) 98888-8888</td>
            <td>GLI</td>
          </tr>
          <tr>
            <td>10/03/2023</td>
            <td>11223</td>
            <td>Carlos Souza</td>
            <td>Masculino</td>
            <td>carlos.souza@email.com</td>
            <td>(31) 97777-7777</td>
            <td>HEMO</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}