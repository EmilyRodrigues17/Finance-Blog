const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

// Database
async function connectDatabase (){
    try{
        await connection.authenticate();
        console.log("Conexão feita com o banco de dados");
    }catch(msgError){
        console.log(msgError);
    }
}
connectDatabase();

// Modo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser - formulários e json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.render("index");
})

app.listen(8080, () => {
    console.log("Servidor rodando!")
})