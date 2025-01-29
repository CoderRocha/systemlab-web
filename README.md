# SystemLab Web

## Sistema para Laboratórios de Análises Clínicas

Esse projeto de Sistema para Laboratórios de Análises Clínicas (LIS) foi criado por mim (Guilherme Rocha), e batizado de SystemLab Web.

É uma versão atualizada de meu antigo projeto Systemlab, onde é possível Criar e Gerenciar Cadastros de Atendimentos de Pacientes, Exames, Relatórios Gerais contendo informações dos atendimentos cadastrados no sistema e Dashboards mostrando os números totais do laboratório referente a operação do negócio no geral.

## Tecnologias Utilizadas

- HTML5
- CSS5
- Javascript
- React.js
- Node.js
- SQLite

## Funcionalidades

### Listagem de Atendimentos

Os usuários podem visualizar os atendimentos que já foram cadastrados no sistema, e visualizar informações como:

- Número do Atendimento
- Nome do Paciente
- Ação (Deletar)

### Cadastro de Atendimento

Os usuários podem cadastrar atendimentos, e podem inserir informações como:

- Número de Atendimento (Gerado de Forma Aleatória e Único para cada Atendimento)
- Nome Completo
- Sexo
- Email
- Celular
- Lista de Exames cadastrados no Atendimento
- Opção para Remover o Exame do Atendimento (X)

O sistema evita o cadastro de atendimentos com códigos de exames duplicados, independente se for em maiúsculo ou não.

### Listagem de Exames

Os usuários podem visualizar os exames que já foram cadastrados no sistema, e visualizar informações como:

- Código do Exame
- Descrição
- Valor (R$)
- Ação (Deletar)

Caso tenha pelo menos 1 Exame cadastrado no sistema, será disponibilizada uma opção para Exportar a Listagem de Exames em Excel, facilitando o gerenciamento dos exames cadastrados no sistema diretamente em uma planilha.

### Cadastro de Exame

É possível cadastrar diferentes tipos de exames, tendo que preencher as seguintes informações nos campos:

- Código do Exame (Sigla)
- Descrição (Nome do Exame)
- Valor (R$)

O sistema evita o cadastro de exames com códigos duplicados, independente se for em maiúsculo ou não.

### Relatório Geral de Atendimentos

É possível gerar um relatório contendo informações Gerais dos atendimentos cadastrados no sistema, como:

- Código do Paciente
- Nome Completo
- Sexo
- Email
- Celular
- Exames Cadastrados
- Valor Total R$

Após gerar o Relatório, o sistema disponibiliza uma opção para Exportar o Relatório Geral em Excel, podendo facilitar o gerenciamento dessas informações diretamente em uma planilha.

### Dashboards

Após gerar o Relatório Geral, também é gerado logo abaixo dele um Dashboard semelhante ao Power B.I, onde é possível ver todos os números relacionados ao negócio do laboratório que estão disponíveis no sistema, como:

- Total de Atendimentos
- Total de Exames
- Valor Total dos Exames (R$)
- Atendimentos por Sexo
- Exames Realizados
- Ticket Médio (R$)

## Como Executar o Projeto?

Como o Projeto está divido em duas pastas (Front-End e Back-End), acesse cada uma das 2 pastas para poder verificar o README.md que irá lhe auxiliar a como instalar todas as dependências e pacotes necessários para poder rodar o projeto localmente.
