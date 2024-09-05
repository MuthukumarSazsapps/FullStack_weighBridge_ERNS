import React, { useEffect, useState ,useRef } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, message } from 'antd';
import WeighingTable from './weighing-table';
import WeighingForm from './weighing-form';
import { getAllWeighingList,createWeighing,updateWeighingDetails,deleteWeighingDetails, getSecondWeightList, updateSecondWeight } from '../../app/api/weighing';
import { useLocalStorage } from 'react-use';
import { getAllVehicleList } from '../../app/api/vehicle';
import SecondWeightForm from './secondWeight-form';
import JsBarcode from 'jsbarcode';
import dayjs from 'dayjs';


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
  // const canvasRef = useRef(null);



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

  
  const handlePrint = (record) => {
    console.log("record", record);
  
    // Create a temporary canvas element for generating the barcode
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, record.tokenNo, {
      format: "CODE128",
      displayValue: true,
    });
  
    // Get the current date and time
    const currentDate = dayjs().format('DD-MM-YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
  
    // Prepare the HTML content for the receipt
    const receiptHTML = `
      <html>
        <head>
          <title>WeighMent Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .receipt-container {
              width: 300px;
              padding: 10px;
              border: 1px solid #000;
              text-align: center;
              position: relative;
            }
            h2 {
              margin-bottom: 20px;
            }
            .info-row {
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
            }
            .info-row strong {
              text-align: left;
            }
            /* Top-left for Date */
            .date {
              position: absolute;
              top: 10px;
              left: 10px;
              font-size: 12px;
            }
            /* Top-right for Time */
            .time {
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 12px;
            }
            /* Bottom section */
            .description {
              margin-top: 20px;
              border-top: 1px solid #000;
              padding-top: 10px;
              text-align: left;
              font-size: 12px;
            }
            /* barcode section */
            .barcode{
              height:100px;
            } 
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="date">${currentDate}</div>
            <div class="time">${currentTime}</div>
            <h2>WeighMent Receipt</h2>
            <div class="info-row">
              <strong>Token No:</strong> <span>${record.tokenNo}</span>
            </div>
             <div class="info-row">
              <strong>Vehicle No:</strong> <span>${record.VehicleNo}</span>
            </div>
            <div class="info-row">
              <strong>Amount:</strong> <span>${record.amount}</span>
            </div>
            <div class="info-row">
              <strong>First Weight:</strong> <span>${record.firstWeight}</span>
            </div>
             <div class="info-row">
              <strong>First Weight:</strong> <span>${record.secondWeight}</span>
            </div>
            <div class="info-row">
              <strong>Net Weight:</strong> <span>${record.netWeight}</span>
            </div>
            <br />
            <img class="barcode" src="${canvas.toDataURL()}" alt="Barcode"/>
            <div class="description">
              This is a description or notes area that can include terms and conditions, additional information about the receipt, or any other relevant text.
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
  
  
  // const handlePrint = (record) => {
  //   console.log("record", record);
  
  //   // Create a temporary canvas element for generating the barcode
  //   const canvas = document.createElement('canvas');
  //   JsBarcode(canvas, record.tokenNo, {
  //     format: "CODE128",
  //     displayValue: true,
  //     width: 2, // Adjust barcode width for thermal printer
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
  //             width: 58mm; /* For 58mm thermal paper, or use 80mm for wider printers */
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
        <WeighingTable WeighingList={allWeighingList} handlePrint={handlePrint} handleEdit={handleEdit}  handleDelete={(data) => handleDelete(data)} title='Weighment List' />
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
