import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
import { loginValidator, registerValidator } from "../validator/auth.valid.js"
import bcryptjs from 'bcryptjs'
import 'dotenv/config'

export const register = async (req,res) =>{
  try {
    // Bước 1: Validate dữ liệu
    const {error} = registerValidator.validate(req.body,{abortEarly:false}) 
    if(error){
      const messages = error.details.map(item => item.message)
      return res.status(400).json({
        success: false,
        messages: messages
      })
    }

    // Bước 2: Kiểm tra tài khoản đã tồn tại
    const exitUser = await User.findOne({email: req.body.email})
    if(exitUser){
      return res.status(400).json({
        success: false,
        messages: "Tài khoản (email) đã tồn tại, vui lòng sử dụng email khác"
      })
    }
    // Bước 3: Mã hóa mật khẩu
    const hashPassword = await bcryptjs.hash(req.body.password,10)
    
    // Bước 4: Lưu thông tin
    const userRes = await User.create({
      ...req.body,
      password: hashPassword
    })

    userRes.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      data: userRes
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

export const login = async (req,res) =>{
  try {
    // Bước 1: Validate dữ liệu
    const {error} = loginValidator.validate(req.body,{abortEarly:false})
    if(error){
      const message = error.details.map(item => item.message);
      res.status(400).json({
        success: false,
        message //message: message
      })
    }

    // Bước 2: Kiểm tra tài khoản có tồn tại không
    const exitUser = await User.findOne({email: req.body.email});
    if(!exitUser){
      return res.status(400).json({
        success: false,
        message: "Sai tài khoản"
      })
    }

    // Bước 3: Kiểm tra mật khẩu
    const isMath = await bcryptjs.compare(req.body.password, exitUser.password);
    if(!isMath){
      res.status(400).json({
        success: false,
        message: "Sai mật khẩu"
      })
    }
    // Bước 4: tạo token
    const token = await jwt.sign({userId: exitUser.id},process.env.KEY_SECRET,{expiresIn: '2h'})

    // Bước 5: Thông báo
    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}