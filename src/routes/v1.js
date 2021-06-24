'use strict';

// 3rd party resources
const express = require('express');
const router = express.Router();

// Esoteric Resources
const dataModules = require('../models');
const basicAuth = require('../middleware/auth/basic');
const bearerAuth = require('../middleware/auth/bearer.js');
const permissions = require('../middleware/auth/acl.js');




router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearerAuth, permissions('read'), handleGetAll);
router.get('/:model/:id', bearerAuth, permissions('read'), handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.findOne({ where: { id:id }});
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let record = await req.model.findOne({ where: { id:id }});
  let updatedRecord = await record.update(obj);
  res.status(204).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.destroy({ where: { id:id }});
  res.status(204).json(deletedRecord);
}


module.exports = router;
