import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Radio, Drawer, Flex, Form, Input, Row, Select, Space, Card, Modal, message } from 'antd';
import dayjs from 'dayjs';
import VehicleTypeForm from '../masters/vehicle/vehicleType/vehicleType-form';
import { useLocalStorage } from 'react-use';
import { createVehicleType, getAllVehicleTypeList } from '../../app/api/vehicle';
import ProductForm from '../masters/product/product-form';
import { createProduct, getAllProductList } from '../../app/api/product';


const WeighingForm = ({ form, action, allCustomerList }) => {

    const [currentTime, setCurrentTime] = useState(dayjs().format('hh:mm:ss A'));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData] = useLocalStorage('userData');
    const [formm] = Form.useForm();
    const customform=formm
    const [isForm, setIsForm] = useState(null)
    const [allVehicleList, setAllVehicleList] = useState([]);
    const [allProductList, setAllProductList] = useState([]);


   

    let user=userData.username

    const fetchData = async () => {
        try {
          const vehicleType = await getAllVehicleTypeList();
          setAllVehicleList(vehicleType.data.vehicleList);
          const productList = await getAllProductList();
          setAllProductList(productList.data.productList)
          
        } catch (error) {
          console.log(error);
        }
      };


    useEffect(() => {
        fetchData()
        const timer = setInterval(() => {
            setCurrentTime(dayjs().format('hh:mm:ss A'));
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

 
    
    
    const vehicleTypeOptions = allVehicleList.map((vehicleTypeList) => ({
        value: vehicleTypeList.vehicleTypeId,
        label: vehicleTypeList.vehicleType,
    }));

    const productOptions = allProductList.map((allProductList) => ({
        value: allProductList.productId,
        label: allProductList.productName,
    }));

    const customerOptions = allCustomerList.map((allCustomerList) => ({
        value: allCustomerList.customerName,
        label: allCustomerList.customerName,
    }));

    const handleChange = (value) => {
        // Find the matching vehicle type in the allVehicleList
        const selectedVehicle = allVehicleList.find(vehicle => vehicle.vehicleTypeId === value);
        console.log("selectedVehicle", selectedVehicle);

        // Set the amount field with the chargeAmount if a match is found
        form.setFieldsValue({
            amount: selectedVehicle ? selectedVehicle.chargeAmount : 0, // Default to 0 if no match found
        });
    };


    const handleValue = () => {
        form.setFieldsValue({
            measuredWeight: form.getFieldValue('scaleValue')
        });

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        // form.resetFields();
        // setLoading(false);
    };

    const showModal = (formType) => {
        setIsModalVisible(true);
        setIsForm(formType);
    };

    const handleOkk = () => {
        console.log("oklklkd");
        
        
        
        customform
          .validateFields()
          .then(async (data) => {
            try {
              console.log('Form values:', data);
              setLoading(true);
              let res
              if(isForm=='vehicleType'){
                 res = await createVehicleType({...data,user});
              }else{
                 res = await createProduct({...data,user});
              }
              if (res.data.status === true) {
                message.success('Vehicle saved successfully!');
                setIsModalVisible(false);
                setLoading(false);
                customform.resetFields();
                fetchData();
              } else {
                message.warning(`Warning : ${res.data.message || 'Failed to save Vehicle'}`);
                setLoading(false);
              }
            } catch (error) {
              message.error(`API Error: ${error.message}`);
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      };

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
                                className='bg-black font-calculator text-5xl border-black text-red-500 h-24
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
                            <Input placeholder="Please enter Weighing name" />
                        </Form.Item>
                        <Button className='mt-7' onClick={handleValue}> Read</Button>
                        <p className='text-2xl text-green-600 mt-7'>{currentTime}</p>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="vehicleNumber"
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


                    <Col span={9} >
                        <Space.Compact className='w-full'>
                            <Form.Item
                                className='w-full'
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
                                    onChange={handleChange}
                                    placeholder="Select a vehicle Type"
                                    optionFilterProp="label"
                                    options={vehicleTypeOptions}
                                />

                            </Form.Item>
                            <Button size="medium" className='mt-[30px]' type="primary" onClick={()=>showModal('vehicleType')}>Add</Button>
                        </Space.Compact>
                       

                    </Col>


                    <Col span={7} className='flex justify-center'>
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
                            <Radio.Group>
                                <Radio value={"yes"}>Yes</Radio>
                                <Radio value={"No"}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="customerName"
                            label="Customer Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter customer Name',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                // onChange={handleChange}
                                placeholder="Select Customer"
                                optionFilterProp="label"
                                options={customerOptions}
                            />
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
                    <Space.Compact className='w-full'>
                        <Form.Item
                            className='w-full'
                            name="materialName"
                            label="Material Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Material Name',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a product "
                                optionFilterProp="label"
                                options={productOptions}

                            />
                        </Form.Item>
                            <Button size="medium" className='mt-[30px]' type="primary" onClick={()=>showModal('product')}>Add</Button>
                        </Space.Compact>
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
                            label="Amount"
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

            <Modal
                title='create'
                open={isModalVisible}
                onOk={handleOkk}
                // onClick={handleOkk}
                onCancel={handleCancel}
                okText={loading?"submiting":'submit'}
                cancelText="Cancel"

            >
               {isForm=='vehicleType' ?<VehicleTypeForm form={customform}/>:<ProductForm form={customform}/> }
            </Modal>
        </div>
    )
}

export default WeighingForm

