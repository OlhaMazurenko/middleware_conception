const express = require('express');
const app = express();

const bodyParsingMiddleware = express.urlencoded({extended: true});
app.use();

const authors = require('./authors');
app.use('/authors', authors);

const articles = require('./articles');
app.use('/articles', articles);

app.listen(3000);
