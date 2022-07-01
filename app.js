const express = require('express');
var mysql = require('mysql2');
// var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3010;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host     : 'database-aos.csckmcxno9ob.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'FER22NANDO',
    database : 'mascotas',
    port: 3306
});

connection.connect(error =>{
    if(error) throw error;
    console.log('Database server running!')
});

app.get('/', (req, res) => {
    res.send('Running')
})

app.post('/pet',(req,res)=>{
    const sql = 'INSERT INTO mascota SET ?';
    const pet_obj = {
        name: req.body.name,
        race: req.body.race,
        age: req.body.age,
    };
    connection.query(sql, pet_obj, error =>{
        if(error) throw error;
        res.send('Pet created')
    })
});


app.get('/allPet',(req,res)=>{
    const sql = 'SELECT * FROM mascota'
    connection.query(sql, (error,resuls) => {
        if (error) throw error;
        if (resuls.length > 0){
            res.json(resuls)
        } else{
            res.send('No hay mascotas en la lista')
        }
    })  
});

app.put('/updatePet/:idPet',(req,res)=>{
    const {idPet} = req.params;
    console.log(idPet);
    const {name, race, age} = req.body;
    const sql = `UPDATE mascota SET name = '${name}', race='${race}', age=${age} WHERE idPet=${idPet}`
    connection.query(sql, error =>{
        if(error) throw error;
        res.send('Pet update')
    })
})

// Delete pet
app.delete('/deletePet/:idPet',(req,res)=>{
    const {idPet} = req.params;
    const sql = `DELETE FROM mascota WHERE idPet=${idPet}`
    connection.query(sql,error =>{
        if(error) throw error;
        res.send('Deleted Pet')
    })
})

// Listen app
app.listen(3010, function () {
    console.log('La Aplicación está funcionando en el puerto 3010');
});