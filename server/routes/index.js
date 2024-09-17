import login from './login.js'
import company from './company.js';
import customer from './customer.js'
import product from './product.js'
import vehicle from './vehicle.js'
import weighing from './weighing.js';
import camera from './camera.js'
const routes = app => {
    app.use('/login',login)
    app.use('/company',company);
    app.use('/customer',customer)
    app.use('/product',product)
    app.use('/vehicle',vehicle)
    app.use('/weighing',weighing)
    app.use('/camera',camera)
}

export default routes;
