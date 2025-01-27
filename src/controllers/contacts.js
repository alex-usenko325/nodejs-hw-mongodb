import createError from 'http-errors';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/contacts.js';

const getAllContacts = async (_, res) => {
  const contacts = await getAll();
  res.status(200).json({ status: 200, data: contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getById(contactId);
  if (!contact) throw createError(404, 'Contact not found');
  res.status(200).json({ status: 200, data: contact });
};

const createContact = async (req, res) => {
  try {
    if (!req.body.name || !req.body.phone) {
      throw createError(400, 'Missing required fields: name or phone');
    }

    const newContact = await create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    throw createError(500, 'Failed to create contact');
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await update(contactId, req.body);
  if (!updatedContact) throw createError(404, 'Contact not found');
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await remove(contactId);
  if (!deleted) throw createError(404, 'Contact not found');
  res.status(204).end();
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
