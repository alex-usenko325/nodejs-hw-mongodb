import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAll = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.name) contactsQuery.where('name').equals(filter.name);
  if (filter.email) contactsQuery.where('email').equals(filter.email);
  if (filter.phoneNumber)
    contactsQuery.where('phoneNumber').equals(filter.phoneNumber);
  if (filter.isFavourite !== undefined)
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  if (filter.contactType)
    contactsQuery.where('contactType').equals(filter.contactType);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find({ userId }).merge(contactsQuery).countDocuments(),
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

export const getById = async (id, userId) => {
  return ContactsCollection.findOne({ _id: id, userId });
};

export const create = async (data) => {
  return ContactsCollection.create(data);
};

export const update = async (id, userId, data) => {
  return ContactsCollection.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
  });
};

export const remove = async (id, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: id, userId });
};
