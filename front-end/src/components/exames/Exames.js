import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//styles
import styles from './Exames.module.css';

import Navbar from '../../components/navbar/Navbar';

export default function Exames() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [exames, setExames] = useState([]); // state para armazenar os exames
  const [loading, setLoading] = useState(true); // state para mostrar carregamento

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // function para buscar os exames do backend
  const fetchExames = async () => {
    try {
      const response = await axios.get(`${backendUrl}/exames`); // requisição GET
      setExames(response.data); // update o state com os dados retornados
    } catch (error) {
      console.error('Erro ao buscar exames:', error);
    } finally {
      setLoading(false); // finaliza o state de carregamento
    }
  };

  useEffect(() => {
    fetchExames(); // aqui busca os exames ao carregar a página
  }, []);

  // function  para redirecionar para a página de cadastro de exame
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
                </tr>
              </thead>
              <tbody>
                {exames.map((exame) => (
                  <tr key={exame.id}>
                    <td>{exame.codigo}</td>
                    <td>{exame.descricao}</td>
                    <td>{`R$ ${exame.valor.toFixed(2)}`}</td>
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