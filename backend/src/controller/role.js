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

      const checkRole = await model.getRoleDetail(field)
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
      console.log(data)

      const checkValidation = await validation.createValidateRole(data)
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

        const checkRole2 = await model.getRoleDetail(data)
        console.log(checkRole2)
        if(checkRole2.length){
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

const getRole = async(req,res) =>{
    try {
        const role = await model.getAllRoleDetail()
        if(!role){
           return res.status(404).json({
                error: false,
                message: "No records found",
                data: []
            });
        }

        return res.status(200).json({
            error:false,
            message:"Records found",
            data:role
        })

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

const deleteRole = async(req,res)=>{
    try {
      // const token = req.headers.authorization.split(" ")[1]
      //  const temp =  jwt.verify(token, constant.accessToken.secret).data
      const role = 1

      const field = {
          id:role
      }

      const checkRole = await model.getRoleDetail(field)
      if(!checkRole.length || checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
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
    createRole,
    getRole
}