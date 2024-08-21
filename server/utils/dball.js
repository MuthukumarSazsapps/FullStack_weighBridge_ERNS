
 const executeQuery = async (db, sql, params = [], method = 'all') => {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };
  
      switch (method) {
        case 'get':
          db.get(sql, params, callback);
          break;
        case 'run':
          db.run(sql, params, function(err) {
            callback(err, { changes: this.changes });
          });
          break;
        case 'all':
        default:
          db.all(sql, params, callback);
          break;
      }
    });
  };
  
  export default executeQuery
  // Usage Example:
  // const user = await executeQuery(db, query, [username], 'get');
  