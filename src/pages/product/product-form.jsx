import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const ProductForm = ({ form }) => {
  console.log("form", form);

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Product name',
                },
              ]}
            >
              <Input placeholder="Please enter Product name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ProductForm