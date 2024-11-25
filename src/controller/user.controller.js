import {registerValidate,loginValidate} from '../validator/user.valid.js'
import Users from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Đăng kí
export const register = async (req,res)=>{
    try {
        // B1: Kiểm tra (validate) dữ liệu đầu vào
        const {error} = registerValidate.validate(req.body,{abortEarly:false})
        if(error){
            const messageErrors = error.details.map(item => item.message);
            return res.status(400).json({message: messageErrors})
        }
        
        // B2: Kiểm tra email đã tồn tại hay chưa
        const exitsUser = await Users.findOne({email: req.body.email});
        // console.log(exitsUser);
        if(exitsUser){
            return res.status(400).json({message:"Đã tồn tại email, vui lòng đổi sang email khác"})
        }

        // B3: Mã hóa mật khẩu
        const hashPassword = await bcryptjs.hash(req.body.password,10);
        // console.log(hashPassword);

        // B4: Lưu data vào DB
        const user = await Users.create({
            ...req.body,// spread
            password: hashPassword
        })
        // xóa mật khẩu trả lại cho người dùng
        user.password = undefined
        // B5: Thông báo
        return res.status(201).json({
            message: "Đăng kí thành công",
            user, // user: user
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }
    
}

// Đăng nhập
export const login = async (req,res) =>{
    try {
        //B1: Kiểm tra (validate) dữ liệu
        const {error} = loginValidate.validate(req.body,{abortEarly: false})
        if(error){
            const messageErrors = error.details.map(item => item.message);
            return res.status(400).json({message: messageErrors})
        }

        //B2: Kiểm tra email có tồn tại hay không
        const exitsUser = await Users.findOne({email: req.body.email});
        // console.log(exitsUser);
        if(!exitsUser){ // nếu không tồn tại
            return res.status(404).json({message:"Sai email"})
        }

        //B3: Kiểm tra mật khẩu
        const isMath = await bcryptjs.compare(req.body.password,exitsUser.password)
        if(!isMath){
            // nếu không trùng mật khẩu
            return res.status(401).json({message:"Sai mật khẩu"})
        }
        //B4: sử JWT để tạo token
        const token = jwt.sign(
            {id: exitsUser.id},
            process.env.KEY_SECRET,// key sercret
            {expiresIn: '2h'} // thời gian tồn tại
        )

        //B5: Thông báo
        return res.status(201).json({
            message:"Đăng nhập thành công",
            user: {id: exitsUser.id, email: exitsUser.email, username: exitsUser.username},
            token // token: token
        })
    } catch (error) {
        res.status(500).json({message:error})
    }    
}