# Sistema de Reservas de Propriedades (Booking)

Este projeto é uma API RESTful simplificada para um sistema de reservas de propriedades, inspirado em plataformas como o Airbnb. Desenvolvido em **TypeScript**, utiliza **Express**, **TypeORM** e **SQLite**.
## Índice  

- [📋 Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias](#-tecnologias)
- [📦 Instalação](#-instalação)
- [🧪 Executando os Testes](#-executando-os-testes)
- [🛠️ Como Executar a Aplicação](#️-como-executar-a-aplicação)
- [DOCUMENTAÇÃO DA API](#documentação-da-api)
  - [1. Usuários](#1-usuários)
  - [2. Propriedades](#2-propriedades)
  - [3. Reservas](#3-reservas)  
  
---


## 📋 Funcionalidades

- **Usuários**: Cadastro de usuários.
- **Propriedades**: Cadastro de propriedades com validação de capacidade e preço base.
- **Reservas**:
  - Criação de reservas com verificação de disponibilidade.
  - Cálculo automático de preço total (com desconto de 10% para estadias de 7 dias ou mais).
  - Validação de número de hóspedes.
- **Cancelamento**:
  - Reembolso total: > 7 dias antes do check-in.
  - Reembolso parcial (50%): entre 1 e 7 dias antes.
  - Sem reembolso: < 1 dia antes.

## 🚀 Tecnologias

- Node.js & TypeScript
- Express.js
- TypeORM & SQLite3
- Jest & Supertest (Testes Unitários e E2E)

## 📦 Instalação

1. Clone o repositório (ou baixe os arquivos).
2. Instale as dependências do projeto:

```bash
npm install
```

## 🧪 Executando os Testes

O projeto possui uma suíte robusta de testes configurada com **Jest**. Existem dois tipos de testes:
1. **Testes Unitários**: Testam a lógica de negócio (Entidades, Serviços).
2. **Testes E2E (Ponta a Ponta)**: Testam os Controllers e as rotas da API simulando requisições HTTP reais.

Para executar todos os testes:

```bash
npm test
```

Para executar e observar os arquivos (modo watch):

```bash
npx jest --watch
```

Para ver a cobertura de código (Code Coverage):

```bash
npx jest --coverage
```

## 🛠️ Como Executar a Aplicação

Para rodar a API localmente, certifique-se de ter um arquivo de entrada (ex: `src/index.ts`) que inicializa o servidor Express.

Adicione o seguinte script ao seu `package.json` para facilitar a execução:

```json
"scripts": {
  "start": "ts-node src/index.ts",
  "test": "jest"
}
```

Em seguida, execute:

```bash
npm start
```

## DOCUMENTAÇÃO DA API

Abaixo estão os endpoints disponíveis, baseados nos testes de integração.

### 1. Usuários

**Criar Usuário**
- **URL:** `/users`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "name": "Eduardo Lourenzo"
  }
  ```

### 2. Propriedades

**Criar Propriedade**
- **URL:** `/properties`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "name": "Casa de Campo",
    "description": "Vista para montanhas",
    "maxGuests": 8,
    "basePricePerNight": 350
  }
  ```

### 3. Reservas

**Criar Reserva**
- **URL:** `/bookings`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "propertyId": "id-da-propriedade",
    "guestId": "id-do-usuario",
    "startDate": "2024-12-20",
    "endDate": "2024-12-25",
    "guestCount": 2
  }
  ```

**Cancelar Reserva**
- **URL:** `/bookings/:id/cancel`
- **Método:** `POST`
- **Body:** (Vazio)

---