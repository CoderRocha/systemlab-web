import React, { useState, useEffect } from 'react';

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
  const [numeroAtendimento, setNumeroAtendimento] = useState(null); // state para o número de atendimento

  useEffect(() => {
    // Gera o número de atendimento apenas uma vez quando a página é carregada
    const numero = Math.floor(1000 + Math.random() * 9000);
    setNumeroAtendimento(numero);
  }, []); // Empty array faz com que o número de atendimento seja criado apenas uma vez

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExame = () => {
    if (novoExame.trim()) {
      // Verifica se o exame já está na lista, independente de como foi inserido (case-insensitive)
      const exameJaExiste = formData.exames.some(
        (exame) => exame.toLowerCase() === novoExame.toLowerCase()
      );

      if (!exameJaExiste) {
        setFormData({ ...formData, exames: [...formData.exames, novoExame] });
        setNovoExame(''); // limpar o campo de inserção do exame
      } else {
        alert('Este exame já foi adicionado à lista.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Atendimento:', { numeroAtendimento, ...formData });
    // implementar a lógica para enviar os dados ao backend
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
              value={numeroAtendimento} // O número de atendimento será constante e não irá mudar agora
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
              placeholder="Digite o nome do paciente"
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
              <option value="">Selecione o Sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
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
              placeholder="Digite o email do paciente"
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
              placeholder="Digite o número de celular do paciente"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Cadastrar Exames</label>
            <div className={styles.exameInputGroup}>
              <input
                type="text"
                value={novoExame}
                onChange={(e) => setNovoExame(e.target.value)}
                placeholder="Código do exame"
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