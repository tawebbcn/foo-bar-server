'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fooSchema = new Schema({
  bar: {
    type: String,
    required: true
  },
  baz: {
    type: String,
    required: true
  }
});

const Foo = mongoose.model('Foo', fooSchema);

module.exports = Foo;
