import createError from 'http-errors';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/contacts.js';

const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await getAll();
    res.status(200).json({ status: 200, data: contacts });
  } catch {
    next(createError(500, 'Failed to retrieve contacts'));
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getById(contactId);
    if (!contact) throw createError(404, 'Contact not found');
    res.status(200).json({ status: 200, data: contact });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.phoneNumber) {
      const error = createError(
        400,
        'Missing required fields: name or phoneNumber',
      );
      return next(error);
    }

    const newContact = await create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    next(createError(500, 'Failed to create contact'));
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await update(contactId, req.body);
    if (!updatedContact) throw createError(404, 'Contact not found');
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deleted = await remove(contactId);
    if (!deleted) throw createError(404, 'Contact not found');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
