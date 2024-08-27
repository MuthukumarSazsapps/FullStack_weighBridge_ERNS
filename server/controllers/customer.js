import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { db } from '../server.js';
import executeQuery from '../utils/dball.js';
import generateNewCode from '../utils/customId.js';
import dayjs from 'dayjs';


const createCustomer = async (req, res) => {
    try {
        const uniqueId = await generateNewCode(db, "Sazs_WeighBridge_CustomerDetails", "cust")
        const query = `
    INSERT INTO Sazs_WeighBridge_CustomerDetails 
    (customerId,customerName,ledgerName,address,place,pin,phone,gst,emailId,openingBalance,mode,customerType,active,createdBy,createdOn,modifiedBy,modifiedOn,isActive)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

        const params = [
            uniqueId,
            req.body.customerName,
            req.body.ledgerName,
            req.body.address,
            req.body.place,
            req.body.pin,
            req.body.phone,
            req.body.gst,
            req.body.emailId,
            req.body.openingBalance,
            req.body.mode,
            req.body.customerType,
            req.body.active,
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


const getallCustomerlist=async(req,res)=>{
    try {
        const query = 'select * from Sazs_WeighBridge_CustomerDetails where isActive=1';
        const rows = await executeQuery(db, query); // Execute the SQL query
        
        return responseHandler({
          req,
          res,
          data: { customerList: rows },
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


const updateCustomerDetails = async (req, res) => {
    try {
      const query = `
        UPDATE Sazs_WeighBridge_CustomerDetails 
        SET 
          customerName = ?, 
          ledgerName = ?, 
          address = ?, 
          place = ?, 
          pin = ?, 
          phone = ?, 
          gst = ?, 
          emailId = ?, 
          openingBalance = ?, 
          mode = ?,
          customerType=?,
          active=?, 
          modifiedBy = ?, 
          modifiedOn = ?
        WHERE 
          customerId = ?
      `;
  
      const params = [
        req.body.customerName, 
        req.body.ledgerName, 
        req.body.address, 
        req.body.place, 
        req.body.pin, 
        req.body.phone, 
        req.body.gst, 
        req.body.emailId, 
        req.body.openingBalance, 
        req.body.mode, 
        req.body.customerType,
        req.body.active, 
        req.body.user, // This could be dynamic, depending on your application logic
        dayjs().format('MM/DD/YYYY, h:mm A'),// The current date and time for 'modifiedOn'
        req.body.customerId // The ID of the company to update
      ];
  
      const result = await executeQuery(db, query, params, 'run');
      console.log("changes",result.changes);
      
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
        UPDATE Sazs_WeighBridge_CustomerDetails 
        SET isActive=0  WHERE 
          customerId = ?
      `;
  
      const params = [req.body.customerId]; // The ID of the company to delete
  
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
    createCustomer,
    getallCustomerlist,
    updateCustomerDetails,
    deleteCompanyDetails
}
