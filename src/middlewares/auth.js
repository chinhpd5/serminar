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
        if (err.name == "JsonWebTokenError") {
          return res.status(401).json({ 
            isSucces: false,
            message: "Sai token" 
          });
        }else if(err.name === "TokenExpiredError")
          return res.status(401).json({
            isSucces: false,
            message: "Token hết thời hạn"
        });
      
      }
      
      req.user = decode

      next();
    })

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      isSucces: false,
      message: error
    })
  }

}