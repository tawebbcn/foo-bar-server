'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const data = require('../../data/foo');

const Foo = require('../../models/foo.js');

mongoose.connect('mongodb://localhost/foodb', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    console.log('Connected to Mongo!');
    return Foo.remove({});
  })
  .then(() => {
    console.log('Empty db');
    return Foo.insertMany(data);
  })
  .then((results) => {
    console.log('You have some foos', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
