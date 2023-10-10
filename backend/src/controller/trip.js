import validation from '../validation/trip.js'
import model from '../model/trip.js'
import Rolemodel from '../model/role.js'
import jwt from 'jsonwebtoken'
import constant from '../helpers/constant.js'

const createTrip = async(req,res) =>{
    try {

        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
        const role = temp.role

        const field = {
            id:role
        }

        const checkRole = await Rolemodel.getRoleDetail(field)
        if(checkRole.length && checkRole[0].role_name != 'admin'){
            return res.json({
                error: true,
                message: "You don't have permission for this.",
                data: []
              }).end()
          
        }

        const {trip_type} = req.body

        const data ={
            type:trip_type
        }

        const checkValidation = validation.createValidateTripType(data)
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

        const checkTrip = await model.getTripDetails(data)
        if(checkTrip.length){
            return res.json({
                error: true,
                message: "Trip Type already Exists.",
                data: []
              }).end()
          
        }

        const trip = await model.insertTrip(data)
            if(trip){
            res.status(200).json({
                error: false,
                message: "Trip Type has been created",
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

const getTrip = async(req,res)=>{
    try {

        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const roles = temp.role

      const field = {
          id:roles
      }

      let trip;
      const checkRole = await Rolemodel.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
        const data = {
            status:1
        }
        trip = await model.getAllTripDetails(data) 
      }
      else{
        trip = await model.getAllTripDetails({})  
      }


        
        if(!trip.length){
           return res.status(404).json({
                error: false,
                message: "No records found",
                data: []
            });
        }

        return res.status(200).json({
            error:false,
            message:"Records found",
            data:trip
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

const deleteTrip = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await Rolemodel.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
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

      const checkValidation = validation.deleteValidateTripType(data)
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


      const checkTrip = await model.getTripDetails(data)
      if(!checkTrip.length){
        return res.json({
            error:false,
            message:"No data found"
        })
      }

      const deleteTrip = await model.deleteTrip(data)
      if(deleteTrip){
       return res.json({
            error: false,
            message: "Trip type has been deleted",
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

const deletedMultipleTrip = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
        const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await Rolemodel.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
      }

        const {ids} = req.body
        const checkValidation = validation.deleteValidateMultipleTripType({ids})
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



        const deletedMultipleTrip = await model.deletedMultipleTrip(ids)
        if(deletedMultipleTrip){
            return res.json({
                error: false,
                message: "Trip types has been deleted",
                data:deletedMultipleTrip
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

const updateTrip = async (req,res) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
      const role = temp.role

      const field = {
          id:role
      }

      const checkRole = await Rolemodel.getRoleDetail(field)
      if(checkRole.length && checkRole[0].role_name != 'admin'){
          return res.json({
              error: true,
              message: "You don't have permission for this.",
              data: []
            }).end()
        
      }

      const {id,type} = req.body
      const data = {
        id,
        type
      }

      const checkValidation = validation.updateValidateTripType(data)
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

        const updateTrip = await model.updateTrip(id,type)
        if(updateTrip){
            return res.json({
                error: false,
                message: "Trip type has been updated",
                data:updateTrip
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

const paginateTrip = async (req, res) =>{
    try {
      let { offset = 0, limit = 10, order = "asc", sort = "id", search, status } = req.body;
  
      const data = {
        offset,limit,order,sort,status
      }

      const checkValidation = validation.paginationValidateTrip(data);
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
  
      const checkRole = await Rolemodel.getRoleDetail(field);
      if (checkRole.length && checkRole[0].role_name != "admin") {
        return res
          .json({
            error: true,
            message: "You don't have permission for this.",
            data: [],
          })
          .end();
      }
  
  
  
      let searchFrom = [
        "mine_name","code"
      ]
  
      const total = await model.paginateTripTotal(searchFrom,search,status)
      const rows = await model.paginateTrip(limit,offset,sort,order,status,searchFrom,search)
      
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
    createTrip,
    getTrip,
    deleteTrip,
    updateTrip,
    deletedMultipleTrip,
    paginateTrip
}