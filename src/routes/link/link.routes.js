const express = require('express');
const { check } = require('express-validator');
const { linkPost, linkGet } = require('../../controllers/link/link.controllers');

const router = express.Router();

router.post('/link', [
  check('information', 'The field information is empty').trim().not().isEmpty(),
  check('time', 'Invalid Time').isIn(['seconds', 'minutes', 'hours', 'day', 'week']),
], linkPost);

router.get('/link/:dataId', linkGet);

module.exports = {
  router,
};
