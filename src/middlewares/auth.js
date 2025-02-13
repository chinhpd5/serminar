import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const checkAuth  = async (req,res,next) =>{
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    // console.log(token);
    if(!token){
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy token"
      })
    }

    jwt.verify(token,process.env.KEY_SECRET,(err,decode)=>{
      if(err){
        return res.status(400).json({
          isSucces: false,
          message: "Sai token hoặc token hết hạn"
        })
      }
      
      req.user = decode

      next();
    })

  } catch (error) {
    return res.status(500).json({
      isSucces: false,
      message: error
    })
  }

}