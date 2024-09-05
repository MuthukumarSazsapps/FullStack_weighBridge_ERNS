import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';


const createWeighing = async (req, res) => {

    try {
  
      const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_WeighingTransaction", "token")
      const {returnType}=req.body
      const status= returnType==='yes'?'pending':'completed'
      const query = `
        INSERT INTO Sazs_WeighBridge_WeighingTransaction 
        (tokenNo, VehicleNo, vehicleType, returnType, customerName, driverName, materialName, mobileNumber,loadType, billType,weighmentStatus, amount, firstWeight,createdBy,createdOn,modifiedBy,modifiedOn,isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
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
        req.body.loadType,
        req.body.billType,
        status,
        req.body.amount,
        req.body.measuredWeight,
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

const getSecondWeightList =async(req,res)=>{
  try {
    const query="select * from Sazs_WeighBridge_WeighingTransaction where IsActive=1 AND returnType='yes' and weighmentStatus='pending'"
    const result=await executeQuery(db,query);

    return responseHandler({
      req,
      res,
      data:{secondWeightList:result},
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
        VehicleNo = ?, 
        vehicleType = ?, 
        returnType = ?, 
        customerName = ?, 
        driverName = ?, 
        materialName = ?, 
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
      req.body.VehicleNo,
      req.body.vehicleType,
      req.body.returnType,
      req.body.customerName,
      req.body.driverName,
      req.body.materialName,
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

const updateSecondWeight=async(req,res)=>{
  try {
    const query=`
          update Sazs_WeighBridge_WeighingTransaction
          set
          loadType = loadType || ' To   ' || ?,
          secondWeight=?,
          netWeight=?,
          weighmentStatus=?
          where
          tokenNo=?
    `

    
    const params=[
        req.body.loadType,
        req.body.secondWeight,
        req.body.netWeight,
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