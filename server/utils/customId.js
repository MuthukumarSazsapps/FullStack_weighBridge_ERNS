import executeQuery from "./dball.js";// Ensure the path is correct

const generateNewCode = async (db, tableName,key) => {
  let newCode = null;
  let tempCode = null;

  try {
    // if (tableName === 'Sazs_Ledger') {
      const year = new Date().getFullYear();
      const sql = `SELECT COALESCE(MAX(id), 0) + 1 AS newId FROM ${tableName}`;
      
      const result = await executeQuery(db, sql, []);
      if (result) {
        newCode = result[0]?.newId;
        tempCode = `${key.toUpperCase()}-${year}-0${newCode}`;
      }
    // }

    return tempCode;
  } catch (error) {
    console.error('Error generating new code:', error.message);
    throw error;
  }
};

export default generateNewCode;
