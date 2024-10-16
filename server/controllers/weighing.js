import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';
import cameraScreenShot from '../utils/screenShot.js';


const createWeighing = async (req, res) => {

  try {

    const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_WeighingTransaction", "token")
    const imagePath = await cameraScreenShot(uniqueId)
    const { returnType } = req.body
    const status = returnType === 'yes' ? 'pending' : 'completed'
    const query = `
        INSERT INTO Sazs_WeighBridge_WeighingTransaction 
        (tokenNo, vehicleNumber, vehicleTypeId, returnType, customerName, driverName, productId, mobileNumber,loadType, billType,weighmentStatus, amount, firstWeight,imagePath,createdBy,createdOn,modifiedBy,modifiedOn,isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)
      `;

    const params = [
      uniqueId,
      req.body.vehicleNumber,
      req.body.vehicleTypeId,
      req.body.returnType,
      req.body.customerName,
      req.body.driverName,
      req.body.productId,
      req.body.mobileNumber,
      req.body.loadType,
      req.body.billType,
      status,
      req.body.amount,
      req.body.measuredWeight,
      // req.body.imagePath,
      imagePath,
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
        data: { status: true, message: 'Record inserted successfully', tokenNo: uniqueId },
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
    const query = 'SELECT w.*, v.vehicleType, p.productName FROM   Sazs_WeighBridge_WeighingTransaction w  INNER JOIN   Sazs_WeighBridge_VehicleTypeMaster v ON w.vehicleTypeId = v.vehicleTypeId  INNER JOIN  Sazs_WeighBridge_ProductMaster p ON w.productId = p.productId WHERE w.isActive = 1 ORDER BY w.createdOn DESC;';
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

const getSecondWeightList = async (req, res) => {
  try {
    const query = "select * from Sazs_WeighBridge_WeighingTransaction where IsActive=1 AND returnType='yes' and weighmentStatus='pending'"
    const result = await executeQuery(db, query);

    return responseHandler({
      req,
      res,
      data: { secondWeightList: result },
      httpCode: HttpStatusCode.OK,
      message: 'success'

    })
  } catch (error) {
    return responseHandler({
      req,
      res,
      data: { error: error.message },
      httpCode: HttpStatusCode.BAD_REQUEST
    });
  }
}

const updateWeighingDetails = async (req, res) => {
  try {
    const query = `
      UPDATE Sazs_WeighBridge_WeighingTransaction 
      SET 
        vehicleNumber = ?, 
        vehicleTypeId = ?, 
        returnType = ?, 
        customerName = ?, 
        driverName = ?, 
        productId = ?, 
        mobileNumber = ?,
        loadType=?,
        billType = ?, 
        amount = ?, 
        firstWeight = ?, 
        secondWeight = ?, 
        modifiedBy = ?, 
        modifiedOn = ?
      WHERE 
        tokenNo = ?
    `;

    const params = [
      req.body.vehicleNumber,
      req.body.vehicleTypeId,
      req.body.returnType,
      req.body.customerName,
      req.body.driverName,
      req.body.productId,
      req.body.mobileNumber,
      req.body.loadType,
      req.body.billType,
      req.body.amount,
      req.body.firstWeight,
      req.body.secondWeight,
      req.body.user,
      dayjs().format('MM/DD/YYYY, h:mm A'),
      req.body.tokenNo
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

const updateSecondWeight = async (req, res) => {
  try {

    const imagePath = await cameraScreenShot(`${req.body.tokenNo}-2`)

    const query = `
          update Sazs_WeighBridge_WeighingTransaction
          set
          loadType = loadType || ' To ' || ?,
          secondWeight=?,
          netWeight=?,
          imagePath= imagePath || ',' || ?,
          weighmentStatus=?
          where
          tokenNo=?
    `


    const params = [
      req.body.loadType,
      req.body.secondWeight,
      req.body.netWeight,
      imagePath,
      'completed',
      req.body.tokenNo
    ]

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

  } catch (error) {
    console.error('Error updating record:', error.message);
    return responseHandler({
      req,
      res,
      data: { error: 'Error updating record' },
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}

const deleteWeighingDetails = async (req, res) => {
  try {
    const query = `
      UPDATE  Sazs_WeighBridge_WeighingTransaction 
      SET isActive=0  WHERE 
        tokenNo = ?
    `;

    const params = [req.body.tokenNo]; // The ID of the company to delete

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
  createWeighing,
  getAllWeighingList,
  updateWeighingDetails,
  deleteWeighingDetails,
  getSecondWeightList,
  updateSecondWeight
}



// SELECT w.*, v.vehicleType, p.productName FROM   Sazs_WeighBridge_WeighingTransaction w  INNER JOIN   Sazs_WeighBridge_VehicleTypeMaster v ON w.vehicleTypeId = v.vehicleTypeId  INNER JOIN  Sazs_WeighBridge_ProductMaster p ON w.productId = p.productId WHERE w.isActive = 1 ORDER BY w.createdOn DESC;
