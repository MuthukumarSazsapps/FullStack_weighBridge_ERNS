import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import UserTable from './user-table';
import UserForm from './user-form'
import { useLocalStorage } from 'react-use';
import { createUser, deleteUserDetails, getAllUserList, updateUserDetails } from '../../../app/api/user';


const User = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allUserList, setAllUserList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [userId, setUserId] = useState(null);

  const [userData] = useLocalStorage('userData'); // As for now this is a session cookie, need to discuss
  const user=userData?.role
  const companyId=userData?.companyId

  // setUserId(userData.userId)
  
  
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result = await getAllUserList();
      setAllUserList(result.data.userList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setUserId(record.userId);
    setAction('update');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this User?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          setLoading(true);
          const res = await deleteUserDetails(data);
          if (res.data.status === true) {
            message.success('User deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete User'}`);
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
            res = await updateUserDetails({ ...data, userId,user,companyId });
          } else {
            res = await createUser({...data,user,userId,companyId });
          }
          if (res.data.status === true) {
            message.success('User saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to save User'}`);
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
          <Button type="primary" onClick={showModal}>Create User</Button>
        </Flex>
        <UserTable UserList={allUserList} handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='User List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit User" : "Create User"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={loading ? "Submitting..." : (action === 'update' ? "Update" : "Create")}
          cancelText="Cancel"
        >
          <UserForm form={form} />
        </Modal>
      )}
    </>
  );
};

export default User;
