let express = require('express')
let bodyParser = require('body-parser') // handle req.body
let exphbs = require('express-handlebars')
let path = require('path')
const PORT = process.env.PORT || 3000

let app = express()

// body parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  partialsDir: __dirname + '/components/'
}))
app.set('views', __dirname + '/views')
app.set('view engine', '.hbs')

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Require routes
app.use(require('./routes'))

// Custom 404 route not found handler
app.use((req, res) => {
  res.status(404).send('404 not found')
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})