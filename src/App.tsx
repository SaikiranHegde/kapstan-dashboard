import React, { useEffect, useState } from 'react';
import './App.css';
import { AppstoreOutlined, LinkOutlined, DollarOutlined, SecurityScanOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const sideMenuItems: MenuItem[] = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: <Link to="/applications" className='text-decoration-none color-inherit'>Applications</Link>
  },
  {
    key: '2',
    icon: <LinkOutlined />,
    label: 'Connections',
  },
  {
    key: '3',
    icon: <DollarOutlined />,
    label: 'Cost',
  },
  {
    key: '4',
    icon: <SecurityScanOutlined />,
    label: 'Security',
  }
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/applications");
  }, []);

  return (
    <Layout className='h-[100vh]'>
      <Sider className='!bg-[#37146B]' collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className='flex items-center justify-center h-16'>
          {!collapsed && <img src="https://assets-global.website-files.com/63304b2ff06e34d93fb8f9da/65e6cc504b1b88e8b4f7c2e4_Kapstan.svg" alt="Kapstan"/>}
          {collapsed && <img className='h-8 w-8' src="https://assets-global.website-files.com/657053c91099d1b431c94c71/657071f8eedd87f098b39b50_Vectors-Wrapper.svg" alt="Kapstan"/>}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={sideMenuItems}/>
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
}

export default App;
