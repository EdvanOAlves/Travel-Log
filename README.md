# 🌍 Travel Log

**Travel Log** é uma rede social voltada para viajantes que desejam registrar, organizar e compartilhar suas experiências ao redor do mundo. Diferente das redes sociais tradicionais, o projeto introduz o conceito de **viagens** como coleções de postagens, permitindo uma narrativa mais organizada e contextualizada das experiências dos usuários.

---

## 📌 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Diferencial do Sistema de Postagens](#-diferencial-do-sistema-de-postagens)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Banco de Dados](#-banco-de-dados)
- [Back-end (API)](#-back-end-api)
- [Front-end](#-front-end)
- [Metodologia de Desenvolvimento](#-metodologia-de-desenvolvimento)
- [Documentação](#-documentação)
- [Equipe](#-equipe)

---

## 📖 Sobre o Projeto

O **Travel Log** foi desenvolvido como um **Projeto Integrado**, com o objetivo de aplicar conceitos de engenharia de software, desenvolvimento web, banco de dados e metodologias ágeis.

A plataforma permite que usuários:
- Criem uma conta ou realizem login
- Publiquem experiências de viagem
- Sigam outros usuários
- Interajam com postagens
- Organizem seus conteúdos de forma estruturada por viagens

---

## ✨ Principais Funcionalidades

- 🔐 **Autenticação de Usuário**
  - Login e cadastro na mesma interface

- 🏠 **Home**
  - Visualização de posts recentes
  - Visualização de posts de usuários seguidos

- 👤 **Perfil do Usuário**
  - Foto de perfil
  - Descrição
  - Lista de viagens
  - Posts publicados
  - Quantidade de seguidores e seguindo

- ❤️ **Interações**
  - Curtidas
  - Favoritos
  - Comentários

---

## 🧳 Diferencial do Sistema de Postagens

O Travel Log não trabalha apenas com posts tradicionais. O sistema é dividido em:

- **Viagem**
  - Representa uma experiência completa
  - Funciona como uma coleção de posts

- **Log**
  - Representa uma postagem individual
  - Sempre associada a uma viagem

➡️ Uma **viagem pode possuir vários logs**, mas cada log pertence a apenas uma viagem.

Esse modelo facilita a organização cronológica e temática das experiências do usuário.

---

## 🏗 Arquitetura do Projeto

O projeto segue a **arquitetura MVC (Model-View-Controller)**, separando responsabilidades e facilitando a manutenção e escalabilidade do sistema.

---

## 🗄 Banco de Dados

![Diagrama lógico](./database/TraveLog%20Modelo%20Logico.png)

- **Tecnologia:** SQL
- **Ferramenta:** MySQL Workbench

### Recursos Utilizados
- Modelagem relacional
- Procedures
- Triggers
- Regras de integridade

Esses recursos foram implementados para **otimizar o processamento de dados** e garantir maior consistência nas operações.

---

## ⚙️ Back-end (API)

- **Linguagem:** JavaScript
- **Runtime:** Node.js
- **Framework:** Express
- **Arquitetura:** MVC
- **Documentação:** Swagger (swagger-ui-express)

### CRUDs Implementados

- Usuário
- Viagem
- Log
- Tipo de Viagem
- Seguidor
- País
- Local
- Mídia
- Curtida
- Favorito
- Comentário

Todas as rotas da API estão **documentadas via Swagger**, facilitando testes e integração com o front-end.

---

## 🎨 Front-end

- **Tecnologias:**  
  - HTML  
  - CSS  
  - JavaScript  

- **Integrações:**
  - Google AutoComplete API (localização)
  - Upload de imagens via **Azure**
  - API Travel Log

O front-end foi desenvolvido com foco em **usabilidade, clareza e experiência do usuário**.

---

## 🧠 Metodologia de Desenvolvimento

O projeto foi desenvolvido em grupo utilizando a metodologia **SCRUM**, incluindo:

- Organização por sprints
- Divisão de tarefas
- Reuniões de alinhamento
- Controle de entregas

Também foi realizada a **documentação completa do levantamento de requisitos**, incluindo:

- Requisitos de Usuário
- Requisitos Funcionais
- Requisitos Não Funcionais

---

## 📚 Documentação

- Modelagem do banco de dados
- Documentação da API (Swagger)
- Levantamento de requisitos
- Organização de tarefas com SCRUM

---

## 👥 Equipe

### 🗄 Edvan Alves — *DBA*
- GitHub: https://github.com/EdvanOAlves  
- LinkedIn: https://www.linkedin.com/in/edvan-alves/

---

### ⚙️ Gabriel Lacerda Correia — *Back-end*
- GitHub: https://github.com/GabrielPKTN  
- LinkedIn: https://www.linkedin.com/in/gabriellacerda1005

---

### 🎨 João Victor Santos — *Front-end*
- GitHub: https://github.com/JoaoMoraes28  
- LinkedIn: https://www.linkedin.com/in/jo%C3%A3o-victor-santos-de-moraes-0b6532270/

---

## 🚀 Considerações Finais

O **Travel Log** representa a aplicação prática de conceitos modernos de desenvolvimento web, banco de dados e engenharia de software, entregando uma solução funcional, organizada e escalável para o compartilhamento de experiências de viagem.

---
