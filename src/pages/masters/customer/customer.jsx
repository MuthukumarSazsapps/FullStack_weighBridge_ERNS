import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import CustomerTable from './customer-table';
import CustomerForm from './customer-form';
import { getAllCustomerList,createCustomer,updateCustomerDetails,deleteCustomerDetails } from '../../../app/api/customer';
import { useLocalStorage } from 'react-use';


const Customer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allCustomerList, setAllCustomerList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [customerId, setCustomerId] = useState(null);

  const [user] = useLocalStorage('user');
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result = await getAllCustomerList();
      setAllCustomerList(result.data.customerList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setCustomerId(record.customerId);
    setAction('update');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Customer?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          setLoading(true);
          const res = await deleteCustomerDetails(data);
          if (res.data.status === true) {
            message.success('Customer deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete Customer'}`);
          }
        } catch (error) {
          message.error(`API Error: ${error.message}`);
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        console.log('Deletion cancelled');
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (data) => {
        try {
          console.log('Form values:', data);
          setLoading(true);
          let res;
          if (action === 'update') {
            res = await updateCustomerDetails({ ...data, customerId,user });
          } else {
            res = await createCustomer({...data,user});
          }
          if (res.data.status === true) {
            message.success('Customer saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to save Customer'}`);
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
          <Button type="primary" onClick={showModal}>Create Customer</Button>
        </Flex>
        <CustomerTable customerList={allCustomerList} handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='Customer List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit Customer" : "Create Customer"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={loading ? "Submitting..." : (action === 'update' ? "Update" : "Create")}
          cancelText="Cancel"
        >
          <CustomerForm form={form} />
        </Modal>
      )}
    </>
  );
};

export default Customer;
