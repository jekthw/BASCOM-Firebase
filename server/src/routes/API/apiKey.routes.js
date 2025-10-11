import { Router } from 'express';
import { createKey, getAPIKeys, deleteAPIKey } from '../../controller/API/apiKey.controller.js';

const router = Router();

router.post('/', createKey);
router.get('/:condition', getAPIKeys);
router.delete('/:apiKey', deleteAPIKey);

export default router;
