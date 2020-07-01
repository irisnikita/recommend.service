// Libraries
const mongoClient = require('mongodb');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const db = mongoose.connection;

require('dotenv').config();

// Define server
const PORT = process.env.PORT || 8102;
const app = express();
const server = http.createServer(app);

// Connect mongoose
mongoose.connect('mongodb+srv://nltruongvi:TjmWjm824594@cluster0-vzakd.mongodb.net/vmotel_search?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true})
    .then(() => {console.log('MongoDB connected')});

mongoose.set('useFindAndModify', false);

db.on('error', (err) => {
    console.log('Db connection error:', err.message);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
    res.send({
        nameService: 'Recommend service',
        port: PORT
    });
});

require('./routes/post')(app);
require('./routes/user')(app);
require('./routes/block')(app);
require('./routes/post')(app);
require('./routes/service')(app);
require('./routes/defaultService')(app);
require('./routes/unit')(app);
require('./routes/upload')(app);
require('./routes/customer')(app);
require('./routes/contract')(app);
require('./routes/comment')(app);

server.listen(PORT, () => {
    console.log('Server is run as port: ', PORT);
});
