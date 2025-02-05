import Contact from '../module/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getById = async (id) => Contact.findById(id);
export const create = async (data) => Contact.create(data);
export const update = async (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
export const remove = async (id) => Contact.findByIdAndDelete(id);
export const getAll = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
