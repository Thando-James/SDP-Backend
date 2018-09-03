const express = require('express')
const fileUpload = require('express-fileupload')
var bodyParser = require('body-parser');
const path  = require('path')
const cors = require('cors')
const app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())
app.use(fileUpload())
app.use(express.static(path.join(__dirname,'public')))

const routes = require('./routes')

app.listen(3456, ()=> console.log('express listening on port 3456'))
app.use('/', routes)
