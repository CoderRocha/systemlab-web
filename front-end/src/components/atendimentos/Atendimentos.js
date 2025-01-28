import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styles
import styles from './Atendimentos.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Atendimentos() {
  const navigate = useNavigate();
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchAtendimentos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/atendimentos`);
      setAtendimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtendimentos();
  }, []);

  const handleClick = () => {
    navigate('/cadastraratendimento');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles.btn} onClick={handleClick}>
          Criar Novo Atendimento
        </button>
        <div className={styles.listContainer}>
          <h2>Listagem de Atendimentos</h2>
          <p>Listagem contendo todos os atendimentos cadastrados no sistema.</p>
          {loading ? (
            <p>Carregando atendimentos...</p>
          ) : atendimentos.length === 0 ? (
            <p>Não há atendimentos cadastrados.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Número do Atendimento</th>
                  <th>Data de Cadastro</th>
                  <th>Nome do Paciente</th>
                  <th>Sexo</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Exames</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.map((atendimento) => (
                  <tr key={atendimento.numero_atendimento}>
                    <td>{atendimento.numero_atendimento}</td>
                    <td>{atendimento.dataCadastro}</td>
                    <td>{atendimento.nomePaciente}</td>
                    <td>{atendimento.sexo}</td>
                    <td>{atendimento.email}</td>
                    <td>{atendimento.celular}</td>
                    <td>{atendimento.exames || 'Nenhum'}</td>
                    <td>
                      <button className={styles.btn} onClick={() => navigate(`/atendimentos/${atendimento.numero_atendimento}`)}>
                        Acessar
                      </button>
                    </td>
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