import Contact from '../module/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAll = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const parsedFilters = filter;

  const contactsQuery = Contact.find(parsedFilters);

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getById = async (id) => Contact.findById(id);

export const create = async (data) => Contact.create(data);

export const update = async (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });

export const remove = async (id) => Contact.findByIdAndDelete(id);
