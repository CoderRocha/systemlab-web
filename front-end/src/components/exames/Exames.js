import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styles
import styles from './Exames.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Exames() {
  const navigate = useNavigate();
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Função para buscar os exames
  const fetchExames = async () => {
    try {
      const response = await axios.get(`${backendUrl}/exames`);
      setExames(response.data);
    } catch (error) {
      console.error('Erro ao buscar exames:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExames();
  }, []);

  // Função para deletar um exame
  const handleDelete = async (codigoExame) => {
    try {
      const response = await axios.delete(`${backendUrl}/exames/${codigoExame}`);
      if (response.status === 200) {
        setExames(exames.filter((exame) => exame.codigo !== codigoExame)); // Remove o exame deletado da lista
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao deletar exame:', error);
    }
  };

  // Função para redirecionar para a página de cadastro de exame
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
          <p>Listagem contendo todos os exames cadastrados no sistema.</p>
          {loading ? (
            <p>Carregando exames...</p>
          ) : exames.length === 0 ? (
            <p>Não há exames cadastrados.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {exames.map((exame) => (
                  <tr key={exame.codigo}>
                    <td>{exame.codigo}</td>
                    <td>{exame.descricao}</td>
                    <td>{`R$ ${exame.valor.toFixed(2)}`}</td>
                    <td>
                      <button className={styles.btndelete} onClick={() => handleDelete(exame.codigo)}>
                        Deletar
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