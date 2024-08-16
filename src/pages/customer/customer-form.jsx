import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const CustomerForm = ({ form,loading }) => {
  console.log("form",form);
  
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
          {/* <Col span={12}>
            <Form.Item
              name="dateTime"
              label="year From"
              rules={[
                {
                  required: true,
                  message: 'Please choose the dateTime',
                },
              ]}
            >
              <DatePicker.RangePicker
                style={{
                  width: '100%',
                }}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}>
          <Col span={12}>
                <Form.Item
                name='username'
                label='User Name'
                rules={[{
                  required:true,
                  message:'please Enter User Name'
                }]}
                >
                   <Input placeholder="Please enter user name" />
                </Form.Item>
          </Col>
          <Col span={12}>
                <Form.Item
                name='BusinessName'
                label='Business Name'
                rules={[{
                  required:true,
                  message:'please Enter Business Name'
                }]}
                >
                   <Input placeholder="Please enter user Business Name" />
                </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Address',
                },
              ]}
            >
              <Input placeholder="Please Enter Your Address"/>
               
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Place"
              label="Place"
              rules={[
                {
                  required: true,
                  message: 'Please Enter the Place',
                },
              ]}
            >
              <Input placeholder="Please Enter the Place"/>
                
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Pin"
              label="Pin"
              rules={[
                {
                  required: true,
                  message: 'Please Enter a Pin',
                },
              ]}
            >
              <Input placeholder="Please Enter a Pin"/>
                
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="PhoneNO"
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
              name="GST"
              label="GST"
              rules={[
                {
                  required: true,
                  message: 'Please Enter GST',
                },
              ]}
            >
              <Input placeholder="Please Enter GST"/>
                
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Pan"
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
              name="Password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Password',
                },
              ]}
            >
              <Input placeholder="Please Enter Password"/>
                
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ConfirmPassword"
              label="ConfirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter ConfirmPassword',
                },
              ]}
            >
              <Input
                placeholder="Please enter ConfirmPassword"
              />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter url description" />
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </div>
  )
}

export default CustomerForm