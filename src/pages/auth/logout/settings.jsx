import { Button, Divider, Flex } from 'antd'
import React from 'react'
import { useLocalStorage } from 'react-use'

const Settings = ({ hide }) => {
  const [userData] = useLocalStorage('userData', {}); // 'userData' is the key in localStorage

  // Destructure the properties from userData
  const { username, role, userId } = userData || {};
 

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
          <p><strong>{username}</strong></p>
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