const express = require('express');

const app = express();

const { setup } = require('radiks-server');
require('dotenv').config()

setup({
    mongoDBUrl: process.env.MONGO_URI
  }).then((RadiksController) => {
    app.use('/radiks', RadiksController);
  });

app.get('/', (req, res) => {
  console.log("this is the home route")
});


const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);