# API de Harry Potter

Esta é uma API simples para gerenciar informações sobre bruxos e varinhas do universo de Harry Potter. A API oferece operações básicas de CRUD (Create, Read, Update, Delete) para bruxos e varinhas.

## Configuração do Banco de Dados

A API utiliza um banco de dados PostgreSQL para armazenar informações sobre os bruxos e varinhas. Certifique-se de ter o PostgreSQL instalado e configurado localmente. Você pode configurar as credenciais do banco de dados no arquivo `index.js` na seção `const pool`.

```javascript
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_name',
    password: 'database_password',
    port: database_port,
})
```

## Instalação
```
git clone https://github.com/seu-usuario/api-harry-potter.git
```

```
cd api-harry-potter
npm install
```

```
npm run dev
```

## Rotas

### Bruxos

- **GET /bruxo**: Retorna todos os bruxos ou um bruxo específico com base no nome fornecido como parâmetro de consulta.
- **GET /bruxo/:id**: Retorna um bruxo com base no ID fornecido.
- **POST /bruxo**: Adiciona um novo bruxo.
- **PUT /bruxo/:id**: Atualiza as informações de um bruxo existente com base no ID fornecido.
- **DELETE /bruxo/:id**: Exclui um bruxo com base no ID fornecido.

### Varinhas

- **GET /varinha**: Retorna todas as varinhas ou uma varinha específica com base no material fornecido como parâmetro de consulta.
- **GET /varinha/:id**: Retorna uma varinha com base no ID fornecido.
- **POST /varinha**: Adiciona uma nova varinha.
- **PUT /varinha/:id**: Atualiza as informações de uma varinha existente com base no ID fornecido.
- **DELETE /varinha/:id**: Exclui uma varinha com base no ID fornecido.
