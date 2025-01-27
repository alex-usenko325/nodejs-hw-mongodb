import {
  find,
  findById,
  create as _create,
  findByIdAndUpdate,
  findByIdAndDelete,
} from '../models/contact';

const getAll = async () => find({});
const getById = async (id) => findById(id);
const create = async (data) => _create(data);
const update = async (id, data) => findByIdAndUpdate(id, data, { new: true });
const remove = async (id) => findByIdAndDelete(id);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
