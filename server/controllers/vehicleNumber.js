import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';


const createVehicleNumber = async (req, res) => {
    try {
        // await executeQuery(db, 'PRAGMA busy_timeout = 3000;', [], 'run');
        
        const checkQuery = `
        SELECT * FROM Sazs_WeighBridge_VehicleNumberMaster WHERE vehicleNumber = ? AND isActive=1
      `;
      const checkParams = [req.body.vehicleNumber];
      const existingVehicleNumber = await executeQuery(db, checkQuery, checkParams, 'get');
  
      if (existingVehicleNumber) {
        // If a product with the same name exists, return a message
        return responseHandler({
          req,
          res,
          data: { status: false, message: 'vehicle Number already exists' },
          httpCode: HttpStatusCode.OK,
        });
      }

        const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_VehicleNumberMaster", "VENM")
        const query = `
                        INSERT INTO Sazs_WeighBridge_VehicleNumberMaster
                        (vehicleNumId,vehicleNumber,vehicleType,driverName,phoneNumber,createdBy,createdOn,modifiedBy,modifiedOn,isActive)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;

        const params = [
            uniqueId,
            req.body.vehicleNumber,
            req.body.vehicleType,
            req.body.driverName,
            req.body.phoneNumber,
            req.body.user,
            dayjs().format('MM/DD/YYYY, h:mm A'),
            'null',
            'null',
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
}

const getAllVehicleNumberList = async (req, res) => {
    try {
        const query = 'select * from Sazs_WeighBridge_VehicleNumberMaster where isActive=1';
        const rows = await executeQuery(db, query); // Execute the SQL query

        return responseHandler({
            req,
            res,
            data: { vehicleNumberList: rows },
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

const updateVehicleNumberDetails = async (req, res) => {
    try {
        const query = `
        UPDATE Sazs_WeighBridge_VehicleNumberMaster 
        SET 
          vehicleNumber = ?,
          vehicleType = ?,
          driverName = ?,
          phoneNumber = ?, 
          modifiedBy = ?, 
          modifiedOn = ?
        WHERE 
          vehicleNumId = ?
      `;

        const params = [
            req.body.vehicleNumber,
            req.body.vehicleType,
            req.body.driverName,
            req.body.phoneNumber,
            req.body.user, // This could be dynamic, depending on your application logic
            dayjs().format('MM/DD/YYYY, h:mm A'),// The current date and time for 'modifiedOn'
            req.body.vehicleNumId // The ID of the company to update
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

const deleteVehicleNumberDetails = async (req, res) => {
    try {
        const query = `
        UPDATE Sazs_WeighBridge_VehicleNumberMaster   
        SET isActive=0  WHERE 
          vehicleNumId = ?
      `;

        const params = [req.body.vehicleNumId]; // The ID of the company to delete

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


export default {
    createVehicleNumber,
    getAllVehicleNumberList,
    updateVehicleNumberDetails,
    deleteVehicleNumberDetails
}
