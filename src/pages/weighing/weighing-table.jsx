import React, { useRef, useState } from 'react';
import { SearchOutlined, EditTwoTone, DeleteTwoTone, FilterTwoTone, DownloadOutlined, PrinterTwoTone } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Flex, Input, Popover, Space, Table, Tooltip, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';


dayjs.extend(isBetween);

const WeighingTable = ({ WeighingList, handleEdit, title, handleDelete, handlePrint }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { RangePicker } = DatePicker;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log("selectedKeys", selectedKeys[0].length, selectedKeys);

    confirm();
    setSearchText(selectedKeys[0] + selectedKeys[1] ? selectedKeys[1] : '');
    // setSearchText(selectedKeys[0]);

    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <RangePicker
            onChange={(dates) => {
              console.log("dates", dates);

              if (dates) {
                const formattedRange = [
                  dayjs(dates[0]).startOf('day').format('MM/DD/YYYY'),
                  dayjs(dates[1]).endOf('day').format('MM/DD/YYYY'),
                ];
                setSelectedKeys([formattedRange]);
              } else {
                setSelectedKeys([]);
              }
            }}
            allowClear
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      if (Array.isArray(value)) {
        const recordDate = dayjs(record[dataIndex]).format('MM/DD/YYYY');
        return dayjs(recordDate).isBetween(value[0], value[1], null, '[]');
      }
      return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },


    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? String(text) : ''} // Ensure text is a string
        />
      ) : (
        text
      ),




  });


  // const handleImageClick = (imagePath) => {
  //     console.log("imagePath",imagePath);
  //     let  imageName=imagePath.split(',')
  //     console.log("imageNamearr",imageName);
  //     if(imageName.length===2){

  //       setSelectedImage1(imageName[0]?.split('\\').pop())
  //       setSelectedImage2(imageName[1]?.split('\\').pop())
  //       setIsModalVisible(true);

  //     }else{
  //       setSelectedImage1(imageName[0].split('\\').pop())
  //       setSelectedImage2(null)
  //       setIsModalVisible(true);
  //     }
  // };


  const getImagePath = async (imageName) => {
    if (window.electron) {
      return await window.electron.getImagePath(imageName);
    }
    return '';
  };

  // Example usage in your component
  const handleImageClick = async (imagePath) => {
    console.log("imagePath", imagePath);
    let imageName = imagePath.split(',');
    console.log("imageNamearr", imageName);
    if (imageName.length === 2) {
      setSelectedImage1(await getImagePath(imageName[0]?.split('\\').pop()));
      setSelectedImage2(await getImagePath(imageName[1]?.split('\\').pop()));
      setIsModalVisible(true);
    } else {
      setSelectedImage1(await getImagePath(imageName[0].split('\\').pop()));
      setSelectedImage2(null);
      setIsModalVisible(true);
    }
  };

  console.log("selectedImage1",selectedImage1);
  
  // Handle modal close
  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedImage1(null)
    setSelectedImage2(null)

  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) => index + 1, // Generate serial number based on index
    },
    {
      title: 'Token No',
      dataIndex: 'tokenNo',
      key: 'tokenNo',
      ...getColumnSearchProps('tokenNo'),
    },
    {
      title: 'Vehicle No',
      dataIndex: 'vehicleNo',
      key: 'vehicleNo',
      ...getColumnSearchProps('VehicleNo'),
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleNo',
      ...getColumnSearchProps('vehicleType'),
    },
    {
      title: 'returnType',
      dataIndex: 'returnType',
      key: 'returnType',
      ...getColumnSearchProps('returnType'),
    },
    {
      title: 'customerName',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps('customerName'),
    },
    {
      title: 'driverName',
      dataIndex: 'driverName',
      key: 'driverName',
      ...getColumnSearchProps('driverName'),
    },
    {
      title: 'materialName',
      dataIndex: 'materialName',
      key: 'materialName',
      ...getColumnSearchProps('materialName'),
    },
    {
      title: 'mobileNumber',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      ...getColumnSearchProps('mobileNumber'),
    },
    {
      title: 'Load Type',
      dataIndex: 'loadType',
      key: 'loadType',
      ...getColumnSearchProps('loadType'),
    },
    {
      title: 'billType',
      dataIndex: 'billType',
      key: 'billType',
      ...getColumnSearchProps('billType'),
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      key: 'amount',
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'firstWeight',
      dataIndex: 'firstWeight',
      key: 'firstWeight',
      ...getColumnSearchProps('firstWeight'),
    },
    {
      title: 'Second Weight',
      dataIndex: 'secondWeight',
      key: 'secondWeight',
      ...getColumnSearchProps('secondWeight'),
    },
    {
      title: 'Net Weight',
      dataIndex: 'netWeight',
      key: 'netWeight',
      ...getColumnSearchProps('netWeight'),
    },
    {
      title: 'Captured Image',
      dataIndex: 'imagePath',
      key: 'imagePath',
      render: (text, record) => (
        record.imagePath ? (<Button type="link" onClick={() => handleImageClick(record.imagePath)}>
          View Image
        </Button>) : 'No Images'
      ),
    },
    {
      title: 'CreatedBy',
      dataIndex: 'createdBy',
      key: 'CreatedBy',
      ...getColumnSearchProps('createdBy'),
    },
    {
      title: 'CreatedOn',
      dataIndex: 'createdOn',
      key: 'CreatedOn',
      ...getColumnSearchProps('createdOn'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ModifiedBy',
      dataIndex: 'modifiedBy',
      key: 'ModifiedBy',
      ...getColumnSearchProps('modifiedBy'),
    },
    {
      title: 'ModifiedOn',
      dataIndex: 'modifiedOn',
      key: 'ModifiedOn',
      ...getColumnSearchProps('modifiedOn'),
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
      render: (text, record) => (
        <Flex gap='middle'>
          <PrinterTwoTone twoToneColor="green" onClick={() => handlePrint(record)} />
          <EditTwoTone twoToneColor="#eb2f96" onClick={() => handleEdit(record)} />
          <DeleteTwoTone twoToneColor='red' onClick={() => handleDelete(record)} />
        </Flex>
      ),
    },
  ];

  const [hiddenColumns, setHiddenColumns] = useState([]);

  const handleToggleColumn = (columnKey) => {
    setHiddenColumns(prevState => {
      if (prevState.includes(columnKey)) {
        return prevState.filter(key => key !== columnKey);
      } else {
        return [...prevState, columnKey];
      }
    });
  };

  const filteredColumns = columns.filter(column => !hiddenColumns.includes(column.key));

  const content = (
    <div>
      {columns.map(column => (
        <div key={column.key}>
          <Checkbox
            checked={!hiddenColumns.includes(column.key)}
            onChange={() => handleToggleColumn(column.key)}
          >
            {column.title}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const exportToExcel = () => {
    const data = WeighingList.map(row => {
      const obj = {};
      columns.forEach(col => {
        obj[col.title] = row[col.dataIndex];
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Weighing List');
    XLSX.writeFile(workbook, 'Weighing_list.xlsx');
  };

  // const exportToPDF = () => {
  //   const data = WeighingList.map(row => {
  //     const obj = {};
  //     columns.forEach(col => {
  //       obj[col.title] = row[col.dataIndex];
  //     });
  //     return obj;
  //   });

  //   const doc = new jsPDF();
  //   doc.autoTable({
  //     head: [columns.map(col => col.title)],
  //     body: data.map(row => columns.map(col => row[col.title])),
  //   });

  //   doc.save('Weighing_list.pdf');
  // };

  return (
    <>
      <Flex justify='space-between'>
        <h2 className='text-3xl font-bold' >{title}</h2>
        <Flex justify='flex-end' gap='middle'>
          <Tooltip title="Export">
            <Button onClick={exportToExcel}>
              <DownloadOutlined /> Export
            </Button>
          </Tooltip>

          <Popover
            content={content}
            title="Columns"
            trigger="click"
            placement="bottomRight"
          >
            <Tooltip title='hidden column'>
              <Button>
                <FilterTwoTone style={{ fontSize: '20px' }} />
              </Button>
            </Tooltip>
          </Popover>

        </Flex>
      </Flex>

      <Table
        columns={filteredColumns}
        dataSource={WeighingList}
        bordered
        pagination={{
          showSizeChanger: true,  // Enable the page size changer
          pageSizeOptions: ['5', '10', '15', '100'],
        }}
        // style={{overflowX:"scroll"}}
        scroll={{
          x: 1300,
          // y: 300,
        }}
        size='small'

      />

      {/* <Modal
        title="Captured Image"
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}  // No footer, just close the modal manually
      >
        {selectedImage1 ?
          (<img
            src={require(`../../assets/images/camImages/${selectedImage1}`)} // Adjust the path accordingly
            alt="Captured"
            style={{ width: '100%' }}
          />)
          : null}
        <br />
        {selectedImage2 ?
          (<img
            src={require(`../../assets/images/camImages/${selectedImage2}`)} // Adjust the path accordingly
            alt="Captured"
            style={{ width: '100%' }}
          />)
          : null}

      </Modal> */}
      <Modal
        title="Captured Image"
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}  // No footer, just close the modal manually
      >
        {selectedImage1 && (
          <img
            src={selectedImage1}  // Get the correct path for the first image
            alt="Captured"
            style={{ width: '100%' }}
          />
        )}
        <br />
        {selectedImage2 && (
          <img
            src={selectedImage2}  // Get the correct path for the second image
            alt="Captured"
            style={{ width: '100%' }}
          />
        )}
      </Modal>

    </>
  )
};
export default WeighingTable;



