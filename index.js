const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harry_potter',
    password: 'bitinhoDB',
    port: 5432,
})

//Rotas dos Bruxos
app.get('/bruxo', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM bruxo');
        res.status(200).json({
            totalBruxos: response.rowCount,
            bruxos: response.rows
        })
    } catch (error) {
        console.log('Erro ao capturar bruxos!', error);
        res.status(500).send('Erro ao capturar bruxos!')
    }
});

app.get('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM bruxo WHERE id = $1', [id]);
        res.status(200).json({
            message: `Bruxo com o id ${id} encontrado!`,
            bruxo: response.rows
        })
    } catch (error) {
        console.log(`Erro ao capturar bruxo por ID!`, error);
        res.status(500).send('Erro ao capturar bruxo por ID!')
    }
});

app.post('/bruxo', async (req, res) => {
    try {
        const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
        // Condições para adicionar um bruxo
        const casas = ['puro', 'mestiço', 'trouxa']
        if(!casa_hogwarts.includes(casas)) {
            res.status(500).send({message: `Casa ${casa_hogwarts} inválida!`})
        } else if (status_sangue !== 'puro' && status_sangue !== 'mestico' && status_sangue !== 'trouxa') {
            res.status(500).send({message: `Status de sangue ${status_sangue} inválido!`})
        } else {
            await pool.query('INSERT INTO bruxo (nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono]);
            res.status(201).send({message: `Bruxo ${nome} criado com sucesso!`})
        }
    } catch (error) {
        console.log('Erro ao adicionar bruxo!', error);
        res.status(500).send('Erro ao adicionar bruxos!')
    }
})

app.put('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
        await pool.query('UPDATE bruxo SET nome = $1, idade = $2, casa_hogwarts = $3, habilidade_especial = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono, id])
    } catch (error) {
        console.log('Erro ao editar bruxo!', error);
        res.status(500).send('Erro ao editar bruxos!')
    }
})

app.delete('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxo WHERE id = $1', [id])
        res.status(200).send({message: `Bruxo com ID ${id} excluido com sucesso!`})
    } catch (error) {
        console.log('Erro ao excluir bruxo!', error);
        res.status(500).send('Erro ao excluir bruxos!')
    }
})

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!!!`);
});