import createError from 'http-errors';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContacts = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  try {
    const contacts = await getAll({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched contacts!',
      data: contacts,
    });
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
    if (!req.body.name || !req.body.phoneNumber) {
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

const ctrl = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};

export default ctrl;
