import validation from '../validation/users.js'
import model from '../model/users.js'
import md5 from 'md5'

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
            return res.status(200).json({
                error: false,
                message: "User has been created",
                data: userId
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
    loginUser
}