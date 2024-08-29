import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';


const createVehicle = async (req, res) => {
    try {
        const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_Vehicle", "vehid")
        const query = `
                        INSERT INTO Sazs_WeighBridge_Vehicle
                        (vehicleId,vehicleType,createdBy,createdOn,modifiedBy,modifiedOn,isActive)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;

        const params = [
            uniqueId,
            req.body.vehicleType+' wheel',
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

const getAllVehicleList = async (req, res) => {
    try {
        const query = 'select * from Sazs_WeighBridge_Vehicle where isActive=1';
        const rows = await executeQuery(db, query); // Execute the SQL query

        return responseHandler({
            req,
            res,
            data: { vehicleList: rows },
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

const updateVehicleDetails = async (req, res) => {
    try {
        const query = `
        UPDATE Sazs_WeighBridge_Vehicle 
        SET 
          vehicleType = ?, 
          modifiedBy = ?, 
          modifiedOn = ?
        WHERE 
          vehicleId = ?
      `;

        const params = [
            req.body.vehicleType,
            req.body.user, // This could be dynamic, depending on your application logic
            dayjs().format('MM/DD/YYYY, h:mm A'),// The current date and time for 'modifiedOn'
            req.body.vehicleId // The ID of the company to update
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

const deleteVehicleDetails = async (req, res) => {
    try {
        const query = `
        UPDATE   
        SET isActive=0  WHERE 
          vehicleId = ?
      `;

        const params = [req.body.vehicleId]; // The ID of the company to delete

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
    createVehicle,
    getAllVehicleList,
    updateVehicleDetails,
    deleteVehicleDetails
}
