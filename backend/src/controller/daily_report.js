import model from "../model/daily_report.js";
import validations from "../validation/daily_report.js";
import Rolemodel from "../model/role.js";
import jwt from 'jsonwebtoken'
import constant from "../helpers/constant.js";

const insertDailyReport = async (req, res) => {
  try {
    const {
      role,
      mine_no,
      vehicle,
      trip_type,
      with_lead,
      date,
      trips,
      quantity,
      rate,
      amount,
      remarks,
    } = req.body;
    const data = {
      role,
      mine_no,
      vehicle,
      trip_type,
      with_lead,
      date,
      trips,
      quantity,
      rate,
      amount,
      remarks,
    };

    const checkValidation = validations.createValidateDailyReport(data);
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
    if (!checkRole.length || checkRole[0].role_name == "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    data.amount = data.trips * (data.rate * data.quantity)
    data.userid = uid
    const id = await model.insertDailyReport(data)
    if(id.length){
        return res.status(200).json({
            error: false,
            message: "Daily report has been entered.",
            data: id,
        })
    }
  } catch (error) {
    return res
      .json({
        error: true,
        message: "Something went wrong.",
        data: {
          error: error.message,
        },
      })
      .end();
  }
};

const getAllDailyReport = async (req,res) =>{
  try {
  
    const reports = await model.getAllDailyReport()
    if(reports){
      res.json({
        error:false,
        message:"Reports has been fetched",
        data : reports
      })
    }

  } catch (error) {
    return res
    .json({
      error: true,
      message: "Something went wrong.",
      data: {
        error: error.message,
      },
    })
    .end();
  }
}

const getDailyReport = async (req,res) =>{
  try {
    let {id} = req.body
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const roles = temp.id;

    const field = {
      userid: roles,
    };
    let reports;
    
    if(id){
     reports = await model.getDailyReport({id})
    }else{
     reports = await model.getDailyReport(field)
    }
    
    if(reports){
      res.json({
        error:false,
        message:"Reports has been fetched",
        data : reports
      })
    }
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
  insertDailyReport,
  getAllDailyReport,
  getDailyReport
};
