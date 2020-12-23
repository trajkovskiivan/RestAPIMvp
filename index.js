const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ninjaRoutes = require("./routes/api");

// set up express app
const app = express();

const port = process.env.port || 4000;

// connect to mongodb
mongoose.connect('mongodb://localhost/LocalDBName', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connected to the database')).catch(err => console.log(err));
mongoose.Promise = global.Promise;

// body parser
// let urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.end('Hello')
});
app.get('/api', (req, res) => {
  res.send({name: 'Yoshi'})
});


// initialize routes
app.use("/api", ninjaRoutes)
// app.use("/api", routes)


// error handling middleware
app.use(function (err, req, res, next) {
  // console.log(err)
  res.status(422).send({error: err._message})
})











// listen for requests
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
