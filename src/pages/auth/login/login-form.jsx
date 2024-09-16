// import React from 'react';
// import { Form, Input, Button, Row, Col, Card } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import logo from '../../../assets/images/sazsgrey.png'; // Make sure to use your logo path
// import {login} from '../../../app/api/auth';
// import { useNavigate } from 'react-router-dom';
// import { useLocalStorage } from 'react-use';

// const LoginForm = () => {

//     const [jwt, setJwt] = useLocalStorage('auth');
//     const [username, setUserName] = useLocalStorage('user');
//     const [userId, setUserId] = useLocalStorage('userId');
//     const [role, setRole] = useLocalStorage('role');



//     const navigate = useNavigate();
  

//   const onFinish = async (values) => {
//     console.log('Received values of form: ', values);

//     const result=await login(values)
//     console.log(result);
    
//     if (result.data.Status === "success") {
//            setJwt(result.data.token); // Save JWT token
//            setUserName(result.data.companyData.username)
//            setUserId(result.data.companyData.userId)
//            setRole(result.data.companyData.role)

//            navigate("/");
//          } else {
//            alert(result.Error);
//          }
//   };

//   return (
//     <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
//       <Col xs={22} sm={18} md={12} lg={8} xl={6} >
//         <Card className='shadow-lg'> 
//           <div >
//             <img src={logo} alt="Logo" width={150}  className='m-auto'/>
//           </div>
//           <Form
//             name="login"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//           >
//             <Form.Item
//               name="username"
//               rules={[{ required: true, message: 'Please input your Username!' }]}
//             >
//               <Input prefix={<UserOutlined />} placeholder="Username" />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               rules={[{ required: true, message: 'Please input your Password!' }]}
//             >
//               <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//                 Log in
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import logo from '../../../assets/images/sazsgrey.png'; // Make sure to use your logo path
import { login } from '../../../app/api/auth';

const LoginForm = () => {
  const [jwt, setJwt] = useLocalStorage('auth');
  const [userData, setUserData] = useLocalStorage('userData', {});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login(values);
      if (result.data.Status === "success") {
        const { token, companyData } = result.data;
        setJwt(token); // Save JWT token
        setUserData({
          username: companyData.username,
          userId: companyData.userId,
          role: companyData.role,
        });

        message.success('Login successful!');
        navigate('/');
      setLoading(false);

      } else {
        message.error(result.data.error || 'Login failed!');
      }
    } catch (error) {
      message.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={18} md={12} lg={8} xl={6}>
        <Card className="shadow-lg">
          <div className="logo-container">
            <img src={logo} alt="Logo" width={150} className="m-auto" />
          </div>
          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
