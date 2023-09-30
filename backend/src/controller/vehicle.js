import model from '../model/vehicle.js'
import Rolemodel from '../model/role.js'
import validation from '../validation/vehicle.js'
import jwt from 'jsonwebtoken'
import constant from '../helpers/constant.js'


const addVehicle = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const role = temp.role

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

      const {name} = req.body
      const data = {
         name
      }

      const checkValidation = validation.createValidateVehicle(data)
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

        const checkVehicle = await model.getVehicle(data)
        if(checkVehicle.length){
            return res.json({
                error: true,
                message: "Vehicle entry already Exists.",
                data: []
              }).end()
          
        }

        const vehicle = await model.insertVehicle(data)
            if(vehicle){
            res.status(200).json({
                error: false,
                message: "Vehicle has been added",
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

const getVehicle = async(req,res)=>{
    try {
        
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const roles = temp.role

      const field = {
          id:roles
      }

      let vehicle;
      const checkRole = await Rolemodel.getRoleDetail(field)
      if(!checkRole.length || checkRole[0].role_name != 'admin'){
        const data = {
            status:1
        }
        vehicle = await model.getAllVehicle(data) 
      }
      else{
        vehicle = await model.getAllVehicle({})  
      }
      
      if(!vehicle){
           return res.status(404).json({
                error: false,
                message: "No records found",
                data: []
            });
        }

        return res.status(200).json({
            error:false,
            message:"Records found",
            data:vehicle
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

const deleteVehicle = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const role = temp.role

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

      const {id} = req.body
      const data ={
        id
      }

      const checkValidation = await validation.deleteValidateVehicle(data)
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

        const checkVehicle = await model.getVehicle(data)
        if(!checkVehicle.length){
        return res.json({
            error:false,
            message:"No records found. delete failed"
        })
      }

      const deleteVehicle = await model.deleteVehicle(data)
      if(deleteVehicle){
       return res.json({
            error: false,
            message: "Vehicle has been removed",
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

const updateVehicle = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const role = temp.role

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

      const {id, name} = req.body
      const data = {
        id,name
      }

      const checkValidation = await validation.updateValidateVehicle(data)
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

        const vehicle = await model.getAllVehicle({id})
        if(!vehicle.length){
            return res.json({
                error: true,
                message: "No records found. update failed",
                data: []
              }).end()
        } 

        const vehicles = await model.updateVehicle(id,name)
        if(!vehicles){
            return res.json({
                error: true,
                message: "Something went wrong. please try again later",
                data: []
              }).end()
        }

        return res.json({
            error: false,
            message: "Vehicle Information updated successfully",
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

export default {
    addVehicle,
    getVehicle,
    deleteVehicle,
    updateVehicle
}