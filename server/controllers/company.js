import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';

// const createCompany = async (req, res) => {

//   try {

//     const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_CompanyDetails", "cust")
//     const query1 = `
//       INSERT INTO Sazs_WeighBridge_CompanyDetails 
//       (companyId, companyName, username, businessName, address, place, pin, phone, gst, pan, password, confirmPassword, createdBy,createdOn,modifiedBy,modifiedOn,isActive)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const params1 = [
//       uniqueId,
//       req.body.companyName,
//       req.body.username,
//       req.body.businessName,
//       req.body.address,
//       req.body.place,
//       req.body.pin,
//       req.body.phone,
//       req.body.gst,
//       req.body.pan,
//       req.body.password,
//       req.body.confirmPassword,
//       req.body.user,
//       dayjs().format('MM/DD/YYYY, h:mm A'),
//       'null',
//       'null',
//       1
//     ];


//     const uniqueId2 = await generateNewCode(db, "Sazs_WeighBridge_AuthLogin", "user");

//     const query2=`INSERT INTO Sazs_WeighBridge_AuthLogin 
//         (userId, username, password, role, createdBy, createdOn, isActive)
//         VALUES 
//         (?, '?, ?, ?, ?, ? , ?)`;

//         const params2=[
//           uniqueId2,
//           req.body.username,
//           req.body.password,
//           'owner',
//           'admin',
//           dayjs().format('MM/DD/YYYY, h:mm A'),
//           1
//         ]
    
//     const result1 = await executeQuery(db, query2, params2, 'run');

//     const result = await executeQuery(db, query1, params1, 'run');

//     if (result.changes > 0) {
//       return responseHandler({
//         req,
//         res,
//         data: { status: true, message: 'Record inserted successfully' },
//         httpCode: HttpStatusCode.CREATED,
//       });
//     } else {
//       return responseHandler({
//         req,
//         res,
//         data: { error: 'No record inserted' },
//         httpCode: HttpStatusCode.BAD_REQUEST,
//       });
//     }
//   } catch (err) {
//     console.error('Error inserting record:', err.message);
//     return responseHandler({
//       req,
//       res,
//       data: { error: 'Error inserting record' },
//       httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
//     });
//   }
// };



const createCompany = async (req, res) => {
  try {
    // Generate unique IDs for company and user in parallel
    const [companyId, userId] = await Promise.all([
      generateNewCode(db, "Sazs_WeighBridge_CompanyDetails", "cmny"),
      generateNewCode(db, "Sazs_WeighBridge_AuthLogin", "ownr")
    ]);

    // Prepare the SQL queries
    const companyQuery = `
      INSERT INTO Sazs_WeighBridge_CompanyDetails 
      (companyId, companyName, username, businessName, address, place, pin, phone, gst, pan, password, confirmPassword, createdBy, createdOn, modifiedBy, modifiedOn, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const authQuery = `
      INSERT INTO Sazs_WeighBridge_AuthLogin 
      (userId, username, password, role, companyId,createdBy, createdOn, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    // Common timestamp
    const currentTimestamp = dayjs().format('MM/DD/YYYY, h:mm A');

    // Prepare parameters for queries
    const companyParams = [
      companyId,
      req.body.companyName,
      req.body.username,
      req.body.businessName,
      req.body.address,
      req.body.place,
      req.body.pin,
      req.body.phone,
      req.body.gst,
      req.body.pan,
      req.body.password,
      req.body.confirmPassword,
      req.body.user,
      currentTimestamp,
      null,  // modifiedBy is initially null
      null,  // modifiedOn is initially null
      1      // isActive is true
    ];

    const authParams = [
      userId,
      req.body.username,
      req.body.password,
      'owner',          // role is 'owner' by default
      companyId,
      'admin',          // createdBy is 'admin'
      currentTimestamp, // createdOn is the current timestamp
      1                 // isActive is true
    ];

    // Execute both queries in parallel
    const [companyResult, authResult] = await Promise.all([
      executeQuery(db, companyQuery, companyParams, 'run'),
      executeQuery(db, authQuery, authParams, 'run')
    ]);

    // Check if both insertions were successful
    if (companyResult.changes > 0 && authResult.changes > 0) {
      return responseHandler({
        req,
        res,
        data: { status: true, message: 'Company and User records inserted successfully' },
        httpCode: HttpStatusCode.CREATED,
      });
    } else {
      return responseHandler({
        req,
        res,
        data: { error: 'No records inserted' },
        httpCode: HttpStatusCode.BAD_REQUEST,
      });
    }
  } catch (err) {
    console.error('Error inserting records:', err.message);
    return responseHandler({
      req,
      res,
      data: { error: 'Error inserting records' },
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
};


const getallcompanylist = async (req, res) => {
  try {
    const query = 'select * from Sazs_WeighBridge_CompanyDetails where isActive=1';
    const rows = await executeQuery(db, query); // Execute the SQL query

    return responseHandler({
      req,
      res,
      data: { companyLists: rows },
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


const updateCompanyDetails = async (req, res) => {
  try {
    const query = `
      UPDATE Sazs_WeighBridge_CompanyDetails 
      SET 
        companyName = ?, 
        username = ?, 
        businessName = ?, 
        address = ?, 
        place = ?, 
        pin = ?, 
        phone = ?, 
        gst = ?, 
        pan = ?, 
        password = ?, 
        confirmPassword = ?, 
        modifiedBy = ?, 
        modifiedOn = ?
      WHERE 
        companyId = ?
    `;

    const params = [
      req.body.companyName,
      req.body.username,
      req.body.businessName,
      req.body.address,
      req.body.place,
      req.body.pin,
      req.body.phone,
      req.body.gst,
      req.body.pan,
      req.body.password,
      req.body.confirmPassword,
      req.body.user, // This could be dynamic, depending on your application logic
      dayjs().format('MM/DD/YYYY, h:mm A'),// The current date and time for 'modifiedOn'
      req.body.companyId // The ID of the company to update
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

const deleteCompanyDetails = async (req, res) => {
  try {
    const query = `
      UPDATE Sazs_WeighBridge_CompanyDetails 
      SET isActive=0  WHERE 
        companyId = ?
    `;

    const params = [req.body.companyId]; // The ID of the company to delete

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
  createCompany,
  getallcompanylist,
  updateCompanyDetails,
  deleteCompanyDetails
}