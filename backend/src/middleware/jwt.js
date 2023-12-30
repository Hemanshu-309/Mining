import constants from "../helpers/constant.js";
import jwt from "jsonwebtoken";

const checkJwt = async (req, res, next) => {
  try {
    const { jwtConfig } = constants;
    const authHeader = req.headers["authorization"];

    let token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
    return res.status(401).send({ error: true, message: "Token not found" }); // if there isn't any token
      
    }

    jwt.verify(token, jwtConfig.secret, async (err, user) => {
        if (err) {
           return res.status(401).send({ error: true, message: "Authorization failed!" })
        }
        next()
    })

   
 } catch (error) {
    
  }
};

export default {
    checkJwt
}