import User from "../model/user.model.js";
import Role from "../model/role.model.js";
import Permission from "../model/permission.model.js";

export const checkAdmin = async (req,res,next) =>{
  try {
    const exitsUser = await User.findById(req.user.userId).populate('roleId');
    if(!exitsUser){
      return res.status(400).json({
        isSucces: false,
        message: "Không tìm thấy user"
      })
    }
    console.log(exitsUser);
    
    if(exitsUser?.roleId?.name != 'admin'){
      return res.status(403).json({
        isSuccess: false,
        message: "Bạn không có quyền truy cập chức năng này"
      })
    }

    next();
    
  } catch (error) {
    
    return res.status(400).json({
      isSucces: false,
      message: error
    })
  }
  
}

export const checkPermission = (namePermission) =>{
  return  async (req,res,next) =>{
    try {
      const exitsUser = await User.findById(req.user.userId);
      
      if(!exitsUser){
        return res.status(400).json({
          isSucces: false,
          message: "Không tìm thấy user"
        })
      }

      const role = await Role.findOne({name: exitsUser.role }).populate('permissions');
      
      const checkPermission = role?.permissions.some((permission)=>{
        return permission.name == namePermission
      })

      if(!checkPermission){
        return res.status(403).json({
          isSucces: false,
          message: "Bạn không có quyền sử dụng chức năng này"
        })
      }
      next()

    } catch (error) {
      return res.status(400).json({
        isSucces: false,
        message: error
      })
    }
  }
}