import React, { useRef, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined,FilterTwoTone,DownloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Input, Popover, Space, Table, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import * as XLSX from 'xlsx';


const CustomerTable = ({ companyList, setIsModalVisible, handleEdit,title }) => {


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
      title: 'Id',
      dataIndex: 'id',
      key: 'namee',
      width: '20%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'CompanyId',
      dataIndex: 'companyId',
      key: 'CompanyId',
      width: '20%',
      ...getColumnSearchProps('companyId'),
    },
    {
      title: 'companyName',
      dataIndex: 'companyName',
      key: 'companyName',
      width: '30%',
      ...getColumnSearchProps('Name'),
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'Address',
      width: '20%',
      ...getColumnSearchProps('Address'),
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'Place',
      width: '20%',
      ...getColumnSearchProps('Place'),
    },
    {
      title: 'Pin',
      dataIndex: 'pin',
      key: 'Pin',
      ...getColumnSearchProps('Pin'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'PhoneNo',
      dataIndex: 'phone',
      key: 'PhoneNo',
      width: '20%',
      ...getColumnSearchProps('PhoneNo'),
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      key: 'GST',
      width: '30%',
      ...getColumnSearchProps('GST'),
    },
    {
      title: 'Pan',
      dataIndex: 'pan',
      key: 'Pan',
      width: '30%',
      ...getColumnSearchProps('Pan'),
    },
    {
      title: 'Password',
      dataIndex: 'address',
      key: 'Address',
      width: '20%',
      ...getColumnSearchProps('Address'),
    },
    {
      title: 'CreatedBy',
      dataIndex: 'createdBy',
      key: 'CreatedBy',
      width: '20%',
      ...getColumnSearchProps('CreatedBy'),
    },
    {
      title: 'CreatedOn',
      dataIndex: 'createdOn',
      key: 'CreatedOn',
      ...getColumnSearchProps('CreatedOn'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ModifiedBy',
      dataIndex: 'modifiedBy',
      key: 'ModifiedBy',
      width: '20%',
      ...getColumnSearchProps('ModifiedBy'),
    },
    {
      title: 'ModifiedOn',
      dataIndex: 'modifiedOn',
      key: 'ModifiedOn',
      width: '30%',
      ...getColumnSearchProps('ModifiedOn'),
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
      width: '30%',
      render: (text, record) => (

        <Flex gap='middle'>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined />
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
    const data = companyList.map(row => {
      const obj = {};
      columns.forEach(col => {
        obj[col.title] = row[col.dataIndex];
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Company List');
    XLSX.writeFile(workbook, 'company_list.xlsx');
  };

  return (
    <>
      <Flex justify='space-between'>
        <h3>{title}</h3>
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
        dataSource={companyList}
        bordered
        pagination={{
          showSizeChanger: true,  // Enable the page size changer
          pageSizeOptions: ['5', '10', '15', '100'],
        }}
        scroll={{
          x: 1300,
          // y: 300,
        }}
        size='small'

      />
    </>
  )
};
export default CustomerTable;