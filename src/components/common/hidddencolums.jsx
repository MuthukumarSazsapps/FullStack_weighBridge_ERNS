import React, { useState } from 'react'
import { Checkbox, Divider, Flex, Table } from 'antd';

const HidddenColums = ({columns}) => {
    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));
    const newColumns = columns.map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key),
    }));
  return (
    <>
        <Flex horizondal>
        {/* {columns} */}
        <Checkbox.Group
        value={checkedList}
        options={options}
        onChange={(value) => {
          setCheckedList(value);
        }}
      />
      </Flex>
    </>
  )
}

export default HidddenColums