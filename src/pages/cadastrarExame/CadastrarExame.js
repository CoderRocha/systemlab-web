import React, { useState } from 'react';

//styles
import styles from './CadastrarExame.module.css';

//pages & components
import Navbar from '../../components/navbar/Navbar';

export default function CadastrarExame() {
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    valor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Exame:', formData);
    // implementar a lógica para enviar os dados ao backend later
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