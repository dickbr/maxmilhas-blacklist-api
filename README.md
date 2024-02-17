# maxmilhas-blacklist-api

API para consulta de CPF (Cadastro de Pessoas Físicas) na lista negra.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu sistema:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://docs.docker.com/get-docker/)
- Um banco de dados PostgreSQL


## Configuração

Copie o arquivo de exemplo `.env` e configure as variáveis de ambiente:

```bash 
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações de banco de dados e outras variáveis necessárias.


## Construção e Execução com Docker

Construa e execute o container Docker:

```bash 
docker build -t maxmilhas-blacklist-api .
```

```bash 
docker run --network host -p 3001:3001 -d maxmilhas-blacklist-api
```

## Rotas

Aqui estão algumas das rotas disponíveis:

- `POST /api/cpf`: Adiciona um CPF à lista negra.
- `GET /api/cpf/{cpf}`: Recupera informações de um CPF específico.
- `GET /api/cpf`: Lista todos os CPFs na lista negra.
- `DELETE /api/cpf/{cpf}`: Remove um CPF da lista negra.
- `POST /api/client`: Adiciona um novo cliente (PO).
- `GET /api/client/{cpf}`: Recupera informações de um cliente (PO) específico.

## Testes

Execute os testes unitários e de integração dentro do container Docker:

```bash 
yarn test
```

## Licença

Este projeto está licenciado sob a licença [MIT](#).