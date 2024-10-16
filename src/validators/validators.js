import { useLocalStorage } from 'react-use';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutesValidator = () => {
    const [jwt] = useLocalStorage('auth');
    return jwt ? <Outlet /> : <Navigate to="/login" />;
  };


  export const AdminRoutesValidator = () => {    
    const [userData] = useLocalStorage('userData'); // As for now this is a session cookie, need to discuss
    const userRole=userData?.role
  
    return userRole === 'admin' ? <Outlet /> : <Navigate to="/" />;
  };
  

  export const SubscriberRoutesValidator = () => {
    const [userData] = useLocalStorage('userData'); // As for now this is a session cookie, need to discuss
    const userRole=userData?.role
    return userRole === 'owner' ? <Outlet /> : <Navigate to="/" />;
  };

  export const UserRoutesValidator = () => {
    const [userData] = useLocalStorage('userData'); // As for now this is a session cookie, need to discuss
    const userRole=userData?.role
    return userRole === 'user' ? <Outlet /> : <Navigate to="/" />;
  };