import { Button, Divider, Flex } from 'antd'
import React from 'react'
import { useLocalStorage } from 'react-use'

const Settings = ({ hide }) => {
  const [user] = useLocalStorage('user')
  return (
    <Flex align='center' vertical>
      <div style={{ width: '150px', height: '100px', margin: 10 }}>
        <strong>{user}</strong>
      </div>
      <Divider style={{
        borderColor: '#7cb305',
      }} />


      {/* <p >fsd</p> */}
      {/* <Button type='primary' size='large' onClick={hide}>Log Out</Button> */}
      <a onClick={hide}> <b>Log Out</b> </a>
    </Flex>
  )
}

export default Settings