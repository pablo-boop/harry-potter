CREATE DATABASE harry_potter;

\c harry_potter;

CREATE TABLE bruxo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    idade INT NOT NULL,
    casa_hogwarts VARCHAR(100) NOT NULL,
    habilidade_especial VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento DECIMAL(5,2) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);

    INSERT INTO bruxo (nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ('Harry Potter', 34, 'Grifnoria', 'Prodigio da feiticaria', 'Mestico', 'Corca');

    INSERT INTO varinha (material, comprimento, nucleo, data_fabricacao) VALUES ('Madeira de Teixo', 30, 'Pea da cauda da Fenix', '1991-07-31');