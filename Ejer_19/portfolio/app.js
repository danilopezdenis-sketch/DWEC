const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');

app.use(require('./routes/auth'));
app.use(require('./routes/dashboard'));
app.use(require('./routes/portfolio'));

app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});


app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});


