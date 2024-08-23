import login from './login.js'
import company from './company.js';
const routes = app => {
    app.use('/login',login)
    app.use('/company',company);
}

export default routes;