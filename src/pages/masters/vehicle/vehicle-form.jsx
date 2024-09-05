import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const VehicleForm = ({ form }) => {
  console.log("form", form);

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={14}>
            <Form.Item
              name="vehicleType"
              label="Vehicle Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Wheel ',
                },
              ]}
            >
              <Input placeholder="Please enter Wheel" suffix="wheel"/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="chargeAmount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: 'Please enter Amount ',
                },
              ]}
            >
              <Input placeholder="Please Enter Amount" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default VehicleForm