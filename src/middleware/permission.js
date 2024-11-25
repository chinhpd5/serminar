// 0: Member
// 1: Admin
import Users from '../model/user.model.js'
import Roles from '../model/role.model.js'
import Permissions from '../model/permission.model.js'
export const checkPermissionAdmin =async (req,res,next)=>{
    try {
        console.log(req.userId);
        // B1: Lấy thông tin(quyền) của người dùng
        const user = await Users.findById(req.userId);
        console.log(user);
        // B2: Kiểm tra Admin
        if(user.role != 1){
            return res.status(403).json({message: "Bạn không có quyền sử dụng chức năng này"})
        }

        // B3: Nếu là Admin, tiếp tục thực hiện các tác vụ tiếp theo
        next()
        
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export const checkPermission = async(req,res,next)=>{
    try {

        // B1: lấy thông tin của người dùng (admin,member,...)
        const user = await Users.findById(req.userId);
        // console.log(user);

        if(!user){
            return res.status(401).json({message: "Không có quyền(user)"})
        }

        // B2: Lấy danh sách các quyền của user đó
        const roles = await Roles.findOne({value: user.role}).populate('permissionsId');
        // console.log(roles);

        // B3: Kiểm tra api(url) có nằm trong quyền được cho phép (roles)
        // console.log(req.url);
        const isPermission = roles.permissionsId.some((role)=>{
            return role.name == req.url.replace("/","");
        })

        // console.log(isPermission);
        if(!isPermission){
            return res.status(403).json({message: "Bạn không có quyền sử dụng chức năng này"})
        }
        
        // Nếu có quyền
        next();
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}