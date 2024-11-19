import express from 'express'
import { add, getById, index,update,remove } from '../controller/product.controller.js';
const router = express.Router();

router.get('/',index);
router.get('/:id',getById);
router.post('/',add);
router.put('/:id',update);
router.delete('/:id',remove);

export default router;
