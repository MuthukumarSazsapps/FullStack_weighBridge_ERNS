import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import WeighingTable from './weighing-table';
import WeighingForm from './weighing-form';
import { getAllWeighingList,createWeighing,updateWeighingDetails,deleteWeighingDetails, getSecondWeightList, updateSecondWeight } from '../../app/api/weighing';
import { useLocalStorage } from 'react-use';
import { getAllVehicleList } from '../../app/api/vehicle';
import SecondWeightForm from './secondWeight-form';


const Weighing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allWeighingList, setAllWeighingList] = useState([]);
  const [allVehicleList, setAllVehicleList] = useState([]);
  const [secondWeightList,setsecondWeightList]=useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [tokenNo, setTokenNo] = useState(null);
  const [isForm,setIsForm]=useState(null)
  const [user] = useLocalStorage('user');


const showModal = (formType) => {
  setIsModalVisible(true);
  setAction('create');
  setIsForm(formType); // If 'firstWeight' is clicked, set form to WeighingForm; otherwise SecondWeightForm
};

  const fetchData = async () => {
    try {
      const result1 = await getAllVehicleList();
      const result2=await getSecondWeightList();
      setsecondWeightList(result2.data.secondWeightList)
      console.log("result2",result2);
      
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
    setTokenNo(record.tokenNo);
    setAction('update');
    setIsForm('firstWeight');
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
            res = await updateWeighingDetails({ ...data, tokenNo,user });
          } else {
            if(isForm==='firstWeight'){
              res = await createWeighing({...data,user});
            }else{
              res = await updateSecondWeight({...data,user});
            }
            
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
        <Flex justify='flex-end' gap={5}>
          <Button type="primary" onClick={()=>showModal('firstWeight')}>First Weight</Button>
          <Button type="primary" onClick={()=>showModal('secondweight')}>Second Weight</Button>

        </Flex>
        <WeighingTable WeighingList={allWeighingList} handleEdit={handleEdit}  handleDelete={(data) => handleDelete(data)} title='Weighment List' />
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
        { isForm==="firstWeight" ?( <WeighingForm form={form} action={action} allVehicleList={allVehicleList}/>):
         ( <SecondWeightForm form={form} action={action} allVehicleList={allVehicleList} secondWeightList={secondWeightList}/>)}
        </Modal>
      )}
    </>
  );
};

export default Weighing;
