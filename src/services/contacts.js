import Contact from '../module/contacts.js';

export const getAll = async () => Contact.find({});
export const getById = async (id) => Contact.findById(id);
export const create = async (data) => Contact.create(data);
export const update = async (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
export const remove = async (id) => Contact.findByIdAndDelete(id);
