import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';

const getAllLoginUser = async (req, res) => {
  try {
    const query = 'SELECT * FROM authlogin';
    const rows = await executeQuery(db, query); // Execute the SQL query
    console.log("rows", rows);
    
    return responseHandler({
      req,
      res,
      data: rows,
      httpCode: HttpStatusCode.OK,
      message: 'success'
    });
  } catch (err) {
    return responseHandler({
      req,
      res,
      data: { error: err.message },
      httpCode: HttpStatusCode.BAD_REQUEST
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("body",req);
    
    const { username, password } = req.body;

    const query = "SELECT * FROM authlogin WHERE username = ?";
    const user = await executeQuery(db, query,[username],"get");
    console.log("user",user);
    
    if (!user) {
      return responseHandler({
        req,
        res,
        data: { error: 'User not found' },
        httpCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    if (password === user.password) {
      const token = jwt.sign({ id: user.id }, 'sazsapps', {
        expiresIn: '1h',
      });
      return res.json({ Status: 'success', token });
    } else {
      return responseHandler({
        req,
        res,
        data: { error: 'Incorrect password' },
        httpCode: HttpStatusCode.UNAUTHORIZED,
      });
    }
  } catch (error) {
    console.error('login err:', error);
    return responseHandler({
      req,
      res,
      data: { error: 'Invalid credentials' },
      httpCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}

  export default {
    login,
    getAllLoginUser
  }
  