import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';


const createWeighing = async (req, res) => {

    try {
  
      const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_CompanyDetails", "token")
      const query = `
        INSERT INTO Sazs_WeighBridge_WeighingTransaction 
        (tokenNo, VehicleNo, vehicleType, returnType, customerName, driverName, materialName, mobileNumber, billType, amount, firstWeight,createdBy,createdOn,modifiedBy,modifiedOn,isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;
  
      const params = [
        uniqueId,
        req.body.VehicleNo,
        req.body.vehicleType,
        req.body.returnType,
        req.body.customerName,
        req.body.driverName,
        req.body.materialName,
        req.body.mobileNumber,
        req.body.billType,
        req.body.amount,
        req.body.measuredWeight,
        // req.body.secondWeight,
        // req.body.netWeight,
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
    } catch (err) {
      console.error('Error inserting record:', err.message);
      return responseHandler({
        req,
        res,
        data: { error: 'Error inserting record' },
        httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  };

  const getAllWeighingList = async (req, res) => {
    try {
        const query = 'select * from Sazs_WeighBridge_WeighingTransaction where isActive=1';
        const rows = await executeQuery(db, query); // Execute the SQL query

        return responseHandler({
            req,
            res,
            data: { weighingList: rows },
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

export default {
    createWeighing,
    getAllWeighingList
    // updateCompanyDetails,
    // deleteCompanyDetails
  }