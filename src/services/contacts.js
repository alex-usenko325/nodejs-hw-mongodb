import Contact from '../module/contacts.js';

const getAll = async () => Contact.find({});
const getById = async (id) => Contact.findById(id);
const create = async (data) => Contact.create(data);
const update = async (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
const remove = async (id) => Contact.findByIdAndDelete(id);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
