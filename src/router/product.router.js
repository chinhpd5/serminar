import express from 'express'
import { add, getById, index,update,remove } from '../controller/product.controller.js';
import {checkAuth} from '../middleware/auth.js'
const router = express.Router();

router.get('/',checkAuth,index);
router.get('/:id',getById);
router.post('/',add);
router.put('/:id',update);
router.delete('/:id',remove);

export default router;
