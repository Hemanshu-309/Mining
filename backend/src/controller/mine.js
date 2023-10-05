import validation from "../validation/mine.js";
import model from "../model/mine.js";
import Rolemodel from "../model/role.js";
import jwt from "jsonwebtoken";
import constant from "../helpers/constant.js";

const addMine = async (req, res) => {
  try {
    const { id, code, name } = req.body;
    const data = {
      id,
      code,
      name,
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

    console.log("1");
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const role = temp.role;

    const field = {
      id: role,
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

    const checkMine = await model.getMineData(data, {});
    if (checkMine.length) {
      return res
        .json({
          error: true,
          message: "Mine entry already Exists.",
          data: [],
        })
        .end();
    }

    const mine = await model.addMineData(data);
    if (mine) {
      res.status(200).json({
        error: false,
        message: "Mine information has been added",
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

const getAllMine = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const roles = temp.role;

    const field = {
      id: roles,
    };

    let mine;
    const checkRole = await Rolemodel.getRoleDetail(field);
    if (checkRole.length && checkRole[0].role_name != "admin") {
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
      id: role,
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
    if (deleteMine) {
      return res.json({
        error: false,
        message: "Mine has been removed",
        data : deleteMine
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


export default {
  addMine,
  getAllMine,
  deleteMine
};
