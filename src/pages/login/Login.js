import React from 'react'

// styles
import styles from './Login.module.css'
import Logo from '../../assets/Systemlab-logo.png'

export default function Login() {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
        <img src={Logo} alt='SystemLab Web Logo' />
      <h2>Bem vindo!</h2>
      <label>
        <span>Usuário</span>
        <input
        type="text"
        />
      </label>
      <label>
        <span>Senha</span>
        <input
        type="password"
        />
      </label>
      <button className="btn">Entrar</button>
    </form>
  )
}