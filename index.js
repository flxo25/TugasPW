const express = require('express')
const app = express()
const port = 8080
var fetch = require('node-fetch')
const fs = require('fs')

app.get('/', (req, res) => res.send('Hello anonymous, welcome to medical record!'))

app.get('/rekam_medis', (req,res) => {
    console.log("POST ON")
    fetch('https://localhost:3000/api/auth/validate',{ // localhostnya ganti aja sama yang punya mu waz
        headers : {
            'Content-Type':'application/x-www-form-urlencoded',
            'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjg1OGE4YWFlOTNiMGVjODhmZTg3NiIsImlhdCI6MTU3MjM2NTk4OSwiZXhwIjoxNTcyMzY5NTg5fQ.hSww2sAlN9rWT8p9aqeLsuqBxjvz8TpOTZBfiRxtCzk',
            'username' : 'diba'
        }
    }).then((res) => 
        {if(res.json().auth){ // .auth itu aku nganggap tadi validate mu ngereturn json yang isinya auth : true or false
            let data = JSON.parse(fs.readFileSync('DataRekamMedis.json'));
            res.json(data);        
        } 
    })
})

app.listen(port, () => console.log(`Simple Express app listening on port ${port}!`))