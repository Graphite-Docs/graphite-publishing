const express = require('express');

const { setup } = require('radiks-server');

const app = express();

setup({
    mongoDBUrl: 'mongodb://localhost:27017/graphite'
  }).then((RadiksController) => {
    app.use('/radiks', RadiksController);
  });