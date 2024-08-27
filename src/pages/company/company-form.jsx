import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const CompanyForm = ({ form }) => {
  console.log("form", form);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter user name',
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
              name='username'
              label='User Name'
              rules={[{
                required: true,
                message: 'please Enter User Name'
              }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='businessName'
              label='Business Name'
              rules={[{
                required: true,
                message: 'please Enter Business Name'
              }]}
            >
              <Input placeholder="Please enter user Business Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Address',
                },
              ]}
            >
              <Input placeholder="Please Enter Your Address" />

            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="place"
              label="Place"
              rules={[
                {
                  required: true,
                  message: 'Please Enter the Place',
                },
              ]}
            >
              <Input placeholder="Please Enter the Place" />

            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="pin"
              label="Pin"
              rules={[
                {
                  required: true,
                  message: 'Please Enter a Pin',
                },
              ]}
            >
              <Input placeholder="Please Enter a Pin" />

            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Ph.No"
              rules={[
                {
                  required: true,
                  message: 'Please enter Phone Number',
                },
              ]}
            >
              <Input
                placeholder="Please enter Phone Number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gst"
              label="GST"
              rules={[
                {
                  required: true,
                  message: 'Please Enter GST',
                },
              ]}
            >
              <Input placeholder="Please Enter GST" />

            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="pan"
              label="PAN"
              rules={[
                {
                  required: true,
                  message: 'Please enter PAN Number',
                },
              ]}
            >
              <Input
                placeholder="Please enter PAN Number"
              />
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

export default CompanyForm