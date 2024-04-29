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
        const { name } = req.query;
        if (name) {
            const response = await pool.query('SELECT * FROM bruxo WHERE nome = $1', [name]);
            res.status(200).json({
                message: 'Bruxo encontrado com sucesso!',
                bruxo: response.rows
            });
        } else {
            const response = await pool.query('SELECT * FROM bruxo');
            res.status(200).json({
                totalBruxos: response.rowCount,
                bruxos: response.rows
            });
        }
    } catch (error) {
        console.error('Erro ao capturar bruxos!', error);
        res.status(500).send('Erro ao capturar bruxos!');
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
        const sangue = ['Puro', 'Mestiço', 'Trouxa']
        const casas = ['Grifinoria', 'Sonserina', 'Corvinal', 'Lufa-lufa']

        if (!sangue.includes(status_sangue)) {
            res.status(400).send({ message: `Sangue ${status_sangue} inválido!` })
        } else if(nome == "" || idade == "" || casa_hogwarts == "" || habilidade_especial == "" || status_sangue == "") {
            res.status(400).send({ message: 'Preencha todos os campos!'})
        } else if (!casas.includes(casa_hogwarts)) {
            res.status(400).send({ message: `Casa ${casa_hogwarts} inválido!` })
        } else {
            await pool.query('INSERT INTO bruxo (nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono]);
            res.status(201).send({ message: `Bruxo ${nome} criado com sucesso!` })
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
        res.status(200).send({message: 'Bruxo editado com sucesso!'})
    } catch (error) {
        console.log('Erro ao editar bruxo!', error);
        res.status(500).send('Erro ao editar bruxos!')
    }
})

app.delete('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxo WHERE id = $1', [id])
        res.status(200).send({ message: `Bruxo com ID ${id} excluido com sucesso!` })
    } catch (error) {
        console.log('Erro ao excluir bruxo!', error);
        res.status(500).send('Erro ao excluir bruxos!')
    }
})

//Rotas de Varihas
app.get('/varinha', async (req, res) => {
    try {
        const { material } = req.query;
        if (material) {
            const response = await pool.query('SELECT * FROM varinha WHERE material = $1', [material]);
            res.status(200).json({
                message: 'varinha encontrado com sucesso!',
                varinha: response.rows
            });
        } else {
            const response = await pool.query('SELECT * FROM varinha');
            res.status(200).json({
                totalvarinhas: response.rowCount,
                varinhas: response.rows
            });
        }
    } catch (error) {
        console.error('Erro ao capturar varinhas!', error);
        res.status(500).send('Erro ao capturar varinhas!');
    }
});


app.get('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM varinha WHERE id = $1', [id]);
        res.status(200).json({
            message: `varinha com o id ${id} encontrado!`,
            varinha: response.rows
        })
    } catch (error) {
        console.log(`Erro ao capturar varinha por ID!`, error);
        res.status(500).send('Erro ao capturar varinha por ID!')
    }
});

app.post('/varinha', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        if(material == "" || comprimento == "" || nucleo == "" || data_fabricacao == "") {
            res.status(400).send({
                message: 'Preencha todos os campos necessarios!'
            })
        } else {
            const response = await pool.query('INSERT INTO varinha (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
            res.status(201).send({
                message: 'Varinha adicionada!',
                varinha: response.rows
            })
        }
    } catch (error) {
        console.log(`Erro ao adicionar varinha!`, error);
        res.status(500).send('Erro ao adicionar varinha!')
    }
})

app.put('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        await pool.query('UPDATE varinha SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id])
        res.status(200).send({message: 'Varinha editada com sucesso!'})
    } catch (error) {
        console.log('Erro ao editar varinha!', error);
        res.status(500).send('Erro ao editar varinhas!')
    }
})

app.delete('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinha WHERE id = $1', [id])
        res.status(200).send({ message: `varinha com ID ${id} excluido com sucesso!` })
    } catch (error) {
        console.log('Erro ao excluir varinha!', error);
        res.status(500).send('Erro ao excluir varinhas!')
    }
})

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!!!`);
});