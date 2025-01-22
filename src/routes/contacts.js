import { Router } from 'express';
import { getAllContacts, getContactById } from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:contactId', getContactById);

export default contactsRouter;
