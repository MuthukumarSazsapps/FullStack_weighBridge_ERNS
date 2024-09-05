import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Radio, Drawer, Flex, Form, Input, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';

const SecondWeightForm = ({ form, action, allVehicleList,secondWeightList }) => {

    const [currentTime, setCurrentTime] = useState(dayjs().format('hh:mm:ss A'));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs().format('hh:mm:ss A'));
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    const options = secondWeightList.map((secondWeightList) => ({
        value: secondWeightList.tokenNo,
        label: secondWeightList.tokenNo,
    }));

    
    
    
    const handleChange = (value) => {
        // Find the matching vehicle type in the secondWeightList
        const selectedValue = secondWeightList.find(token => token.tokenNo === value);
    
        // Determine the loadType value
        const loadType = selectedValue && selectedValue.loadType === "empty" ? "Load" : "Empty";
    
        // Calculate netWeight only if selectedValue exists, ensuring it is non-negative
        const netWeight = selectedValue
            ? Math.abs(parseInt(form.getFieldValue('secondWeight') || 0) - parseInt(selectedValue.firstWeight))
            : 0;
    
        // Set form values
        form.setFieldsValue({
            amount: selectedValue ? selectedValue.chargeAmount : 0,
            VehicleNo: selectedValue ? selectedValue.VehicleNo : '',
            loadType: selectedValue ? loadType : "",
            firstWeight: selectedValue ? parseInt(selectedValue.firstWeight) : 0,
            netWeight: netWeight
        });
    };
    
    

    const handleValue = () => {
        form.setFieldsValue({
            measuredWeight: form.getFieldValue('scaleValue'),
            secondWeight: form.getFieldValue('scaleValue')

        });
        
    };


    // console.log(form.getFieldValue());

    return (
        <div>
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={12} className=''>
                        <Form.Item
                            name="scaleValue"
                            label="Scale Terminal"
                            rules={[
                                {
                                    // required: true,
                                    message: 'Please enter Weighing name',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Please enter Weighing name"
                                className='bg-black font-calculator text-4xl border-black text-red-500 h-20
                                            focus:bg-black focus:border-black focus:ring-0 hover:bg-black hover:border-black focus
                                            active:bg-black active:border-black'
                                // suffix="Kg"

                            />

                        </Form.Item>

                    </Col>
                    <Col span={12} className=' flex justify-around'>
                        <Form.Item
                            name="measuredWeight"
                            label="Measured Weight"
                            rules={[
                                {
                                    // required: true,
                                    message: 'Please enter Weighing name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Weighing name" disabled className='text-red-600'/>
                        </Form.Item>
                        <Button className='mt-7' onClick={handleValue}> Read</Button>
                        <p className='text-2xl text-green-600 mt-7'>{currentTime}</p>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="tokenNo"
                            label="Token No"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Token Number',
                                },
                            ]}
                        >
                           <Select
                                showSearch
                                onChange={handleChange}
                                placeholder="Select a Vehicle Number"
                                optionFilterProp="label"
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="VehicleNo"
                            label="Vehicle Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Vehicle Type',
                                },
                            ]}
                        >
                            <Select
                                disabled
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
                                disabled
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
                    {/* <Col span={8}>
                        <p className='text-3xl text-red-500 ml-5'>{form.getFieldValue('netWeight')?form.getFieldValue('netWeight')+" Kg":"0 KG"}</p>
                    </Col> */}
                </Row>
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
                                    <Input placeholder='Enter First Weight' disabled/>
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
                                    <Input placeholder='Enter Second Weight' disabled/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="netWeight"
                                    label="Net Weight"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Net Weight',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter Net Weight" disabled/>
                                </Form.Item>
                            </Col>
                        </Row>
            </Form>
        </div>
    )
}

export default SecondWeightForm

