import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styles
import styles from './CadastrarAtendimento.module.css';

// pages & components
import Navbar from '../../components/navbar/Navbar';

export default function CadastrarAtendimento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    sexo: '',
    email: '',
    celular: '',
    exames: [],
  });

  const [novoExame, setNovoExame] = useState('');
  const [numeroAtendimento, setNumeroAtendimento] = useState(null); // state para o número de atendimento
  const [loading, setLoading] = useState(false); // state para exibir "Carregando..."

  const backendUrl = process.env.REACT_APP_BACKEND_URL; // URL do backend do .env

  useEffect(() => {
    // Gera o número de atendimento e a data de cadastro apenas uma vez
    const numero = Math.floor(1000 + Math.random() * 9000);
    setNumeroAtendimento(numero);

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR'); // formato dd/mm/aaaa
    setFormData((prev) => ({ ...prev, dataCadastro: dataFormatada }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExame = () => {
    if (novoExame.trim()) {
      const exameJaExiste = formData.exames.some(
        (exame) => exame.toLowerCase() === novoExame.toLowerCase()
      );

      if (!exameJaExiste) {
        setFormData({ ...formData, exames: [...formData.exames, novoExame] });
        setNovoExame('');
      } else {
        alert('Este exame já foi adicionado à lista.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // define o state como "carregando"

    const atendimentoData = {
      numeroAtendimento,
      ...formData,
    };

    try {
      // Requisição POST para o backend
      await axios.post(`${backendUrl}/atendimentos`, atendimentoData);

      // Redireciona para a página de atendimentos após salvar
      navigate('/atendimentos');
    } catch (error) {
      console.error('Erro ao salvar atendimento:', error);
      alert('Ocorreu um erro ao salvar o atendimento. Tente novamente.');
    } finally {
      setLoading(false); // finaliza o state de carregamento
    }
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
                <li className={styles.liexame} key={index}>{exame}</li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className={styles.btn}
            disabled={loading} // desabilita o botão durante o carregamento
          >
            {loading ? 'Salvando...' : 'Salvar Atendimento'}
          </button>
        </form>
      </div>
    </>
  );
}