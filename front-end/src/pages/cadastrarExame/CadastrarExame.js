import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//styles
import styles from './CadastrarExame.module.css';

//pages & components
import Navbar from '../../components/navbar/Navbar';

export default function CadastrarExame() {
  const navigate = useNavigate(); // redirecionar após o cadastro
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    valor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // envia os dados para o backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/exames`, formData);
      console.log('Exame cadastrado com sucesso:', response.data);

      // redireciona para a página de exames cadastrados
      navigate('/exames');
    } catch (error) {
      console.error('Erro ao cadastrar exame:', error);
      alert('Erro ao cadastrar exame. Tente novamente!');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Cadastrar Exame</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Código do Exame</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleInputChange}
              required
              placeholder="Digite o código do exame"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Descrição</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              required
              placeholder="Digite a descrição do exame"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Valor</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              step="0.01"
              required
              placeholder="Digite o valor do exame"
            />
          </div>
          <button type="submit" className={styles.btn}>
            Salvar Exame
          </button>
        </form>
      </div>
    </>
  );
}