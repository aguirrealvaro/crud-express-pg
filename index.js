const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const routes_user = require('./routes/user')
app.use('/user', routes_user)

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Sv corriendo en puerto ${PORT}`)
})