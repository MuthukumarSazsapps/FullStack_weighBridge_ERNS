import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../../assets/images/sazsgrey.png'; // Make sure to use your logo path
import {login} from '../../../app/api/auth';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const LoginForm = () => {

    const [jwt, setJwt] = useLocalStorage('auth');
    const [username, setUserName] = useLocalStorage('user');
    const [userId, setUserId] = useLocalStorage('userId');
    const [role, setRole] = useLocalStorage('role');



    const navigate = useNavigate();
  

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const result=await login(values)
    console.log(result);
    
    if (result.data.Status === "success") {
           setJwt(result.data.token); // Save JWT token
           setUserName(result.data.companyData.username)
           setUserId(result.data.companyData.userId)
           setRole(result.data.companyData.role)

           navigate("/");
         } else {
           alert(result.Error);
         }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={18} md={12} lg={8} xl={6} >
        <Card>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img src={logo} alt="Logo" style={{ width: '30%', height: 'auto' }} />
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
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
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
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
