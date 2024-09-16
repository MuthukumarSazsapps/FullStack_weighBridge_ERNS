import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {


  
  return (
    <div>
      <Result
        status="404"
        title="Page Not Found"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to={'/'}> <Button type="primary">Back Home</Button></Link>}
      />
    </div>
  )
}

export default NotFoundPage