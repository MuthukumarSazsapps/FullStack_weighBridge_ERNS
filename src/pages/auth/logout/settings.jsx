import { Button, Divider, Flex } from 'antd'
import React from 'react'
import { useLocalStorage } from 'react-use'

const Settings = ({ hide }) => {
  const [user] = useLocalStorage('user')
  const [role] = useLocalStorage('role')
  const [userId] = useLocalStorage('userId')

  return (
    <>
      <div className='flex justify-between font-medium'>
        <div>
          <p>User Name </p>
          <p>Role </p>
          <p>UserId </p>
        </div>
        <div>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div>
          <p><strong>{user}</strong></p>
          <p><strong>{role}</strong></p>
          <p><strong>{userId}</strong></p>
        </div>
      </div>
      <Divider style={{ borderColor: '#7cb305', }} />
      <p className='text-center'><a onClick={hide} > <b>Log Out</b> </a></p>
    </>
  )
}

export default Settings