import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Select } from 'antd';


const VehicleNumberForm = ({ form,vehicleTypeList }) => {
  console.log("form", form);
 

  const options = vehicleTypeList.map((vehicleTypeList) => ({
    value: vehicleTypeList.vehicleTypeId,
    label: vehicleTypeList.vehicleType,
}));

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="vehicleNumber"
              label="Vehicle Number"
              rules={[
                {
                  required: true,
                  message: 'Please enter Vehicle Number ',
                },
              ]}
            >
              <Input placeholder="Please enter VehicleNumber"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
                name="vehicleType"
                label="Vehicle Type"
                rules={[
                    {
                        required: true,
                        message: 'Please enter Vehicle type',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Select a vehicle Type"
                    optionFilterProp="label"
                    options={options}
                    
                />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="driverName"
              label="driver Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Driver Name ',
                },
              ]}
            >
              <Input placeholder="Please enter Driver Name"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please enter Phone Number ',
                },
              ]}
            >
              <Input placeholder="Please Enter Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Form.Item
                name="description"
                label="Description"
              >
                <Input placeholder="Please Enter Phone Number" />
              </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default VehicleNumberForm