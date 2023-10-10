import model from '../model/role.js'
import validation from '../validation/role.js'
import jwt from 'jsonwebtoken'
import constant from '../helpers/constant.js'

const createRole = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
         const temp =  jwt.verify(token, constant.jwtConfig.secret)
       const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await model.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
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
     
      const checkValidation =  validation.createValidateRole(data)
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

        const checkRole2 = await model.getAllRoleDetail(data)
        if(checkRole2.length){
            return res.json({
                error: true,
                message: "There are users already associated with this Role.",
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
        
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const roles = temp.role

      const field = {
          id:roles
      }

      let role;
      const checkRole = await model.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
        const data = {
            status:1
        }
        role = await model.getAllRoleDetail(data) 
      }
      else{
        role = await model.getAllRoleDetail({})  
      }
      
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
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
        const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await model.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
      }

      const {id} = req.body
      const data = {
        id
      }

      const checkValidation = validation.deleteValidateRole(data)
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
        if(!checkRole2.length){
            return res.json({
                error: true,
                message: "No records found. delete failed",
                data: []
              }).end()
        }
  
        const roles = await model.deleteRole(data)
        if(roles){
        res.status(200).json({
            error: false,
            message: "Role has been deleted",
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

const updateRole = async(req,res)=>{
    try {
       
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await model.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
      }

      const {id , role_name} = req.body
      const data = {
        id , role_name
      }

      const checkValidation = validation.updateValidateRole(data)
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

        const roles = await model.getAllRoleDetail({id})
        if(!roles.length){
            return res.json({
                error: true,
                message: "No records found. update failed",
                data: []
              }).end()
        } 

        const updateRole = await model.updateRole(id,role_name)
        if(!updateRole){
            return res.json({
                error: true,
                message: "Something went wrong. please try again later",
                data: []
              }).end()
        }

        return res.json({
            error: false,
            message: "Role updated successfully",
            data: []
          }).end()


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

const deleteMultipleRoles = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
        const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await model.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
      }

        const {ids} = req.body
        const checkValidation = validation.deleteValidateMultipleRole({ids})
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

        const deletedMultipleRoles = await model.deletedMultipleRoles(ids)
        if(deletedMultipleRoles){
            return res.json({
                error: false,
                message: "Roles has been deleted",
                data:deletedMultipleRoles
            })
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

const paginateRole = async (req, res) =>{
    try {
      let { offset = 0, limit = 10, order = "asc", sort = "id", search, status } = req.body;
  
      const data = {
        offset,limit,order,sort,status
      }
  
      const checkValidation = validation.paginationValidateRole(data);
      if (checkValidation.error) {
        const details = checkValidation.error.details;
        const message = details.map((i) => {
          const err_msg = i.message;
          return err_msg.replace(/\"/g, "");
        });
        return res.json({
          error: true,
          message: message,
        });
      }
  
      const token = req.headers.authorization.split(" ")[1];
      const temp = jwt.verify(token, constant.jwtConfig.secret);
      const roles = temp.role;
      const uid = temp.id
  
      const field = {
        id: roles,
      };
  
      const checkRole = await model.getRoleDetail(field);
      if (checkRole.length && checkRole[0].role_name != "admin") {
        return res.json({
            error: true,
            message: "You don't have permission for this.",
            data: [],
          })
          .end();
      }
  
      let searchFrom = [
        "name"
      ]
  
      const total = await model.paginateRoleTotal(searchFrom,search,status)
      const rows = await model.paginateRole(limit,offset,sort,order,status,searchFrom,search)
      
      let data_rows = []
      if(order /*=== 'asc'*/)/*{
        let sr = total.total - (offset*limit)
        rows.forEach(row =>{
          row.sr = sr
          data_rows.push(row)
          sr--
        })
      }else*/{
        let sr = offset + 1
        rows.forEach(row =>{
          row.sr = sr
          data_rows.push(row)
          sr++
        })
      }
  
      return res.json({
        error: false,
        message: "Data has been fetched",
        data: {
          rows:data_rows
        },
      })
      
  
    } catch (error) {
      return res.json({
        error: true,
        message: "Something went wrong.",
        data: {
          error: error.message,
        },
      })
      .end();
    }
  }

export default {
    createRole,
    getRole,
    deleteRole,
    updateRole,
    deleteMultipleRoles,
    paginateRole
}