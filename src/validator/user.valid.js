import Joi from 'joi'

export const registerValidate = Joi.object({
    username: Joi.string().required().min(6).messages({
        "string.empty": "Username không được để trống", // user: ''
        "any.required": "Username là bắt buộc", // Không có user: ''
        "string.base": "Username cần có kiểu dữ liệu chuỗi",
        "string.min":"Username cần tối thiểu 6 kí tự"
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email không được để trống", 
        "any.required": "Email là bắt buộc", 
        "string.base": "Email cần có kiểu dữ liệu chuỗi",
        "string.email": "Email sai định dạng",
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Password không được để trống", // user: ''
        "any.required": "Password là bắt buộc", // Không có user: ''
        "string.base": "Password cần có kiểu dữ liệu chuỗi",
        "string.min":"Password cần tối thiểu 6 kí tự"
    }),
})

export const loginValidate = Joi.object({
   
    email: Joi.string().required().email().messages({
        "string.empty": "Email không được để trống", 
        "any.required": "Email là bắt buộc", 
        "string.base": "Email cần có kiểu dữ liệu chuỗi",
        "string.email": "Email sai định dạng",
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Password không được để trống", // user: ''
        "any.required": "Password là bắt buộc", // Không có user: ''
        "string.base": "Password cần có kiểu dữ liệu chuỗi",
        "string.min":"Password cần tối thiểu 6 kí tự"
    }),
})