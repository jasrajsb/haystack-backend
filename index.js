const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth_service = require('./services/auth.js');
const config = require('./config/config.js');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('dotenv').config()

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth_service.middleware);

//routes - import
const log_route = require('./routes/log.js');
const auth = require('./services/auth.js');

//routes - listen
app.use('/api/log', log_route);

//connect to database
mongoose.connect(process.env.DB_URI);


//simple ping endpoint
app.get('/ping', (req, res)=>{
    res.send('pong!');
});

app.listen(process.env.PORT || 3000, function() {
    console.log(
      "Express server listening on port %d in %s mode",
      this.address().port,
      app.settings.env
    );
  });