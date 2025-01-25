import React from 'react'

//styles
import styles from './Relatorios.module.css'

import Navbar from '../../components/navbar/Navbar';
import GerarRelatorio from '../../components/gerarRelatorio/GerarRelatorio'

export default function Relatorios() {

  const handleClick = (e) => {
    e.preventDefault()
  };

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <button className={styles['btn']} onClick={handleClick}>Gerar Relatório</button>
    </div>
    <GerarRelatorio />
    </>
  )
}