## Cyrela FIAP

### Rodar usando [Docker](https://www.docker.com)

#### Pré-requisitos:
1. Docker compose instalado
2. Portas 3000 e 5432 livres

#### Rodando:
Na Raiz do projeto, rode o comando:
```bash
$ docker-compose build
$ docker-compose up
```

### Rodar nativo

#### Pré-requisitos:
1. Postgres
2. Node LTS
3. NPM 6+
4. Acesso ao usuário `postgres` no Postgres
5. Porta 3000 livre

#### Rodando: 
1. Rodar esse arquivo contendo o SQL no Postgres: `./infra/create-tables.sql`
2. Alterar as credenciais de `prod` no arquivo: `./src/config/config.js`
3. Rodar esse comando para iniciar o servidor:
```bash
$ npm run start:prod
```
