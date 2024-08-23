import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';

const createCompany = async (req, res) => {

  try {

    const uniqueId=await generateNewCode(db,"Sazs_WeighBridge_CompanyDetails","cust")
    const query = `
      INSERT INTO Sazs_WeighBridge_CompanyDetails 
      (companyId, companyName, username, businessName, address, place, pin, phone, gst, pan, password, confirmPassword, createdBy,createdOn,modifiedBy,modifiedOn,isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const params = [
      uniqueId,
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
      'kumar',
      new Date(),
      'null',
      'null',
      1                       
    ];
  
      const result = await executeQuery(db, query, params, 'run');
      
      if (result.changes > 0) {
        return responseHandler({
          req,
          res,
          data: { status:true,message: 'Record inserted successfully' },
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
  

const getallcompanylist=async(req,res)=>{
    try {
        const query = 'SELECT * FROM Sazs_WeighBridge_CompanyDetails where isActive=1';
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
      'kumar', // This could be dynamic, depending on your application logic
      new Date(), // The current date and time for 'modifiedOn'
      req.body.companyId // The ID of the company to update
    ];

    const result = await executeQuery(db, query, params, 'run');

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

  export default{
    createCompany,
    getallcompanylist,
    updateCompanyDetails,
    deleteCompanyDetails
  }