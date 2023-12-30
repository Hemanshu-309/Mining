import model from "../model/vehicle.js";
import Rolemodel from "../model/role.js";
import validation from "../validation/vehicle.js";
import jwt from "jsonwebtoken";
import constant from "../helpers/constant.js";

const addVehicle = async (req, res) => {
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

    const { name,std_qty } = req.body;
    const data = {
      name,
      std_qty
    };

    const checkValidation = validation.createValidateVehicle(data);
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

    const checkVehicle = await model.getVehicle(data);
    if (checkVehicle.length) {
      return res
        .json({
          error: true,
          message: "Vehicle entry already Exists.",
          data: [],
        })
        .end();
    }

    const vehicle = await model.insertVehicle(data);
    if (vehicle) {
      res.status(200).json({
        error: false,
        message: "Vehicle has been added",
        data: [],
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

const getVehicle = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const roles = temp.role;

    const field = {
      role_name: roles,
    };

    let vehicle;
    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role != "admin") {
      const data = {
        status: 1,
      };
      vehicle = await model.getAllVehicle(data);
    } else {
      vehicle = await model.getAllVehicle({});
    }

    if (!vehicle) {
      return res.status(404).json({
        error: false,
        message: "No records found",
        data: [],
      });
    }

    return res.status(200).json({
      error: false,
      message: "Records found",
      data: vehicle,
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

const deleteVehicle = async (req, res) => {
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

    const checkValidation = validation.deleteValidateVehicle(data);
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

    const checkVehicle = await model.getVehicle(data);
    if (!checkVehicle.length) {
      return res.json({
        error: false,
        message: "No records found. delete failed",
      });
    }

    const deleteVehicle = await model.deleteVehicle(data);
    if (deleteVehicle) {
      return res.json({
        error: false,
        message: "Vehicle has been removed",
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

const updateVehicle = async (req, res) => {
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

    const { id, name,std_qty } = req.body;
    const data = {
      id,
      name,
      std_qty
    };

    const checkValidation =  validation.updateValidateVehicle(data);
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

    const vehicle = await model.getAllVehicle({ id });
    if (!vehicle.length) {
      return res
        .json({
          error: true,
          message: "No records found. update failed",
          data: [],
        })
        .end();
    }

    delete data.id
    const duplicate = await knex("vehicles").where(data).whereNot({id})
    if (duplicate.length > 0) {
      return res
        .json({
          error: true,
          message: "Vehicle entry already Exists.",
          data: [],
        })
        .end();
    }  


    const vehicles = await model.updateVehicle(id, name,std_qty);
    if (!vehicles) {
      return res
        .json({
          error: true,
          message: "Something went wrong. please try again later",
          data: [],
        })
        .end();
    }

    return res
      .json({
        error: false,
        message: "Vehicle Information updated successfully",
        data: [],
      })
      .end();
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

const deleteMultipleVehicles = async (req, res) => {
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
    const checkValidation = validation.deleteValidateMultipleVehicle({ ids });
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

    const deletedMultipleRoles = await model.deletedMultipleVehicle(ids);
    if (deletedMultipleRoles) {
      return res.json({
        error: false,
        message: "Vehicles has been deleted",
        data: deletedMultipleRoles,
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

const paginateVehicle = async (req, res) =>{
  try {
    let { offset = 0, limit = 10, order = "asc", sort = "id", search, status } = req.body;

    const data = {
      offset,limit,order,sort,status
    }

    const checkValidation = validation.paginationValidateVehicle(data);
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
      "name"
    ]

    const total = await model.paginateVehicleTotal(searchFrom,search,status)
    const rows = await model.paginateVehicle(limit,offset,sort,order,status,searchFrom,search)
    
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
  addVehicle,
  getVehicle,
  deleteVehicle,
  updateVehicle,
  deleteMultipleVehicles,
  paginateVehicle
};
