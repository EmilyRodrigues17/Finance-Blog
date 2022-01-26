const { Sequelize } = require("sequelize");
const connection = require("../database");
const category = require("./category");

const article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// relacionamento 1-n uma categoria tem muitos artigos
category.hasMany(article);

// relacionamento 1-1 um artigo pertence a uma categoria
article.belongsTo(category);

// recria a tabela toda vez que roda a aplicação (para atualizar)
// article.sync({force: true});
module.exports = article;