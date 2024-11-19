import express from 'express'
import { add, getById, index,update,remove } from '../controller/product.controller.js';
import {auth} from '../middleware/auth.js'
const router = express.Router();

router.get('/',auth,index);
router.get('/:id',auth,getById);
router.post('/',auth,add);
router.put('/:id',auth,update);
router.delete('/:id',auth,remove);

export default router;
