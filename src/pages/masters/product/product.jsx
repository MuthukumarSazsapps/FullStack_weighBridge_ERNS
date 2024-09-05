import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import ProductTable from './product-table';
import ProductForm from './product-form';
import { getAllProductList,createProduct,updateProductDetails,deleteProductDetails } from '../../../app/api/product';
import { useLocalStorage } from 'react-use';


const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allProductList, setAllProductList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [productId, setProductId] = useState(null);

  const [user] = useLocalStorage('user');
  const showModal = () => {
    setIsModalVisible(true);
    setAction('create');
  };

  const fetchData = async () => {
    try {
      const result = await getAllProductList();
      setAllProductList(result.data.productList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setProductId(record.productId);
    setAction('update');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Product?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          setLoading(true);
          const res = await deleteProductDetails(data);
          if (res.data.status === true) {
            message.success('Product deleted successfully!');
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to delete Product'}`);
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
            res = await updateProductDetails({ ...data, productId,user });
          } else {
            res = await createProduct({...data,user});
          }
          if (res.data.status === true) {
            message.success('Product saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            form.resetFields();
            fetchData();
          } else {
            message.error(`Error: ${res.data.message || 'Failed to save Product'}`);
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
          <Button type="primary" onClick={showModal}>Create Product</Button>
        </Flex>
        <ProductTable ProductList={allProductList} handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='Product List' />
      </Flex>

      {isModalVisible && (
        <Modal
          title={action === 'update' ? "Edit Product" : "Create Product"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={loading ? "Submitting..." : (action === 'update' ? "Update" : "Create")}
          cancelText="Cancel"
        >
          <ProductForm form={form} />
        </Modal>
      )}
    </>
  );
};

export default Product;
