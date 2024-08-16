import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import CustomerTable from './customer-table';
import CustomerForm from './customer-form';
import { getallcompanylist, createcompany } from '../../app/api/company';


const Customer = () => {
  const [open, setOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allCompanyList, setAllCompanyList] = useState([])
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const fetchData = async () => {
    try {
      const result = await getallcompanylist();
      // setAllCompanyList(result.data.companyLists)
      console.log("nodeserver",result);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

     fetchData();
  }, []);


  const handleEdit = (record) => {
    form.setFieldsValue(record); // Populate form with the selected record's data
    setIsModalVisible(true);     // Open the modal for editing
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (data) => {
        try {
          console.log('Form values:', data);
          setLoading(true)
          let res;
          if (data.id) {
            res = await updateCompany(data); // Update the existing record
          } else {
            res = await createcompany(data); // Create a new record
          }
          if (res.data.status === true) {
            message.success('Company created successfully!');
            setIsModalVisible(false);
            setLoading(false)
            form.resetFields();
          } else {
            message.error(`Error: ${res.data.Message || 'Failed to create company'}`);
          }
        } catch (error) {
          message.error(`API Error: ${error.message}`);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };



  return (
    <>
      <Flex vertical gap='middle'>
        <Flex justify='flex-end'>
          <Button type="primary" onClick={showModal} >Create Company</Button>
        </Flex>
        <CustomerTable companyList={allCompanyList} handleEdit={(data) => handleEdit(data)} title='Customer List' />
      </Flex>

      {isModalVisible ? <Modal
        title="Create Company"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={loading ? loading : "Submit"}
        // loading={loading}
        cancelText="Cancel"
      >
        <CustomerForm form={form} />
      </Modal> : null}
    </>
  )
};
export default Customer;


