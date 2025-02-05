import createError from 'http-errors';
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getContactsPage,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const contact = await getAll();
    res.status(200).json({ status: 200, data: contact });
  } catch {
    next(createError(500, 'Failed to retrieve contacts'));
  }
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getById(contactId);
    if (!contact) throw createError(404, 'Contact not found');
    res.status(200).json({ status: 200, data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.phone) {
      const error = createError(400, 'Missing required fields: name or phone');
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

export const updateContact = async (req, res, next) => {
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

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deleted = await remove(contactId);
    if (!deleted) throw createError(404, 'Contact not found');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const contacts = await getContactsPage({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully contacts!',
    data: contacts,
  });
};

const ctrl = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getContactsController,
};

export default ctrl;
