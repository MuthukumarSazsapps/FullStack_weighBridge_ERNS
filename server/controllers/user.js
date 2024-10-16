import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';

const createUser = async (req, res) => {
    try {
      // First, check if the product already exists
      const checkQuery = `
        SELECT * FROM Sazs_WeighBridge_AuthLogin WHERE userName = ? AND isActive=1
      `;
      const checkParams = [req.body.userName];
      const existingProduct = await executeQuery(db, checkQuery, checkParams, 'get');
  
      if (existingProduct) {
        // If a product with the same name exists, return a message
        return responseHandler({
          req,
          res,
          data: { status: false, message: 'Product already exists' },
          httpCode: HttpStatusCode.OK,
        });
      }
  
      // If the product does not exist, proceed to create a new product
      const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_AuthLogin", "user");
      const query = `
        INSERT INTO Sazs_WeighBridge_AuthLogin
        (userId, username,password,role,companyId, createdBy, createdOn, isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        uniqueId,
        req.body.username,
        req.body.password,
       "user",
        req.body.companyId,
        req.body.user,
        dayjs().format('MM/DD/YYYY, h:mm A'),
        1
      ];
  
      const result = await executeQuery(db, query, params, 'run');
  
      if (result.changes > 0) {
        return responseHandler({
          req,
          res,
          data: { status: true, message: 'Record inserted successfully' },
          httpCode: HttpStatusCode.CREATED,
        });
      } else {
        return responseHandler({
          req,
          res,
          data: { error: 'No record inserted' },
          httpCode: HttpStatusCode.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.error('Error inserting record:', error.message);
      return responseHandler({
        req,
        res,
        data: { error: 'Error inserting record' },
        httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  };


  const getAllUserList = async (req, res) => {
    try {
        const query = 'select * from Sazs_WeighBridge_AuthLogin where isActive=1';
        const rows = await executeQuery(db, query); // Execute the SQL query

        return responseHandler({
            req,
            res,
            data: { userList: rows },
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
}

const updateUserDetails = async (req, res) => {
    try {
        const query = `
        UPDATE Sazs_WeighBridge_AuthLogin 
        SET 
          username = ?,
          password =?, 
          modifiedBy = ?, 
          modifiedOn = ?
        WHERE 
          userId = ?
      `;

        const params = [
            req.body.username,
            req.body.password,
            req.body.user, // This could be dynamic, depending on your application logic
            dayjs().format('MM/DD/YYYY, h:mm A'),// The current date and time for 'modifiedOn'
            req.body.userId // The ID of the company to update
        ];

        const result = await executeQuery(db, query, params, 'run');
        console.log("changes", result.changes);

        if (result.changes > 0) {
            return responseHandler({
                req,
                res,
                data: { status: true, message: 'Record updated successfully' },
                httpCode: HttpStatusCode.OK,
            });
        } else {
            return responseHandler({
                req,
                res,
                data: { error: 'No record updated' },
                httpCode: HttpStatusCode.BAD_REQUEST,
            });
        }
    } catch (err) {
        console.error('Error updating record:', err.message);
        return responseHandler({
            req,
            res,
            data: { error: 'Error updating record' },
            httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        });
    }
};

const deleteUserDetails = async (req, res) => {
    try {
        const query = `
        UPDATE Sazs_WeighBridge_AuthLogin 
        SET isActive=0  WHERE 
          userId = ?
      `;

        const params = [req.body.userId]; // The ID of the company to delete

        const result = await executeQuery(db, query, params, 'run');

        if (result.changes > 0) {
            return responseHandler({
                req,
                res,
                data: { status: true, message: 'Record deleted successfully' },
                httpCode: HttpStatusCode.OK,
            });
        } else {
            return responseHandler({
                req,
                res,
                data: { error: 'No record found to delete' },
                httpCode: HttpStatusCode.NOT_FOUND,
            });
        }
    } catch (err) {
        console.error('Error deleting record:', err.message);
        return responseHandler({
            req,
            res,
            data: { error: 'Error deleting record' },
            httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        });
    }
};


  export default{
    createUser,
    getAllUserList,
    updateUserDetails,
    deleteUserDetails,
  }