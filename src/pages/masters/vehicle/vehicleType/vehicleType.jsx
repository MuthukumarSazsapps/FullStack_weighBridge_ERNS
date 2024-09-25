import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import VehicleTable from './vehicleType-table';
import VehicleForm from './vehicleType-form';
import { getAllVehicleTypeList,createVehicleType,updateVehicleTypeDetails,deleteVehicleTypeDetails } from '../../../../app/api/vehicle';
import { useLocalStorage } from 'react-use';


const VehicleType = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allVehicleList, setAllVehicleList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [vehicleId, setVehicleId] = useState(null);
  const [userData] = useLocalStorage('userData');

  let user=userData.username
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result = await getAllVehicleTypeList();
      setAllVehicleList(result.data.vehicleList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setVehicleId(record.vehicleId);
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
          const res = await deleteVehicleTypeDetails(data);
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
            res = await updateVehicleTypeDetails({ ...data, vehicleId,user });
          } else {
            res = await createVehicleType({...data,user});
          }
          if (res.data.status === true) {
            message.success('Vehicle saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
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

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  return (
    <>
      <Flex vertical gap='middle'>
        <Flex justify='flex-end'>
          <Button type="primary" onClick={showModal}>Create VehicleType</Button>
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

export default VehicleType;
