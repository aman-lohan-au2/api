const express = require('express')
const app = express()
const sql = require('mssql')
const bodyParser = require('body-parser')
const Port= 8000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

const database = {
    user:'sa',
    password:'BKUPADMIN',
    database:'NEWAWLDB_T',
    server:'182.76.62.181',
    options:{
        encrypt: false,
        trustServerCertificate: true,
        SSL:true
    }
}

app.get('/assets', async function(req,res){
    const id = req.body.id
    console.log(id)
    try{
    await sql.connect(database)
   const duplicate = await sql.query(`SELECT * FROM Tbl_assetsdata ta where assests_id='${id}'`)
   console.log(duplicate)
   if(duplicate.recordset.length===0){
     await sql.query(`insert into Tbl_assetsdata(assests_id, entryon)Values('${id}', getDate())`)
   res.send('Assests Inserted')
   }
   else {
     await sql.query(`update Tbl_assetsdata set updatedon = getDate() where assests_id='${id}'`)
     res.send('Assests Updated')
}
   }
  catch(err){
      console.log(`Error occured ${err}`)
  }
}
)


app.listen(Port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${Port}`)
  })