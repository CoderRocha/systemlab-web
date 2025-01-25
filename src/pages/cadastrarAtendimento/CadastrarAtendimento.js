import React, { useState } from 'react';

//styles
import styles from './CadastrarAtendimento.module.css';

//pages & components
import Navbar from '../../components/navbar/Navbar';

export default function CadastrarAtendimento() {
  const [formData, setFormData] = useState({
    nomePaciente: '',
    sexo: '',
    email: '',
    celular: '',
    exames: [],
  });

  const [novoExame, setNovoExame] = useState('');

  const numeroAtendimento = Math.floor(1000 + Math.random() * 9000); // gerar número de atendimento aleatório

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExame = () => {
    if (novoExame.trim()) {
      setFormData({ ...formData, exames: [...formData.exames, novoExame] });
      setNovoExame(''); // aqui limpa o campo de inserção do exame
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Atendimento:', { numeroAtendimento, ...formData });
    // implementar a lógica backend
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Cadastrar Atendimento</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Número do Atendimento</label>
            <input
              type="text"
              value={numeroAtendimento}
              readOnly
              className={styles.readOnlyInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nome do Paciente</label>
            <input
              type="text"
              name="nomePaciente"
              value={formData.nomePaciente}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Celular</label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Adicionar Exames</label>
            <div className={styles.exameInputGroup}>
              <input
                type="text"
                value={novoExame}
                onChange={(e) => setNovoExame(e.target.value)}
                placeholder="Nome do exame"
              />
              <button
                type="button"
                onClick={handleAddExame}
                className={styles.addExameBtn}
              >
                Adicionar
              </button>
            </div>
            <ul className={styles.exameList}>
              {formData.exames.map((exame, index) => (
                <li key={index}>{exame}</li>
              ))}
            </ul>
          </div>
          <button type="submit" className={styles.btn}>
            Salvar Atendimento
          </button>
        </form>
      </div>
    </>
  );
}