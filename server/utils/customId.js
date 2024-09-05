import dayjs from "dayjs";
import executeQuery from "./dball.js";// Ensure the path is correct

const generateNewCode = async (db, tableName, key) => {
  let newCode = null;
  let tempCode = null;

  try {
    if (key === 'token') {
      const todayDate = dayjs().format('MM/DD/YYYY'); // Format to match your database

      // Query to count the rows created today
      const sql1 = `
        SELECT COALESCE(
          (SELECT COUNT(*)
           FROM ${tableName}
           WHERE substr(createdOn, 1, 10) = ?),
          0
        ) + 1 AS newId
      `;

      // Execute the query with the current date
      const result = await executeQuery(db, sql1, [todayDate]);

      if (result && result.length > 0) {
        newCode = result[0]?.newId;
        tempCode = `T${dayjs().format('DDMMYYYY')}-${newCode}`;
      }

    } else {
      const year = new Date().getFullYear();
      const sql = `SELECT COALESCE(MAX(id), 0) + 1 AS newId FROM ${tableName}`;
      const result = await executeQuery(db, sql, []);

      if (result && result.length > 0) {
        newCode = result[0]?.newId;
        tempCode = `${key.toUpperCase()}-${year}-0${newCode}`;
      }
    }

    return tempCode;
  } catch (error) {
    console.error('Error generating new code:', error.message);
    throw error;
  }
};



export default generateNewCode;


// SELECT COALESCE(SELECT COUNT(*) AS dataLength
// FROM Sazs_WeighBridge_WeighingTransaction
// WHERE DATE(createdOn) = '2024-09-02', 0) + 1 AS newId FROM ${tableName}`;