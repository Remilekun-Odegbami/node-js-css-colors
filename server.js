// Build mini server
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3003

server.set('view engine', 'ejs')

server.use('/', router)

server.listen(PORT, ()=> {
    console.log(`Loading on port...${PORT}`)
})