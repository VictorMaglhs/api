const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const connect = require("./connect")

app = express()
app.use(cors())
app.use(bodyParser.json())



app.get('/',async (req,res) => {
    const connection = await connect()
    const result = await connection.execute("SELECT name,password,email FROM employees")
    res.json(result[0])
})

app.post('/',async (req,res) => {
    const connection = await connect()
    const result = await connection.execute(`INSERT INTO employees(name, password, email) VALUES ('${req.body.name}','${req.body.password}','${req.body.email}')`) 
    res.json(result[0])
})

app.get('/:id',async (req,res) => {
    const connection = await connect()
    const result = await connection.execute(`SELECT name,password,email FROM employees WHERE id = ${req.params.id}`)
    if(result[0].length == 0){
        res.status(404)
        res.send('QUATROCERNTOS E QUARTTRO')
    }else{
        res.json(result[0][0])
    }
})

app.put('/:id',async (req,res) => {
    const connection = await connect()
    const result = await connection.execute(`UPDATE employees SET name='${req.body.name}',password='${req.body.password}',email='${req.body.email}' WHERE id = ${req.params.id}`) 
    res.json(result[0])
})

app.delete('/:id',async (req,res) => {
    const connection = await connect()
    const result = await connection.execute(`DELETE FROM employees WHERE id = ${req.params.id}`) 
    res.json(result[0])
})






app.listen(3000)

