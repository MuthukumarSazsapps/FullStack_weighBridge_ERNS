import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import WeighingTable from './weighing-table';
import WeighingForm from './weighing-form';
import { getAllWeighingList, createWeighing, updateWeighingDetails, deleteWeighingDetails, getSecondWeightList, updateSecondWeight } from '../../app/api/weighing';
import { useLocalStorage } from 'react-use';
import { getAllVehicleTypeList } from '../../app/api/vehicle';
import { getAllCustomerList } from '../../app/api/customer';
import SecondWeightForm from './secondWeight-form';
import JsBarcode from 'jsbarcode';
import dayjs from 'dayjs';
import { getScreenShot } from '../../app/api/camera';
import { getAllProductList } from '../../app/api/product';




const Weighing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allWeighingList, setAllWeighingList] = useState([]);
  const [allVehicleList, setAllVehicleList] = useState([]);
  const [secondWeightList, setsecondWeightList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [allCustomerList, setAllCustomerList] = useState([]);


  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [tokenNo, setTokenNo] = useState(null);
  const [isForm, setIsForm] = useState(null)
  const [userData] = useLocalStorage('userData');
  const user=userData.username
  console.log("user",user);
  console.log("env",process.env);

  
  // const canvasRef = useRef(null);

  console.log("path",process.env.IMAGE_SAVE_PATH);
  

  const showModal = (formType) => {
    setIsModalVisible(true);
    setAction('create');
    setIsForm(formType); // If 'firstWeight' is clicked, set form to WeighingForm; otherwise SecondWeightForm
  };

  const fetchData = async () => {
    try {
      const vehicleType = await getAllVehicleTypeList();
      setAllVehicleList(vehicleType.data.vehicleList);
      const secondWeightList = await getSecondWeightList();
      setsecondWeightList(secondWeightList.data.secondWeightList)
      const productList = await getAllProductList();
      setAllProductList(productList.data.productList)
      const weighingTransactionList = await getAllWeighingList();
      setAllWeighingList(weighingTransactionList.data.weighingList);
      const customerList=await getAllCustomerList();
      setAllCustomerList(customerList.data.customerList)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);




  // const handlePrint = (record) => {
  //   console.log("record", record);
  
  //   // Create a temporary canvas element for generating the barcode
  //   const canvas = document.createElement('canvas');
  //   JsBarcode(canvas, record.tokenNo, {
  //     format: "CODE128",
  //     displayValue: true,
  //     width: 1.5, // Adjust barcode width for thermal printer
  //     height: 40, // Adjust barcode height for readability
  //   });
  
  //   // Get the current date and time
  //   const currentDate = dayjs().format('YYYY-MM-DD');
  //   const currentTime = dayjs().format('hh:mm:ss A');
  
  //   // Prepare the HTML content for the receipt
  //   const receiptHTML = `
  //     <html>
  //       <head>
  //         <title>WeighMent Receipt</title>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //             font-size: 10px; /* Set smaller font size for thermal printer */
  //             margin: 0;
  //             padding: 0;
  //           }
  //           .receipt-container {
  //             width: 80mm; /* For 58mm thermal paper, or use 80mm for wider printers */
  //             padding: 5mm;
  //             text-align: center;
  //             border: 1px solid black; /* Keep the border */
  //             position: relative;
  //             box-sizing: border-box;
  //             overflow: hidden; /* Ensure the barcode doesn't overflow */
  //           }
  //           h2 {
  //             margin: 10px 0;
  //             font-size: 14px;
  //           }
  //           .info-row {
  //             margin-bottom: 5px;
  //             display: flex;
  //             justify-content: space-between;
  //             font-size: 10px;
  //           }
  //           .info-row strong {
  //             text-align: left;
  //           }
  //           .date {
  //             position: absolute;
  //             top: 5px;
  //             left: 5px;
  //             font-size: 10px;
  //           }
  //           .time {
  //             position: absolute;
  //             top: 5px;
  //             right: 5px;
  //             font-size: 10px;
  //           }
  //           .barcode {
  //             margin: 10px 0;
  //             display: inline-block;
  //             word-wrap: break-word; /* Wrap the barcode within the container */
  //             max-width: 100%; /* Ensure barcode doesn't exceed the container width */
  //           }
  //           .barcode img {
  //             max-width: 100%;
  //             height: auto;
  //           }
  //           .description {
  //             margin-top: 10px;
  //             border-top: 1px solid #000;
  //             padding-top: 5px;
  //             font-size: 10px;
  //             text-align: left;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="receipt-container">
  //           <div class="date">${currentDate}</div>
  //           <div class="time">${currentTime}</div>
  //           <h2>WeighMent Receipt</h2>
  //           <div class="info-row">
  //             <strong>Vehicle No:</strong> <span>${record.vehicleNo}</span>
  //           </div>
  //           <div class="info-row">
  //             <strong>Token No:</strong> <span>${record.tokenNo}</span>
  //           </div>
  //           <div class="info-row">
  //             <strong>Amount:</strong> <span>${record.amount}</span>
  //           </div>
  //           <div class="info-row">
  //             <strong>First Weight:</strong> <span>${record.firstWeight}</span>
  //           </div>
  //           <div class="info-row">
  //             <strong>Net Weight:</strong> <span>${record.netWeight}</span>
  //           </div>
  //           <div class="barcode">
  //             <img src="${canvas.toDataURL()}" alt="Barcode"/>
  //           </div>
  //           <div class="description">
  //             Thank you for choosing us. This is a description or additional information area.
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //   `;
  
  //   // Open the print window and write the receipt content
  //   const printWindow = window.open('', '_blank');
  //   printWindow.document.write(receiptHTML);
  //   printWindow.document.close();
  
  //   // Wait until the content is loaded before printing
  //   printWindow.onload = function () {
  //     printWindow.print();
  //   };
  
  //   // Cleanup the canvas element
  //   canvas.remove();
  // };
  


  const handlePrint = (record) => {
    console.log("record", record);
  
    // Create a temporary canvas element for generating the barcode
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, record.tokenNo, {
      format: "CODE128",
      displayValue: true,
      width: 1.5, // Adjust barcode width for thermal printer
      height: 40, // Adjust barcode height for readability
    });
  
    // Get the current date and time
    const currentDate = dayjs().format('YYYY-MM-DD');
    const currentTime = dayjs().format('hh:mm:ss A');
  
    // Prepare the HTML content for the receipt
    const receiptHTML = `
      <html>
        <head>
          <title>WeighMent Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 10px; /* Set smaller font size for thermal printer */
              margin: 0;
              padding: 0;
            }
            .receipt-container {
              width: 80mm; /* For 58mm thermal paper */
              padding: 5mm;
              text-align: center;
              border: 1px solid black; /* Keep the border */
              position: relative;
              box-sizing: border-box;
              overflow: hidden; /* Ensure the barcode doesn't overflow */
            }
            h2 {
              margin: 10px 0;
              font-size: 14px;
            }
            .info-row {
              margin-bottom: 5px;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
            }
            .info-row strong {
              text-align: left;
            }
            .date {
              position: absolute;
              top: 5px;
              left: 5px;
              font-size: 10px;
            }
            .time {
              position: absolute;
              top: 5px;
              right: 5px;
              font-size: 10px;
            }
            .barcode {
              margin: 10px 0;
              display: inline-block;
              word-wrap: break-word; /* Wrap the barcode within the container */
              max-width: 100%; /* Ensure barcode doesn't exceed the container width */
            }
            .barcode img {
              max-width: 100%;
              height: auto;
            }
            .description {
              margin-top: 10px;
              border-top: 1px solid #000;
              padding-top: 5px;
              font-size: 10px;
              text-align: left;
            }
  
            /* Media query for A4 and A5 paper sizes */
            @media print and (min-width: 210mm) {
              .receipt-container {
                width: auto; /* Use full width for A4 and A5 */
                padding: 20mm;
              }
              body {
                font-size: 12px; /* Adjust font size for larger paper */
              }
              h2 {
                font-size: 18px;
              }
              .info-row {
                font-size: 12px;
              }
              .date, .time {
                font-size: 12px;
              }
              .description {
                font-size: 12px;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="date">${currentDate}</div>
            <div class="time">${currentTime}</div>
            <h2>WeighMent Receipt</h2>
            <div class="info-row">
              <strong>Vehicle No:</strong> <span>${record.vehicleNo}</span>
            </div>
            <div class="info-row">
              <strong>Token No:</strong> <span>${record.tokenNo}</span>
            </div>
            <div class="info-row">
              <strong>Amount:</strong> <span>${record.amount}</span>
            </div>
            <div class="info-row">
              <strong>First Weight:</strong> <span>${record.firstWeight}</span>
            </div>
            <div class="info-row">
              <strong>Net Weight:</strong> <span>${record.netWeight}</span>
            </div>
            <div class="barcode">
              <img src="${canvas.toDataURL()}" alt="Barcode"/>
            </div>
            <div class="description">
              Thank you for choosing us. Please ensure to load the mentioned produt in the token.
              Please maintain below 20KM speed with in crusher limit 
              Do not rash drive. For any assistance please contact sales office
            </div>
          </div>
        </body>
      </html>
    `;
  
    // Open the print window and write the receipt content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  
    // Wait until the content is loaded before printing
    printWindow.onload = function () {
      printWindow.print();
    };
  
    // Cleanup the canvas element
    canvas.remove();
  };
  


  

  const handleEdit = (record) => {
    setTokenNo(record.tokenNo);
    setAction('update');
    setIsForm('firstWeight');
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (data) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Weighing ?',
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

          // const imagePath = await getScreenShot(tokenNo);
    
          let res;
          if (action === 'update') {
            res = await updateWeighingDetails({ ...data, tokenNo, user });
          } else {
            if (isForm === 'firstWeight') {
              res = await createWeighing({ ...data, user });
            } else {
              res = await updateSecondWeight({ ...data, user });
            }

          }
          if (res.data.status === true) {
            let tokenNo=res.data.tokenNo
            message.success('Weighing saved successfully!');
            setIsModalVisible(false);
            setLoading(false);
            // handlePrint({...data,tokenNo,user})
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
          <Button type="primary" onClick={() => showModal('firstWeight')}>First Weight</Button>
          <Button type="primary" onClick={() => showModal('secondweight')}>Second Weight</Button>
        </Flex>
        <WeighingTable WeighingList={allWeighingList} handlePrint={handlePrint} handleEdit={handleEdit} handleDelete={(data) => handleDelete(data)} title='Weighment List' />
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
          {isForm === "firstWeight" ? 
            (
              <WeighingForm 
                form={form} 
                action={action} 
                // allVehicleList={allVehicleList} 
                // allProductList={allProductList} 
                allCustomerList={allCustomerList}
              />
            ) :
            (
              <SecondWeightForm 
                form={form} action={action} 
                allVehicleList={allVehicleList} 
                secondWeightList={secondWeightList} 
              />
            )
          }
        </Modal>
      )}
    </>
  );
};

export default Weighing;
