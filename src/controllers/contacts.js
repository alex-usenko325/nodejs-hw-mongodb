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
    const { id: userId } = req.user;
    const { page = 1, perPage = 10 } = parsePaginationParams(req.query) || {};
    const { sortBy = 'name', sortOrder = 'asc' } =
      parseSortParams(req.query) || {};
    const filter = { ...parseFilterParams(req.query), owner: userId };

    const contacts = await getAll({ page, perPage, sortBy, sortOrder, filter });

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createError(500, 'Failed to retrieve contacts', { cause: error }));
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { id: userId } = req.user;

    const contact = await getById(contactId, userId);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({ status: 200, data: contact });
  } catch (error) {
    next(error);
  }
};
export const createContact = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    if (!req.body.name || !req.body.phoneNumber) {
      return next(createError(400, 'Missing required fields: name or phone'));
    }

    const newContact = await create({ ...req.body, owner: userId });

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
  const { id: userId } = req.user;

  try {
    const contact = await getById(contactId);
    if (!contact || contact.owner.toString() !== userId) {
      throw createError(404, 'Contact not found');
    }

    const updatedContact = await update(contactId, req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;

  try {
    const contact = await getById(contactId);
    if (!contact || contact.owner.toString() !== userId) {
      throw createError(404, 'Contact not found');
    }

    await remove(contactId);

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
