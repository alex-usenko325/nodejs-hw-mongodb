import { Router } from 'express';
import ctrl from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { contactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactRouter = Router();

contactRouter.get('/', authenticate, ctrlWrapper(ctrl.getContacts));

contactRouter.get(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById),
);

contactRouter.use(authenticate);

contactRouter.post(
  '/',
  validateBody(contactSchema),
  ctrlWrapper(ctrl.createContact),
);

contactRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactSchema),
  ctrlWrapper(ctrl.updateContact),
);

contactRouter.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact));

export default contactRouter;
