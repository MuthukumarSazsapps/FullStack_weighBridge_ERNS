// import React, { useEffect, useState } from 'react';
// import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
// import CustomerTable from './customer-table';
// import CustomerForm from './customer-form';
// import { getallcompanylist, createcompany, deleteCompanyDetails, updateCompanyDetails } from '../../app/api/company';


// const Customer = () => {
//   const [open, setOpen] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [allCompanyList, setAllCompanyList] = useState([])
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [action, setAction] = useState('create'); // To differentiate between create and update
//   const [companyId, setCompanyId] = useState(null);

//   const showModal = () => {
//     setIsModalVisible(true);
//     setAction("create");
//   };

//   const fetchData = async () => {
//     try {
//       const result = await getallcompanylist();
//       setAllCompanyList(result.data.companyLists)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {

//     fetchData();
//   }, []);


//   const handleEdit = (record) => {
//     console.log("record",record);
//     setCompanyId(record.companyId); // Store the companyId in state
//     form.setFieldsValue(record); // Populate form with the selected record's data
//     setIsModalVisible(true);     // Open the modal for editing
//     setAction("update");
//   };

//   const handleDelete = async (data) => {
//     const res = await deleteCompanyDetails(data)
//     if (res.data.status === true) {
//       message.success('Company Deleted successfully!');
//       setLoading(false)
//       fetchData();
//     } else {
//       message.error(`Error: ${res.data.Message || 'Failed to Delete company'}`);
//     }

//   }

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then(async (data) => {
//         try {
//           console.log('Form values:', data);
//           setLoading(true)
//           let res;
//           if (action=='update') {
//             res = await updateCompanyDetails({...data,companyId }); // Update the existing record
//           } else {
//             res = await createcompany(data); // Create a new record
//           }
//           if (res.data.status === true) {
//             message.success('Company created successfully!');
//             setIsModalVisible(false);
//             setLoading(false)
//             form.resetFields();
//             fetchData();
//           } else {
//             message.error(`Error: ${res.data.Message || 'Failed to create company'}`);
//           }
//         } catch (error) {
//           message.error(`API Error: ${error.message}`);
//         }
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//       });
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   return (
//     <>
//       <Flex vertical gap='middle'>
//         <Flex justify='flex-end'>
//           <Button type="primary" onClick={showModal} >Create Company</Button>
//         </Flex>
//         <CustomerTable companyList={allCompanyList} handleEdit={(data) => handleEdit(data)} handleDelete={(data) => handleDelete(data)} title='Customer List' />
//       </Flex>

//       {isModalVisible ? <Modal
//         title="Create Company"
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText={loading ? 'loading...' : "Submit"}
//         // loading={loading}
//         cancelText="Cancel"
//       >
//         <CustomerForm form={form} />
//       </Modal> : null}
//     </>
//   )
// };
// export default Customer;



import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import CustomerTable from './customer-table';
import CustomerForm from './customer-form';
import { getallcompanylist, createcompany, updateCompanyDetails, deleteCompanyDetails } from '../../app/api/company';
import { useLocalStorage } from 'react-use';
import dayjs from 'dayjs';

const Customer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allCompanyList, setAllCompanyList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [companyId, setCompanyId] = useState(null);

  const [user] = useLocalStorage('user');

  console.log("day",dayjs().format('MM/DD/YYYY, h:mm A') );
  
  
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result = await getallcompanylist();
      setAllCompanyList(result.data.companyLists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setCompanyId(record.companyId);
    setAction('update');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this company?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          setLoading(true);
          const res = await deleteCompanyDetails(data);
          if (res.data.status === true) {
            message.success('Company deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete company'}`);
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
            res = await updateCompanyDetails({ ...data, companyId,user });
          } else {
            res = await createcompany(data);
          }
          if (res.data.status === true) {
            message.success('Company saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to save company'}`);
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
          <Button type="primary" onClick={showModal}>Create Company</Button>
        </Flex>
        <CustomerTable companyList={allCompanyList} handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='Customer List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit Company" : "Create Company"}
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
