import Joi from 'joi';

export const productValidator = Joi.object({
    title: Joi.string().required().min(5).max(256).messages({
        "string.empty": "Không để trống tên sản phẩm",
        "any.required": "Tên sản phẩm là bắt buộc",
        "string.base":"Tên sản phẩm có kiểu dữ liệu chuỗi",
        "string.min": "Tên sản phẩm cần tối thiếu 5 ký tự",
        "string.max": "Tên sản phẩm có tối đa 256 ký tự"
    }),
    description: Joi.string().required().messages({
        "string.empty": "Không để trống Mô tả",
        "any.required": "Mô tả là bắt buộc",
        "string.base":"Mô tả sản phẩm có kiểu dữ liệu chuỗi",
    }),
    price: Joi.number().min(0).required().messages({
        "string.empty": "Không để trống Giá bán",
        "any.required": "Giá bán là bắt buộc",
        "number.min": "Giá tối thiểu bằng 0",
        "number.base":"Giá sản phẩm có kiểu dữ liệu số"
    }),
    stock: Joi.number().min(0).required().messages({
        "string.empty": "Không để trống Số lượng sản phẩm",
        "any.required": "Số lượng sản phẩm là bắt buộc",
        "number.min": "Số lượng tối thiểu bằng 0",
        "number.base":"Số lượng sản phẩm có kiểu dữ liệu số",
    }),
    categoryId: Joi.string().messages({
        "string.base":"Id danh mục sản phẩm có kiểu dữ liệu chuỗi",
    }),
    discountPercentage: Joi.number().messages({
        "number.base":"Giảm giá sản phẩm có kiểu dữ liệu số",
    }),
    rating: Joi.number().messages({
        "number.base":"Đánh giá sản phẩm có kiểu dữ liệu số",
    }),
})
