import validation from "../validation/users.js";
import model from "../model/users.js";
import md5 from "md5";
import constant from "../helpers/constant.js";
import jwt from "jsonwebtoken";
import Rolemodel from '../model/role.js'
import fs from "../helpers/functions.js";

const createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      username,
      mobile,
      
    } = req.body;

    const data = {
      username: username.toLowerCase().trim(),
      firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1).trim(),
      lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1).trim(),
      email: email,
      mobile: mobile,
      password: password,
      status: 1,
    };

    const checkValidation = validation.createValidateUser(data);
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

    const checkUsername = await model.getUserDetail({ username });
    if (checkUsername.length) {
      return res.status(200).json({
        error: true,
        message: "Username already exist...",
        data: [],
      });
    }

    const checkEmail = await model.getUserDetail({ email });
    if (checkEmail.length) {
      return res.status(200).json({
        error: true,
        message: "Email already exist...",
        data: [],
      });
    }

    const checkAdmin = await Rolemodel.getRoleDetail({role_name:"admin"})
    if(checkAdmin == 0){
      return res.status(200).json({
        error: true,
        message: "There is no admin role.",
        data: [],
      });
    }
    if(role === checkAdmin[0].id)
    {
      return res.status(200).json({
        error: true,
        message: "Admin already exist...",
        data: [],
      });
    }

    const userId = await model.createUser({ ...data, password: md5(password) });
    if (userId) {
      await fs.accountCreated(email);
      return res.status(200).json({
        error: false,
        message: "User has been created",
        data: userId,
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

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let data = {
      email: email,
      password: password,
    };

    const checkValidation = validation.loginValidateUser(data);
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
   
    data.password = md5(password);
    let userData = await model.getUserDetail(null,1,{email});
    if (userData.length == 0) {
      return res.json({
        Error: true,
        Message: "No user found.",
        Data: [],
      });
    }
    
    if(userData[0].password != md5(password)){
      return  res.json({
        Error: true,
        Message: "Invalid credentials",
        Data: [],
      });
    } 
    delete userData[0].status;
    delete userData[0].password;

    const { jwtConfig } = constant;

    const accessToken = jwt.sign(
      {
        id: userData[0].id,
        //role: userData[0].role,
        email: userData[0].email,
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expireTime }
    );

    const refreshToken = jwt.sign(
      {
        id: userData[0].id,
       // role: userData[0].role,
        email: userData[0].email,
      },
      jwtConfig.refreshSecret,
      {
        expiresIn: jwtConfig.refreshTokenExpireTime,
      }
    );
  
    res.status(200).json({
      error: false,
      message: "User Logged In successfully",
      data: {
        userData: userData[0],
        accessToken,
        refreshToken,
      },
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

const deleteUser = async (req, res) => {
  try {
    const { password } = req.body;
    const data = {
      password,
    };
    const checkValidation = validation.deleteValidateUser(data);
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
    const id = temp.id;
    const email = temp.email;

    const field = {
      email,
    };

    field.password = md5(password);

    const checkUser = await model.getUserDetail(field);
    if (!checkUser.length) {
      return res.json({
        error: true,
        message: "Invalid credentials",
        data: [],
      });
    }

    const deleteUser = await model.deleteUser(field);
    if (deleteUser > 0) {
      return res.json({
        error: false,
        message: "User has been deleted.",
        data: deleteUser,
      });
    }

    return res.json({
      error: false,
      message: "Failed to delete user.",
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

const updateUser = async (req,res) =>{
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      username,
      mobile,
    } = req.body;

    const data = {
      username: username.toLowerCase().trim(),
      firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1).trim(),
      lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1).trim(),
      email: email,
      mobile: mobile,
      password: password,
      status: 1,
    };

    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const id = temp.id;

    const checkUsername = await model.getAllUserDetails({},{ username }).whereNot({id})
    if (checkUsername.length > 0) {
      return res.status(200).json({
        error: true,
        message: "Username already exist...",
        data: [],
      });
    }

    const checkEmail = await model.getAllUserDetails({},{ email }).whereNot({id});
    if (checkEmail.length > 0) {
      return res.status(200).json({
        error: true,
        message: "Email already exist...",
        data: [],
      });
    }

    const updateUser = await model.updateUser({id},data)
    if(updateUser > 0){
      return res.json({
        error: false,
        message: "User has been updated.",
        data: updateUser,
      });
    }

    return res.json({
      error: true,
      message: "Failed to update User.",
      data: updateUser,
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
}

const paginateUser = async (req, res) =>{
  try {
    let { offset = 0, limit = 10, order = "asc", sort = "id", search, status } = req.body;

    const data = {
      offset,limit,order,sort,status
    }

    const checkValidation = validation.paginationValidateUser(data);
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
      "firstname","lastname","email","mobile","role_name","code","username"    
    ]

    const total = await model.paginateUserTotal(searchFrom,search,status)
    const rows = await model.paginateUser(limit,offset,sort,order,status,searchFrom,search)

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
    if(order)/*{
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

const resetPasswordEmail = async (req,res) =>{
  try {

    const {email} = req.body
    const data = {
      email
    }

    const checkValidation = validation.resetPasswordEmail(data);
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

    const getUser = await model.getUserDetail(data)
    if(!getUser.length){
      return res.json({
        error:true,
        message:'User not found'
      })
    }
    
    const payload = {
      id:getUser[0].id
    }

    const reset_token = jwt.sign(payload,constant.resetPassword.secret, { expiresIn: '1h' })

    payload.email = email;
    const insertToken = await model.updateUser(payload,{reset_token})
    if(insertToken.length == 0){
      return res.json({
        error : true,
        message: "Some error occureed please try again."
      })
    }

    const response =await fs.sendPasswordResetEmail(email,reset_token)
    if(response.error == true){
      return res.status(404).json({
        error:true,
        Message:error.message
      })
    }

    res.json({
      error:false,
      message:"Reset password email has been sent",
      data : response
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

const resetPassword = async (req,res) =>{
  try {
    const {token,newPassword} = req.body
    const data ={
      token,newPassword
    }
    
    const checkValidation = validation.resetPassword(data);
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

    const decodeToken = jwt.verify(token,constant.resetPassword.secret)
    const where = {
      id:decodeToken.id,
      reset_token:token
    }
    const getUser = await model.checkUser(where)
    if(!getUser.length){
      return res.status(404).json({
        Error:true,
        Message:'User not found or Bad Token'
      })
    }
    
    const updatePassword = await model.updateUser(where,{password:md5(newPassword),reset_token:null})
    if(updatePassword == 0){
        return res.json({
          error: true,
          message:"Password has not been reseted"
        })
    }

    return res.json({
        error :false,
        message:"Password has been reseted",
        data : updatePassword
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

const getAllUsers = async(req,res)=>{
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const role = temp.id;

    const field = {
      id: role,
    };

    //const checkRole = await Rolemodel.getRoleDetail(field);
    const checkRole = await model.getUserDetail(field,null,null)
    if (checkRole.length && checkRole[0].role != "admin") {
      return res
        .json({
          error: true,
          message: "You don't have permission for this.",
          data: [],
        })
        .end();
    }

    const users = await model.getAllUserDetails()
    if(!users.length){
      return res
        .json({
          error: true,
          message: "No user found.",
          data: [],
        })
        .end();
    }

    return res
        .json({
          error: false,
          message: "Users fetched.",
          total:users.length,
          data: users,
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

//Tanvi's code
const changePassword = async (req, res) => {
  try {
    //Removing email from body as we will get that from token
    const { currentPassword, newPassword } = req.body;
    const data = {
      currentPassword,
      newPassword,
    };
    const { error } = validation.passwordValidate(data);
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    //Added code
    const token = req.headers.authorization.split(" ")[1];
    const temp = jwt.verify(token, constant.jwtConfig.secret);
    const id = temp.id;
    const email = temp.email;

    const field = {
      id,
      email,
    };

    field.password = md5(currentPassword);

    const checkUser = await model.getUserDetail(field);
    if (!checkUser.length) {
      return res.json({
        error: true,
        message: "Invalid credentials",
        data: [],
      });
    }

    //All this commented code handled in above code.
    // const user = await model.getUserDetail(field);
    //   console.log(user);
    //   if (!user.length) {
    //     return res.status(404).json({
    //       error: true,
    //       message: "User not found",
    //     });
    //   }

    //   const hashCurrentPassword = md5(currentPassword);
    //   console.log(hashCurrentPassword);
    //   if (user[0].password !== hashCurrentPassword) {
    //     return res.status(401).json({
    //       error: true,
    //       message: "Incorrect current password",
    //     });
    //   }

    const password = md5(newPassword);
    const updated = await model.updateUser(field, { password });
    if (updated) {
      //  let mailSubject = "Password change confirmation";
      // let content = "Your password has been successfully changed.";
      // await middleware.sendMail(user[0].email, mailSubject, content);
      console.log(await fs.passwordChange(field.email));

      return res.status(200).json({
        error: false,
        message: "Password changed successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
        error:true,
        message: error.message,
        date:[]
     });
  }
};

export default {
  createUser,
  loginUser,
  deleteUser,
  changePassword,
  paginateUser,
  resetPasswordEmail,
  resetPassword,
  updateUser,
  getAllUsers
};
