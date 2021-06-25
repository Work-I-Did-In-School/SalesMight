'use strict';

// 3rd party resources
const express = require('express');
const router = express.Router();

// Esoteric Resources
const { notes } = require('../models/index');
const dataModules = require('../models');
const bearerAuth = require('../middleware/auth/bearer.js');
const permissions = require('../middleware/auth/acl.js');



// localhost:3001/api/v2/food/
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});
/** 
 * @param 
*/
router.get('/:model', bearerAuth, permissions('read'), handleGetAll); 
router.get('/:model/:id', bearerAuth, permissions('read'), handleGetSome); // sends back all customers associates with a sales person
router.get('/:model/:salespersonid/:customerid', bearerAuth, permissions('read'), handleGetOne); // one customer and notes
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);


async function handleGetAll(req, res) {
  let allRecords = await req.model.findAll();
  res.status(200).json(allRecords);
}

// TODO: change to get associations
async function handleGetOne(req, res) {
  const {salespersonid, customerid} = req.params;

  let theRecord = await req.model.findOne({ 
    where: { id:customerid },
    include: notes,
  });
  res.status(200).json(theRecord);
}

async function handleGetSome(req, res) {
  const id = req.params.id;

  let records = await req.model.findAll({
    where: {salesPerson: id},
  });
  res.status(200).json(records);
}

// TODO: handler to specifically create notes
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
