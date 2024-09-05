import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const ProductForm = ({ form }) => {
  console.log("form", form);

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ledgerName"
              label="Ledger Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Ledger name',
                },
              ]}
            >
              <Input placeholder="Please enter Ledger name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Customer name',
                },
              ]}
            >
              <Input placeholder="Please enter Customer Name" />
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
              name="emailId"
              label="Email Id"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Email Id',
                },
              ]}
            >
              <Input placeholder="Please Enter Email Id" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="openingBalance"
              label="OP Balance"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Opening Balance',
                },
              ]}
            >
              <Input placeholder="Please Enter Opening Balance" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="mode"
              label=" "
              rules={[
                {
                  required: true,
                  message: 'Please select mode',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a mode"
                optionFilterProp="label"
                options={[
                  {
                    value: 'debit',
                    label: 'Debit',
                  },
                  {
                    value: 'credit',
                    label: 'Credit',
                  }
                ]}
              />
              
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="customerType"
              label="Customer Type"
              rules={[
                {
                  required: true,
                  message: 'Please Select Customer Type',
                },
              ]}
            >
             <Select
                showSearch
                placeholder="Select a Customer Type"
                optionFilterProp="label"
                options={[
                  {
                    value: 'cash',
                    label: 'Cash',
                  },
                  {
                    value: 'online',  
                    label: 'Online',   
                  },
                  {
                    value: 'credit',
                    label: 'Credit',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="active"
              label="Active"
              rules={[
                {
                  required: true,
                  message: 'Please select Active',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a Active"
                optionFilterProp="label"
                options={[
                  {
                    value: 'activated',
                    label: 'Activated',
                  },
                  {
                    value: 'deactivated',
                    label: 'DeActivated',
                  }
                  
                ]}
              />
              
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ProductForm