import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import { getAllVehicleTypeList,getAllVehicleNumberList,createVehicleNumber,updateVehicleNumberDetails,deleteVehicleNumberDetails } from '../../../../app/api/vehicle';
import { useLocalStorage } from 'react-use';
import VehicleNumberForm from './vehicleNumber-form';
import VehicleNumberTable from './vehicleNumber-table';


const VehicleNumber = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allVehicleNumberList, setAllVehicleNumberList] = useState([]);
  const [allVehicleTypeList, setAllVehicleTypeList] = useState([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [vehicleNumId, setVehicleNumId] = useState(null);
  const [userData] = useLocalStorage('userData');

  let user=userData.username
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
        const result1 = await getAllVehicleNumberList();
        const result2 = await getAllVehicleTypeList();

        setAllVehicleNumberList(result1.data.vehicleNumberList);
        setAllVehicleTypeList(result2.data.vehicleList);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setVehicleNumId(record.vehicleNumId);
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
          const res = await deleteVehicleNumberDetails(data);
          if (res.data.status === true) {
            message.success('Vehicle Number deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete Vehicle Number'}`);
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
            res = await updateVehicleNumberDetails({ ...data, vehicleNumId,user });
          } else {
            res = await createVehicleNumber({...data,user});
          }
          if (res.data.status === true) {
            message.success('Vehicle Number saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.warning(`Warning : ${res.data.message || 'Failed to save Vehicle Number'}`);
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
          <Button type="primary" onClick={showModal}>Create Vehicle Number</Button>
        </Flex>
        <VehicleNumberTable vehicleNumberList={allVehicleNumberList}  handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='Vehicle List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit Vehicle Number" : "Create Vehicle Number"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={loading ? "Submitting..." : (action === 'update' ? "Update" : "Create")}
          cancelText="Cancel"
        >
          <VehicleNumberForm form={form}  vehicleTypeList={allVehicleTypeList}/>
        </Modal>
      )}
    </>
  );
};

export default VehicleNumber;
