import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';

const WeighbridgeForm = () => {
  const [form] = Form.useForm();
  const [currentWeight, setCurrentWeight] = useState(null);

  // Example function to fetch weight from weighbridge (replace with actual API call)
  const fetchWeighbridgeWeight = async () => {
    // Simulating a fetch call
    const weight = await getWeighbridgeWeight();
    setCurrentWeight(weight);
  };

  // Replace this with actual API call to get the weighbridge weight
  const getWeighbridgeWeight = () => {
    // This is just a simulated value; replace with actual logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(12345); // Simulated weight value
      }, 1000);
    });
  };

  useEffect(() => {
    fetchWeighbridgeWeight();
  }, []);

  const handleSubmit = async (values) => {
    console.log('Form Values:', values);
    // Add your submission logic here
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="vehicleNumber"
        label="Vehicle Number"
        rules={[{ required: true, message: 'Please enter the vehicle number' }]}
      >
        <Input placeholder="Enter vehicle number" />
      </Form.Item>

      <Form.Item
        name="driverName"
        label="Driver Name"
        rules={[{ required: true, message: 'Please enter the driver name' }]}
      >
        <Input placeholder="Enter driver name" />
      </Form.Item>

      <Form.Item
        label="Current Weight (kg)"
      >
        <InputNumber
          value={currentWeight}
          placeholder="Current weight"
          style={{ width: '100%' }}
          disabled
        />
      </Form.Item>

      <Form.Item
        name="loadWeight"
        label="Load Weight (kg)"
        rules={[{ required: true, message: 'Please enter the load weight' }]}
      >
        <InputNumber placeholder="Enter load weight" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="emptyWeight"
        label="Empty Weight (kg)"
        rules={[{ required: true, message: 'Please enter the empty weight' }]}
      >
        <InputNumber placeholder="Enter empty weight" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="entryTime"
        label="Entry Time"
        rules={[{ required: true, message: 'Please select the entry time' }]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="exitTime"
        label="Exit Time"
        rules={[{ required: true, message: 'Please select the exit time' }]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WeighbridgeForm;
