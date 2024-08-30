import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import WeighingTable from './weighing-table';
import WeighingForm from './weighing-form';
import { getAllWeighingList,createWeighing,updateWeighingDetails,deleteWeighingDetails } from '../../app/api/weighing';
import { useLocalStorage } from 'react-use';
import { getAllVehicleList } from '../../app/api/vehicle';


const Weighing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allWeighingList, setAllWeighingList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [weighingId, setWeighingId] = useState(null);
  const [allVehicleList, setAllVehicleList] = useState([]);


  const [user] = useLocalStorage('user');
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result1 = await getAllVehicleList();
      setAllVehicleList(result1.data.vehicleList);
      const result = await getAllWeighingList();
      setAllWeighingList(result.data.weighingList);
      console.log("result1",result1);


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  const handleEdit = (record) => {
    setWeighingId(record.weighingId);
    setAction('update');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Weighing?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          setLoading(true);
          const res = await deleteWeighingDetails(data);
          if (res.data.status === true) {
            message.success('Weighing deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete Weighing'}`);
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
            res = await updateWeighingDetails({ ...data, weighingId,user });
          } else {
            res = await createWeighing({...data,user});
            
          }
          if (res.data.status === true) {
            message.success('Weighing saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to save Weighing'}`);
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
          <Button type="primary" onClick={showModal}>Create Weighing</Button>
        </Flex>
        <WeighingTable WeighingList={allWeighingList} handleEdit={handleEdit}  handleDelete={(data) => handleDelete(data)} title='Weighing List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit Weighing" : "Create Weighing"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={loading ? "Submitting..." : (action === 'update' ? "Update" : "Create")}
          cancelText="Cancel"
          width={1000}
        >
          <WeighingForm form={form} action={action} allVehicleList={allVehicleList}/>
        </Modal>
      )}
    </>
  );
};

export default Weighing;
