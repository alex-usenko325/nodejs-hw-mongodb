const express = require('express');
const { getAllContacts, getContactById } = require('../controllers/contacts');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);

module.exports = router;
