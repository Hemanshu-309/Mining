import Joi from "joi";
import knex from "../config/mysql_db.js";

const createPurchaseGroup = async (req, res) => {
  try {
    const schema = Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res
        .json({
          error: true,
          message: error.details[0].message,
          data: [],
        })
        .end();
    }

    const { code, name } = value;
    const data = {
      code,
      name,
    };

    const checkPg = await knex("purchase_groups").where(data).select('*')
    if(checkPg.length > 0){
        return res.json({
            error: true,
            message: "Purchase group already exists.",
        })
    }
    const insertPgId = await knex("purchase_groups").insert(data);
    if (!insertPgId) {
      return res
        .json({
          error: true,
          message: "Unable to add in database",
        })
        .end();
    }

    return res
      .json({
        error: false,
        message: "Purchase group created.",
      })
      .end();
  } catch (error) {
    return res
      .json({
        error: true,
        message: "Something went wrong",
      })
      .end();
  }
};

const updatePurchaseGroup = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res
        .json({
          error: true,
          message: error.details[0].message,
          data: [],
        })
        .end();
    }

    const { id, code, name } = value;
    const data = {
      code,
      name,
    };

    const checkPg = await knex("purchase_groups").select('*').where(data)
    
    if(checkPg.length > 0){
        return res.json({
            error: true,
            message: "Purchase group already exists.",
        })
    }

    const update_pg = await knex("purchase_groups").where({ id }).update(data);
    if (!update_pg) {
      return res
        .json({
          error: false,
          message: "Update in database failed",
        })
        .end();
    }

    return res
      .json({
        error: false,
        message: "Purchase group updated.",
      })
      .end();
  } catch (error) {
    return res
      .json({
        error: true,
        message: "Something went wrong",
      })
      .end();
  }
};

const deletePurchaseGroup = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res
        .json({
          error: true,
          message: error.details[0].message,
          data: [],
        })
        .end();
    }

    const { id } = value;

    const delete_pg = await knex("purchase_groups").where({ id }).delete();
    if (delete_pg) {
      return res.json({
        message: "Record deleted successfully",
      });
    } else {
      return res
        .json({
          message: "Record not found",
        })
        .status(404);
    }
  } catch (error) {
    return res
      .json({
        error: true,
        message: "Something went wrong",
      })
      .end();
  }
};

const viewPurchaseGroup = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res
        .json({
          error: true,
          message: error.details[0].message,
          data: [],
        })
        .end();
    }

    const { id } = value;

    const result = await knex("purchase_groups").select().where({ id });
    if (result.length == 0) {
      return res
        .json({
          error: true,
          message: "Purchase group not found",
          data: error,
        })
        .end();
    }
    delete result[0].updated_at;
    delete result[0].created_at;

    return res
      .json({
        error: false,
        message: "View successful",
        data: result,
      })
      .end();
  } catch (error) {
    return res
      .json({
        error: true,
        message: "Something went wrong",
      })
      .end();
  }
};

const paginatePurchaseGroup = async (req,res)=>{
    try {
    const tableName = "purchase_groups";
    const searchFrom = ["code","name"];

    const schema = Joi.object({
      offset: Joi.number().default(0),
      limit: Joi.number().default(50),
      sort: Joi.string().default("id"),
      order: Joi.string().valid("asc", "desc").default("desc"),
      status: Joi.string().valid("0", "1", "").default(""),
      search: Joi.string().allow("", null).default(null),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.json({
        error: true,
        message: error.details[0].message,
        data: error,
      });
    }

    let total = 0;

    let { offset, limit, order, sort, search, status } = value;
    let results = knex(tableName);
    if (status != undefined && status != "") {
      total = results.where("status", status);
    }
    results = results.where(function () {
      if (search != undefined && search != "") {
        searchFrom.forEach((element) => {
          this.orWhereILike(element, `%${search}%`);
        });
      }
    }); 
    total = await results.count("id as total").first();
    let rows = knex(tableName);

    if (status != undefined && status != "") {
      rows.where("status", status);
    }
    rows = rows.where(function () {
      if (search != undefined && search != "") {
        searchFrom.forEach((element) => {
          this.orWhereILike(element, `%${search}%`);
        });
      }
    });
    rows = await rows.orderBy(sort, order).limit(limit).offset(offset);
    let data_rows = [];
    if (order === "desc") {
      let sr = offset + 1;
      await rows.forEach((row) => {
        row.sr = sr;
        delete row.password;
        data_rows.push(row);
        sr++;
      });
    } else {
      let sr = total.total - limit * offset;
      await rows.forEach((row) => {
        row.sr = sr;
        delete row.password;
        data_rows.push(row);
        sr--;
      });
    }
    res.status(200).json({
      error: false,
      message: "retrieved successfully.",
      data: {
        total: total.total,
        rows: data_rows,
        
      },
    });
  
    } catch (error) {
        return res
        .json({
          error: true,
          message: "Something went wrong",
        })
        .end();
    }
}
export default {
  createPurchaseGroup,
  updatePurchaseGroup,
  deletePurchaseGroup,
  viewPurchaseGroup,
  paginatePurchaseGroup
};
