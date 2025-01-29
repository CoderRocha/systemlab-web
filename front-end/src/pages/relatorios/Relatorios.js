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

  // Calcular os totais
  const totalAtendimentos = relatorios.length;

  // Ajuste para calcular corretamente o total de exames
  const totalExames = relatorios.reduce((acc, relatorio) => {
    if (relatorio.exames) {
      // Verificar se 'exames' é uma string (e converter em array)
      const examesArray = Array.isArray(relatorio.exames) ? relatorio.exames : relatorio.exames.split(',').map(exame => exame.trim());
      return acc + examesArray.length; // Soma a quantidade de exames
    }
    return acc;
  }, 0);

  const valorTotalExames = relatorios.reduce((acc, relatorio) => acc + (relatorio.total_valor || 0), 0);

  // Calcular atendimentos por sexo
  const atendimentosPorSexo = relatorios.reduce((acc, relatorio) => {
    acc[relatorio.sexo] = (acc[relatorio.sexo] || 0) + 1;
    return acc;
  }, {});

  const atendimentosOrdenados = Object.entries(atendimentosPorSexo).sort(
    ([sexoA, quantidadeA], [sexoB, quantidadeB]) => quantidadeB - quantidadeA
  );

  // Calcular exames realizados por código
  const examesRealizados = relatorios.reduce((acc, relatorio) => {
    if (relatorio.exames) {
      const examesArray = Array.isArray(relatorio.exames) ? relatorio.exames : relatorio.exames.split(',').map(exame => exame.trim());
      examesArray.forEach(exame => {
        acc[exame] = (acc[exame] || 0) + 1;
      });
    }
    return acc;
  }, {});

  // Calcular ticket médio
  const atendimentosComValor = relatorios.filter(relatorio => relatorio.total_valor != null && relatorio.total_valor > 0);
  const totalValorExamesComValor = atendimentosComValor.reduce((acc, relatorio) => acc + relatorio.total_valor, 0);
  const ticketMedio = atendimentosComValor.length > 0 ? (totalValorExamesComValor / atendimentosComValor.length).toFixed(2) : 0;


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={handleClick}>
          Gerar Relatório
        </button>

        {/* baixar o Excel (apenas quando o relatório for gerado) */}
        {reportGenerated && (
          <button className={styles['btnExcel']} onClick={downloadExcel}>
            <FaFileExcel size={24} style={{ marginRight: '8px' }} />
            Exportar Relatório
          </button>
        )}

        <div className={styles.listContainer}>
          <h2>Relatório Geral de Atendimentos</h2>
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
        <br />
        {/* Grids B.I */}
        {reportGenerated && (
          <div className={styles.grids}>
            <div className={styles.gridItem}>
              <h3>Total de Atendimentos</h3>
              <p>{totalAtendimentos}</p>
            </div>
            <div className={styles.gridItem}>
              <h3>Total de Exames</h3>
              <p>{totalExames}</p>
            </div>
            <div className={styles.gridItem}>
              <h3>Valor Total de Exames</h3>
              <p>{`R$ ${valorTotalExames.toFixed(2)}`}</p>
            </div>
            <div className={styles.gridItem}>
              <h3>Atendimentos por Sexo</h3>
              {atendimentosOrdenados.map(([sexo, quantidade]) => (
                <p key={sexo}>{`${sexo}: ${quantidade}`}</p>
              ))}
            </div>
            <div className={styles.gridItem}>
              <h3>Exames Realizados</h3>
              {Object.entries(examesRealizados).map(([exame, quantidade]) => (
                <p key={exame}>{`${exame}: ${quantidade}`}</p>
              ))}
            </div>
            <div className={styles.gridItem}>
              <h3>Ticket Médio</h3>
              <p>{`R$ ${ticketMedio}`}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}