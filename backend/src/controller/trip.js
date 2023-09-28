import validation from '../validation/trip.js'
import model from '../model/trip.js'
import Rolemodel from '../model/role.js'

const createTrip = async(req,res) =>{
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
        const trip = await model.getAllTripDetails()
        if(!trip){
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
export default {
    createTrip,
    getTrip
}