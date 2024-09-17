

import React from 'react'
import logo from '../assets/images/logo/WeighBridge.png'
import { Flex } from 'antd'
import SocialItems from '../components/social-shares'
const Home = () => {
  return (
    <Flex style={{fontFamily:'sans-serif'}} vertical>
       <Flex justify='space-around' align='center' >
         <div>
           <h1 style={{fontSize:'44px'}}>
             Welcome to Sazs Weigh-Bridge <br />
             Ultimate Dashboard.
           </h1>
           <p>We have been spending long hours in order to launch our new website. <br /> Join our mailing list or follow us on Facebook for the latest updates.</p>
         </div>
         <div>
           <img src={logo} alt="truck"  className='truck'/>
         </div>
       </Flex >
         <SocialItems/>
    </Flex>
  )
}

export default Home