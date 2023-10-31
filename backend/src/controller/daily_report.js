import model from "../model/daily_report.js";
import validations from "../validation/daily_report.js";
import Rolemodel from "../model/role.js";
import jwt from 'jsonwebtoken'
import constant from "../helpers/constant.js";

const insertDailyReport = async (req, res) => {
  try {
    const {
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

    console.log(roles)
    const field = {
      id: roles,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role_name == "admin") {
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
    data.role_id = roles
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
    const {id} = req.body
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const userid = temp.id;

    const field = {
      userid
    };
    let reports;
    
    if(id){
      reports = await model.getDailyReport(id,userid)
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

const deleteReport = async (req,res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const uid = temp.id;

    const {id} = req.body
    let data = {
      id
    }

    const checkValidation = validations.deleteValidateDailyReport(data);
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

    data.userid = uid

    const checkReport = await model.getDailyReport(data)
    if(!checkReport.length){
      return res.json({
        error:false,
        message:"No report found",
        data : []
      })
    }

    const deleted_report = await model.deleteReport(data)
    console.log(deleted_report)
    if(deleted_report > 0){
     return res.json({
        error:false,
        message:"Reports has been deleted",
        data : deleted_report
      })
    }

   return res.json({
      error:false,
      message:"Failed to delete report",
      data : []
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

const paginateDailyReport = async(req,res) =>{
  try {
    let { offset = 0, limit = 10, order = "asc", sort = "id", search, status,id,date1,date2 } = req.body;

    const data = {
      offset,limit,order,sort,status,id
    }

    const checkValidation = validations.paginationValidateDailyReport(data);
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
    const userid = temp.id

    const field = {
      id: roles,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role_name == "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    let searchFrom = [
        "mine_name","role_name","vehicle","type","name","with_lead","date"
    ]

    const total = await model.paginateDailyReportTotal(searchFrom,search,status)
    const rows = await model.paginateDailyReport(limit,offset,sort,order,status,searchFrom,search,id,userid,date1,date2)
    
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
  }
}

export default {
  insertDailyReport,
  getAllDailyReport,
  getDailyReport,
  deleteReport,
  paginateDailyReport,
};
