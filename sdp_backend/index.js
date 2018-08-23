const express = require('express')
const fileUpload = require('express-fileupload')
const path  = require('path')
const cors = require('cors')

const app = express()

const routes = require('./routes')
app.use(cors())
app.use(fileUpload())
app.use(express.static(path.join(__dirname,'public')))
app.use('/', routes)


app.listen(3456, ()=> console.log('express listening on port 3456'))