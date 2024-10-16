import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const UserForm = ({ form }) => {
  console.log("form", form);

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="username"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter User name',
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row> 
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Password',
                },
              ]}
            >
              <Input.Password placeholder="Please Enter Password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please enter Confirm Password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Please enter Confirm Password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default UserForm