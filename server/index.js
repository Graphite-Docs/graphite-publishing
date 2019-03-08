const express = require('express');

const app = express();

const { setup } = require('radiks-server');

// setup({
//     mongoDBUrl: 'mongodb://localhost:27017/radiks-server'
//   }).then((RadiksController) => {
//     app.use('/radiks', RadiksController);
//   });

setup({
    mongoDBUrl: 'mongodb://graphite_admin:xFn1WMCkPD6F@cluster0-shard-00-00-nrzr1.mongodb.net:27017,cluster0-shard-00-01-nrzr1.mongodb.net:27017,cluster0-shard-00-02-nrzr1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
  }).then((RadiksController) => {
    app.use('/radiks', RadiksController);
  });

app.get('/', (req, res) => {
  console.log("this is the home route")
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);