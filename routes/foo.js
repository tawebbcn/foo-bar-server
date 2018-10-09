'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Foo = require('../models/foo');

router.get('/', (req, res, next) => {
  Foo.find({})
    .then((results) => {
      res.json(results);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { bar, baz } = req.body;
  if (!bar || !baz) {
    return res.status(422).json({ code: 'unprosessable-entity' });
  }
  const foo = new Foo(req.body);
  foo.save()
    .then(() => {
      res.status(200).json(foo);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  if (!id || !ObjectId.isValid(id)) {
    res.status(404).json({ code: 'not-found' });
  }
  Foo.remove({ _id: id })
    .then(() => {
      res.json({ code: 'foo deleted' });
    })
    .catch(next);
});

module.exports = router;
