import model from '../model/role.js'
import validation from '../validation/role.js'

const createRole = async(req,res)=>{
    try {
          // const token = req.headers.authorization.split(" ")[1]
      //  const temp =  jwt.verify(token, constant.accessToken.secret).data
      const role = 1

      const field = {
          id:role
      }

      const checkRole = await Rolemodel.getRoleDetail(field)
      if(!checkRole.length || checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
      }

      const {role_name} = req.body

      const data = {
        role_name
      }

      const checkValidation = validation.createValidateRole(data)
        if (checkValidation.error) {
            const details = checkValidation.error.details;
            const message = details.map(i => {
                const err_msg = i.message;
                return err_msg.replace(/\"/g, '');
            });
            return res.json({
                error: true,
                message: message
            })
        }

        const checkRole2 = await model.getAllRoleDetail()
        if(checkRole2){
            return res.json({
                error: true,
                message: "Role already Exists.",
                data: []
              }).end()
        }

        const roles = await model.insertRole(data)
        if(roles){
        res.status(200).json({
            error: false,
            message: "Role has been created",
            data: []
        });
    }
   
    } catch (error) {
        return res.json({
            error: true,
            message: "Something went wrong.",
            data: {
              error: error.message
            }
          }).end()
    }
}

export default {
    createRole
}