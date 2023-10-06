import validation from '../validation/users.js'
import model from '../model/users.js'
import md5 from 'md5'
import constant from '../helpers/constant.js'
import jwt  from 'jsonwebtoken'
import knex from '../config/mysql_db.js'
import fs from '../helpers/functions.js'


const createUser = async (req,res)=>{
    try {
        const { firstname, lastname, email, password, role, username, mobile, code } = req.body

        const data = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            mobile:mobile,
            password: password,
            role: role,
            code:code,
            status: 1,
        }

        const checkValidation = validation.createValidateUser(data)
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

        const checkUsername = await model.getUserDetail({username})
        if (checkUsername.length){
            return res.status(200).json({
                error: true,
                message: "Username already exist...",
                data: []
            });
        }

        const checkEmail = await model.getUserDetail({email})
        if (checkEmail.length) {
            return res.status(200).json({
                error: true,
                message: "Email already exist...",
                data: []
            });
        }

        const userId = await model.createUser({...data, password:md5(password)})
        if (userId) {
            await fs.accountCreated(email)
            return res.status(200).json({
                error: false,
                message: "User has been created",
                data: userId,
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

const loginUser = async (req,res)=>{
    try {
        let { email, password } = req.body;
        let data = {
            email: email,
            password: password,
        }
   
        const checkValidation = validation.loginValidateUser(data)
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

        data.status = 1
        data.password = md5(password)
         let userData = await model.getUserDetail(data)
         if(!userData){
            return res.json({
                Error:true,
                Message:"No user found.",
                Data :[]
            })
         }
         
         delete userData[0].status

         const { jwtConfig } = constant

            const accessToken = jwt.sign({
                id: userData[0].id,
                role: userData[0].role,
                email: userData[0].email
            }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

            const refreshToken = jwt.sign({
                id: userData[0].id,
                role: userData[0].role,
                email: userData[0].email
            }, jwtConfig.refreshSecret, {
                expiresIn: jwtConfig.refreshTokenExpireTime
            })

            const get_user_role_name = await knex("users_role").where({id:userData[0].role})
            userData[0].role_name = get_user_role_name[0].role_name

            res.status(200).json({
                error: false,
                message: "User Logged In successfully",
                data: {
                    userData: userData[0],
                    accessToken,
                    refreshToken,
                }
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

const deleteUser = async (req,res)=>{
    try {
        const {password} = req.body
        const data = {
            password
        }
        const checkValidation = validation.deleteValidateUser(data)
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

        const token = req.headers.authorization.split(" ")[1]
        const temp =  jwt.verify(token, constant.jwtConfig.secret)
        const id = temp.id
        const email = temp.email

      const field = {
        id ,email
      }

      field.password = md5(password)

      const checkUser = await model.getUserDetail(field)
      if(!checkUser.length){
        return res.json({
            error:true,
            message:'Invalid credentials',
            data:[]
        })
      }

      const deleteUser = await model.deleteUser(field)
      if(deleteUser){
        return res.json({
            error:false,
            message:'User has been deleted.',
            data:deleteUser
        })
      }

      return res.json({
        error:false,
        message:'Failed to delete user.',
        data:[]
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
    createUser,
    loginUser,
    deleteUser,
}