import express from 'express'
import { add, getById, index,update,remove } from '../controller/product.controller.js';
const router = express.Router();
import {checkAuth} from '../middlewares/auth.js'
import { checkAdmin, checkPermission } from '../middlewares/perrmission.js';

router.get('/',checkAuth,checkPermission('product-list'),index);
router.get('/:id',checkAuth,checkPermission('product-list'),getById);
router.post('/',checkAuth,checkPermission('product-add'),add);
router.put('/:id',checkAuth,checkPermission('product-edit'),update);
router.delete('/:id',checkAuth,checkPermission('product-delete'),remove);

export default router;
