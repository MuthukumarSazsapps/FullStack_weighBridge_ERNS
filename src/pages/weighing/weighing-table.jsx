import React, { useRef, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined,FilterTwoTone,DownloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Input, Popover, Space, Table, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';


const WeighingTable = ({ WeighingList, handleEdit,title,handleDelete }) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
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
            close
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  
  
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) =>index+1, // Generate serial number based on index
    },
    {
      title: 'Token No',
      dataIndex: 'tokenNo',
      key: 'tokenNo',
      ...getColumnSearchProps('tokenNo'),
    },
    {
      title: 'Vehicle No',
      dataIndex: 'VehicleNo',
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
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
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
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => handleDelete(record)}/>
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
            <Button  onClick={exportToExcel}>
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
              <FilterTwoTone style={{fontSize:'20px'}}/>
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
    </>
  )
};
export default WeighingTable;