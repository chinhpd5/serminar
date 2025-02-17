import Joi from "joi";aaa

export const registerValidator = Joi.object({
  name: Joi.string().required().max(255).messages({
    "string.empty": "Không để trống Họ và tên",
    "any.required": "Họ và tên là bắt buộc",
    "string.max": "Họ và tên cần tối đa 255 ký tự",
    "string.base": "Họ và tên cần kiểu dữ liệu chuỗi"
  }),
  email: Joi.string().email().required().max(255).messages({
    "string.empty": "Không để trống email",
    "any.required": "email là bắt buộc",
    "string.max": "email cần tối đa 255 ký tự",
    "string.base": "email sai định dạng",
    "string.email": "email cần kiểu dữ liệu chuỗi",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Không để trống Password",
    "any.required": "Password là bắt buộc",
    "string.max": "Password cần tối đa 255 ký tự",
    "string.min": "Password cần tối thiểu 6 ký tự",
    "string.base": "Password cần kiểu dữ liệu chuỗi"
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    "string.empty": "Không để trống Xác nhận Password",
    "any.required": "Xác nhận Password là bắt buộc",
    "string.base": "Password cần kiểu dữ liệu chuỗi",
    "any.only": "Xác nhận mật khẩu không khớp"
  }),
  role: Joi.string().valid("member","author","admin").messages({
    "string.base": "role cần kiểu dữ liệu chuỗi",
    "any.only": "role chỉ nhận giá trị member, author hoặc admin"
  })
})

export const loginValidator = Joi.object({
  email: Joi.string().email().required().max(255).messages({
    "string.empty": "Không để trống email",
    "any.required": "email là bắt buộc",
    "string.max": "email cần tối đa 255 ký tự",
    "any.base": "email sai định dạng",
    "string.email": "sai định dạng email",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Không để trống Password",
    "any.required": "Password là bắt buộc",
    "string.max": "Password cần tối đa 255 ký tự",
    "string.min": "Password cần tối thiểu 6 ký tự",
    "string.base": "Password cần kiểu dữ liệu chuỗi"
  })
})