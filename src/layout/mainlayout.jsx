
import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Tooltip, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminMenuItems,SubscriberMenuItems,UserMenuItems } from './menuitems';  // Import your MenuItems
import logo from '../assets/images/logo/sazsapplogo.png'


import { RiAccountPinCircleFill } from "react-icons/ri";
import MainHeader from './header';
import { useLocalStorage } from 'react-use';



const { Header, Content, Footer, Sider } = Layout;

const Mainlayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [userData] = useLocalStorage('userData'); // As for now this is a session cookie, need to discuss
  const userRole=userData?.role
  const MenuItems=userRole==='admin'? AdminMenuItems: userRole==='owner'? SubscriberMenuItems:UserMenuItems
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const menuClick = ({ key }) => {
    navigate(key);
  };

  const renderMenuItems = (items) =>
    items.map((item) => {
      if (item.dropdownItems) {
        return {
          key: item.name,
          icon: item.icon,
          label: item.name,
          children: item.dropdownItems.map((subItem) => ({
            key: subItem.href,
            icon: subItem.icon,
            label: subItem.name,
          })),
        };
      }
      return {
        key: item.href,
        icon: item.icon,
        label: item.name,
      };
    });

  const breadcrumbs = location.pathname.split('/').filter((i) => i);

  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
        <div className="logo" style={{
          // height: '32px',
          // margin: '16px',
          // background: 'rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={logo} alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%', padding: '20px 40px' }} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={renderMenuItems(MenuItems)}
          onClick={menuClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer}} >
          <MainHeader />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {breadcrumbs.length === 0 ? <strong>Home</strong> : breadcrumbs.map((crumb, index) => (
                <Breadcrumb.Item key={index}><strong>{crumb}</strong></Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          <div style={{
            padding: 24,
            margin: 20,
            // minHeight: '100vh',
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Weigh Bridge ©{new Date().getFullYear()} Created by Sazs Apps
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Mainlayout;

