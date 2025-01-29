import React, { useState } from 'react';
import axios from 'axios';
import { FaFileExcel } from 'react-icons/fa'; // Ícone do React Icons
import * as XLSX from 'xlsx'; // Biblioteca para criar o arquivo Excel

// styles
import styles from './Relatorios.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false); // aqui controla a exibição do ícone de excel

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchRelatorios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/relatorios`);
      setRelatorios(response.data.reverse());
      setReportGenerated(true); // aqui marca que o relatório foi gerado
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchRelatorios(); // Refaz a busca de relatórios quando o botão for clicado
  };

  const downloadExcel = () => {
    // criar uma planilha do Excel a partir dos dados da tabela
    const ws = XLSX.utils.json_to_sheet(relatorios);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatórios');

    // gerar arquivo Excel e baixar
    XLSX.writeFile(wb, 'relatorio_pacientes.xlsx');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={handleClick}>
          Gerar Relatório
        </button>
        
        {/* ícone para baixar o Excel (apenas quando o relatório for gerado) */}
        {reportGenerated && (
          <button className={styles['btnExcel']} onClick={downloadExcel}>
            <FaFileExcel size={24} style={{ marginRight: '8px' }} />
            Baixar Excel
          </button>
        )}

        <div className={styles.listContainer}>
          <h2>Relatório de Pacientes por Data (Geral)</h2>
          <p>Gere um relatório contendo todas as informações dos atendimentos cadastrados no sistema.</p>
          {loading ? (
            <p>Carregando relatórios...</p>
          ) : relatorios.length === 0 ? (
            <p>Não há relatórios disponíveis.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Código do Paciente</th>
                  <th>Nome Completo</th>
                  <th>Sexo</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Exames Cadastrados</th>
                  <th>Total Valor</th>
                </tr>
              </thead>
              <tbody>
                {relatorios.map((relatorio, index) => (
                  <tr key={index}>
                    <td>{relatorio.codigo_paciente}</td>
                    <td>{relatorio.nome_completo}</td>
                    <td>{relatorio.sexo}</td>
                    <td>{relatorio.email}</td>
                    <td>{relatorio.celular}</td>
                    <td>{relatorio.exames ? relatorio.exames : 'Nenhum'}</td>
                    <td>{relatorio.total_valor != null ? `R$ ${relatorio.total_valor.toFixed(2)}` : 'Sem valor'}</td>
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