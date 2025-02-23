import { Router } from 'express';
import ctrl from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { contactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(ctrl.getContacts));

contactRouter.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

contactRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(ctrl.createContact),
);

contactRouter.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(ctrl.updateContact),
);

contactRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(ctrl.updateContact),
);

contactRouter.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact));

export default contactRouter;
