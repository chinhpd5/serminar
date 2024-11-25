import express from 'express'
import { add, getById, index,update,remove } from '../controller/product.controller.js';
import {auth} from '../middleware/auth.js'
import {checkPermissionAdmin,checkPermission} from '../middleware/permission.js'
const router = express.Router();
/**
 * Member: lấy thông tin sản phẩm
 * Admin: Lấy, thêm, sửa, xóa sản phẩm
 */

router.get('/product-list',auth,checkPermission,index);// lấy thông tin sản phẩm
router.get('/:id',auth,checkPermission,getById);
router.post('/product-add',auth,checkPermission,add);// thêm mới: admin
router.put('/:id',auth,checkPermission,update);// cập nhật admin
router.delete('/:id',auth,checkPermission,remove);

export default router;
