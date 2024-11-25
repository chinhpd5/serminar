import jwt from 'jsonwebtoken'
import 'dotenv/config'

// xác thực người dùng
export const auth = async (req,res,next)=>{
    try {
        // lấy token từ headers
        const token = req.headers?.authorization?.split(' ')[1];
        // console.log(token);
        if(!token){
            return res.status(401).json({message: "Thiếu token"});
        }
        
        // sử dụng thư viện jwt để kiểm tra token
        jwt.verify(token,process.env.KEY_SECRET,(err,decode)=>{
            if(err){
                //nếu có lỗi
                return res.status(401).json({message: "Sai token hoặc token hết hạn"})
            }
            // console.log(decode);
            
            // lưu trữ thông tin token
            req.userId = decode.id;

            // nếu xác thực thành công -> gọi đến tác vụ tiếp
            next();
        })
        
    } catch (error) {
        
    }
    
}