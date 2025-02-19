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
  try {
    const userId = req.user.id;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = { ...parseFilterParams(req.query), owner: userId };

    const contacts = await getAll({ page, perPage, sortBy, sortOrder, filter });

    res
      .status(200)
      .json({ status: 200, message: 'Contacts retrieved!', data: contacts });
  } catch (error) {
    next(createError(500, 'Failed to retrieve contacts', { cause: error }));
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;

    const contact = await getById(contactId, userId);
    if (!contact) throw createError(404, 'Contact not found');

    res
      .status(200)
      .json({ status: 200, message: 'Contact found!', data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    console.log('req.user:', req.user);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: no user ID' });
    }

    console.log('Creating contact with userId:', userId);
    const newContact = await create({ ...req.body, userId });

    res
      .status(201)
      .json({ status: 201, message: 'Contact created!', data: newContact });
  } catch (error) {
    next(createError(500, 'Failed to create contact', { cause: error }));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;

    const contact = await update(contactId, userId, req.body);
    if (!contact) throw createError(404, 'Contact not found');

    res
      .status(200)
      .json({ status: 200, message: 'Contact updated!', data: contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;

    const contact = await remove(contactId, userId);
    if (!contact) throw createError(404, 'Contact not found');

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
