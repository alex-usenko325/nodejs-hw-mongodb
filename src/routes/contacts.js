import { Router } from 'express';
import ctrl from '../controllers/contacts';
import ctrlWrapper from '../utils/ctrlWrapper';

const router = Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', ctrlWrapper(ctrl.createContact));
router.patch('/:contactId', ctrlWrapper(ctrl.updateContact));
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

export default router;
