import validation from "../validation/mine.js";
import model from "../model/mine.js";
import Rolemodel from "../model/role.js";
import jwt from "jsonwebtoken";
import constant from "../helpers/constant.js";
import knex from "../config/mysql_db.js";

const addMine = async (req, res) => {
  try {
    const {  code, name } = req.body;
    const data = {
    code,
    mine_name: name,
    };

    const checkValidation = validation.addValidateMine(data);
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
    const role = temp.role;

    const field = {
      role_name: role,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    const checkMine = await model.getMineData(data, null);
    if (checkMine.length >0) {
      return res
        .json({
          error: true,
          message: "Mine entry already Exists.",
          data: [],
        })
        .end();
    }

    const mine = await model.addMineData(data);
    if (mine.length >0) {
       return res.status(200).json({
        error: false,
        message: "Mine information has been added",
        data: [],
      });
    }

    return res.status(200).json({
      error: true,
      message: "Failed to insert",
      data: [],
    });

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

const getAllMine = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const roles = temp.role;

    const field = {
      role_name: roles,
    };

    let mine;
    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
      const data = {
        status: 1,
      };
      mine = await model.getAllMinesData(data);
    } else {
      mine = await model.getAllMinesData({});
    }

    if (!mine) {
      return res.status(404).json({
        error: false,
        message: "No records found",
        data: [],
      });
    }

    return res.status(200).json({
      error: false,
      message: "Records found",
      data: mine,
    });
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

const deleteMine = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const role = temp.role;

    const field = {
      role_name: role,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    const { id } = req.body;
    const data = {
      id,
    };

    const checkValidation = validation.deleteValidateMine(data);
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

    const checkMine = await model.getAllMinesData(data);
    if (!checkMine.length) {
      return res.json({
        error: false,
        message: "No records found. delete failed",
      });
    }

    const deleteMine = await model.deleteMine(data);
    console.log(deleteMine)
    if (deleteMine) {
      return res.json({
        error: false,
        message: "Mine has been removed",
        data: deleteMine,
      });
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

const updateMine = async (req,res)=>{
  try {
    const { id, code, name } = req.body;
    const data = {
      id,
      code,
      mine_name: name,
      };

      const checkValidation = validation.updateValidateMine(data);
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
    const role = temp.role;

    const field = {
      role_name: role,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    delete data.id
    const checkMine = await knex("mine").where(data).whereNot({id})
    if (checkMine.length > 0) {
      return res
        .json({
          error: true,
          message: "Mine entry already Exists.",
          data: [],
        })
        .end();
    }

    const updateMine = await model.updateMine({id},data)
    if(updateMine == 0){
      return res
      .json({
        error: true,
        message: "Failed to update",
        data: [],
      })
      .end();
    }

    return res
    .json({
      error: false,
      message: "Mine updated.",
      data: updateMine,
    })
    .end();

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

const deletedMultipleMines = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const role = temp.role;

    const field = {
      role_name: role,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    const { ids } = req.body;
    const checkValidation = validation.deleteValidateMultipleMines({ ids });
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

    const deletedMultipleMines = await model.deletedMultipleMines(ids)
        if(deletedMultipleMines){
            return res.json({
                error: false,
                message: "Vehicles has been deleted",
                data:deletedMultipleMines
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
};

const paginateMine = async (req, res) =>{
  try {
    let { offset = 0, limit = 10, order = "asc", sort = "id", search, status } = req.body;

    const data = {
      offset,limit,order,sort,status
    }

    const checkValidation = validation.paginationValidateMine(data);
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
      role_name: roles,
    };

    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
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

    const total = await model.paginateMineTotal(searchFrom,search,status)
    const rows = await model.paginateMines(limit,offset,sort,order,status,searchFrom,search)
    
    if(rows.length == 0){
      return res.json({
        error: true,
        message: "No data.",
        data: {
          rows
        },
      })
    }

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
  addMine,
  getAllMine,
  deleteMine,
  deletedMultipleMines,
  paginateMine,
  updateMine
};
