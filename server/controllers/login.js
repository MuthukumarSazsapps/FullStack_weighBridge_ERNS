import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';


// const createUser= async (req,res)=>{
//   try {
    
//   } catch (error) {
    
//   }
// }

const getAllLoginUser = async (req, res) => {
  try {
    const query = 'SELECT * FROM Sazs_WeighBridge_AuthLogin where isActive=1';
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

// const login = async (req, res) => {
//   try {
   
   
//     const { username, password } = req.body;

//     const query1 = 'SELECT * FROM Sazs_WeighBridge_CompanyDetails where isActive=1 AND username= ?';
//     const rows = await executeQuery(db, query1,[username]);

//     const query = "SELECT * FROM Sazs_WeighBridge_AuthLogin WHERE username = ? AND isActive=1";
//     const user = await executeQuery(db, query,[username],"get");
    
//     if (!user) {
//       return responseHandler({
//         req,
//         res,
//         data: { error: 'User not found' },
//         httpCode: HttpStatusCode.BAD_REQUEST,
//       });
//     }

//     if (password === user.password) {
//       const token = jwt.sign({ id: user.id }, 'sazsapps', {
//         expiresIn: '1h',
//       });
//       // return res.json({ Status: 'success', token });
//       return responseHandler({
//         req,
//         res,
//         data:{Status: 'success',token,companyData:rows},
//         httpCode: HttpStatusCode.OK,

//       })
//     } else {
//       return responseHandler({
//         req,
//         res,
//         data: { error: 'Incorrect password' },
//         httpCode: HttpStatusCode.UNAUTHORIZED,
//       });
//     }
//   } catch (error) {
//     console.error('login err:', error);
//     return responseHandler({
//       req,
//       res,
//       data: { error: 'Invalid credentials' },
//       httpCode: HttpStatusCode.UNAUTHORIZED,
//     });
//   }
// }


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Combined query to fetch both user and company data in one go
    const query = username ==='Advika'?`SELECT * FROM Sazs_WeighBridge_AuthLogin WHERE username = ? AND isActive=1`:`
      SELECT 
        u.*, 
        c.companyId, 
        c.companyName, 
        c.businessName, 
        c.address, 
        c.place, 
        c.pin, 
        c.phone, 
        c.gst, 
        c.pan 
      FROM 
        Sazs_WeighBridge_AuthLogin u
      JOIN 
        Sazs_WeighBridge_CompanyDetails c 
      ON 
        u.username = c.username 
      WHERE 
        u.username = ? 
        AND u.isActive = 1 
        AND c.isActive = 1
    `
    ;

    const userData = await executeQuery(db, query, [username], "get");

    // Early return if the user is not found
    if (!userData) {
      return responseHandler({
        req,
        res,
        data: { error: 'User not found or inactive' },
        httpCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    // Assuming passwords are hashed; use bcrypt or a similar library to compare
    const isPasswordValid = password === userData.password; // Replace with bcrypt.compareSync(password, userData.password) if using hashed passwords

    if (isPasswordValid) {
      const token = jwt.sign({ id: userData.id }, 'sazsapps', { expiresIn: '1h' });

      return responseHandler({
        req,
        res,
        data: {
          Status: 'success',
          token,
          companyData:userData
        },
        httpCode: HttpStatusCode.OK,
      });
    } else {
      return responseHandler({
        req,
        res,
        data: { error: 'Incorrect password' },
        httpCode: HttpStatusCode.UNAUTHORIZED,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return responseHandler({
      req,
      res,
      data: { error: 'Internal server error' },
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
};


  export default {
    login,
    getAllLoginUser
  }
  