import login from './login.js'
import company from './company.js';
import customer from './customer.js'
import product from './product.js'
const routes = app => {
    app.use('/login',login)
    app.use('/company',company);
    app.use('/customer',customer)
    app.use('/product',product)
    
}

export default routes;