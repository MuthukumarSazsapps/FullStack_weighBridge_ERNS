import React, { useState, useEffect } from 'react'
import { Button, Col, Radio, Drawer, Flex, Form, Input, Row, Select, Space } from 'antd';

import dayjs from 'dayjs';

const WeighingForm = ({ form, action }) => {
    // console.log("action", action);
    const [currentTime, setCurrentTime] = useState(dayjs().format('hh:mm:ss A'));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs().format('hh:mm:ss A'));
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    return (
        <div>
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={12} className=''>
                        {/* <p className="text-4xl bg-black font-calculator rounded pt-3 px-2 text-red-500">54821</p> */}
                        <Form.Item
                            name="scaleTerminal"
                            label="Scale Terminal"
                            rules={[
                                {
                                    // required: true,
                                    message: 'Please enter Weighing name',
                                },
                            ]}
                        >
                            <Input
                                defaultValue="0"
                                placeholder="Please enter Weighing name"
                                className='bg-black font-calculator text-4xl border-black text-red-500 
                                            focus:bg-black focus:border-black focus:ring-0 hover:bg-black hover:border-black focus
                                            active:bg-black active:border-black'
                            />

                        </Form.Item>

                    </Col>
                    <Col span={12} className=' flex justify-around'>
                        <Form.Item
                            name="measuredWeigh"
                            label="Measured Weight"
                            rules={[
                                {
                                    // required: true,
                                    message: 'Please enter Weighing name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Weighing name" />
                        </Form.Item>
                        <Button className='mt-7'> Read</Button>
                        <p className='text-2xl text-green-600 mt-7'>{currentTime}</p>
                        {/* <div className='flex bg-black mt-7'>
                       
                        </div> */}
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="VehicleNo"
                            label="Vehicle No"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Vehicle Number',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Vehicle Number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
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
                                options={[
                                    {
                                        value: '14 wheel',
                                        label: '14 wheel',
                                    },
                                    {
                                        value: '12 wheel',
                                        label: '12 wheel',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="returnType"
                            label="Return Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter return type',
                                },
                            ]}
                        >
                            {/* <Select
                                showSearch
                                placeholder="Select a trip Type"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'firstWeight',
                                        label: 'firstWeight',
                                    },
                                    {
                                        value: 'secondWeight',
                                        label: 'secondWeight',
                                    },
                                ]}
                            /> */}
                            <Radio.Group>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={0}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="customerName"
                            label="customer Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter customer Name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter customer Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="driverName"
                            label="Driver Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Driver Name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Driver Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="materialName"
                            label="Material Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Material Name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Material Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="mobileNumber"
                            label="Mobile Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Mobile Number',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Mobile Number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="loadType"
                            label="Load Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Load Type',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a Load Type"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'empty',
                                        label: 'Empty',
                                    },
                                    {
                                        value: 'load',
                                        label: 'Load',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="billType"
                            label="Bill Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Bill Type ',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a Bill Type"
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
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="amount"
                            label="amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter amount',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Amount Name" />
                        </Form.Item>
                    </Col>
                </Row>
                {(action === 'update' ?
                    (
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="firstWeight"
                                    label="First weight"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter First Weight',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter First Weight' />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="secondWeight"
                                    label="Second weight"
                                    rules={[
                                        {
                                            // required: true,
                                            message: 'Please enter second weight ',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter Second Weight' />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="netWeight"
                                    label="Net Weight"
                                    rules={[
                                        {
                                            // required: true,
                                            message: 'Please Net Weight',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter Net Weight" />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                    :
                    null)}

            </Form>
        </div>
    )
}

export default WeighingForm

