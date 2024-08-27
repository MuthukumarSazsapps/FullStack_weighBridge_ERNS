import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import VehicleTable from './vehicle-table';
import VehicleForm from './vehicle-form';
import { getAllVehicleList,createVehicle,updateVehicleDetails,deleteVehicleDetails } from '../../app/api/vehicle';
import { useLocalStorage } from 'react-use';


const Vehicle = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allVehicleList, setAllVehicleList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [VehicleId, setVehicleId] = useState(null);

  const [user] = useLocalStorage('user');
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result = await getAllVehicleList();
      setAllVehicleList(result.data.VehicleList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setVehicleId(record.VehicleId);
    setAction('update');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Vehicle?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          setLoading(true);
          const res = await deleteVehicleDetails(data);
          if (res.data.status === true) {
            message.success('Vehicle deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete Vehicle'}`);
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
            res = await updateVehicleDetails({ ...data, VehicleId,user });
          } else {
            res = await createVehicle({...data,user});
          }
          if (res.data.status === true) {
            message.success('Vehicle saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to save Vehicle'}`);
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
          <Button type="primary" onClick={showModal}>Create Vehicle</Button>
        </Flex>
        <VehicleTable VehicleList={allVehicleList} handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='Vehicle List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit Vehicle" : "Create Vehicle"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={loading ? "Submitting..." : (action === 'update' ? "Update" : "Create")}
          cancelText="Cancel"
        >
          <VehicleForm form={form} />
        </Modal>
      )}
    </>
  );
};

export default Vehicle;
