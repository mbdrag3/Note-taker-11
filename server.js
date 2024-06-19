const express = require("express");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

const apiRouter = require("./routes/api.js");
const htmlRouter = require("./routes/html.js");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(apiRouter);
app.use(htmlRouter);





app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);