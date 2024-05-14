import React from "react";
import { AppColorCode, AppInfoProps, AppStatus } from "../types/application";
import { DesktopOutlined, ToolOutlined, WarningOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import ApplicationOverview from "./ApplicationOverview";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Overview',
    key: 'overview',
    icon: <DesktopOutlined />,
  },
  {
    label: 'Environment Variables',
    key: 'env',
    icon: <ToolOutlined />,
  },
  {
    label: 'Alerts',
    key: 'alerts',
    icon: <WarningOutlined />,
  },
  {
    label: 'Event history',
    key: 'event',
    icon: <ClockCircleOutlined />,
  }
];

const ApplicationBody: React.FC<AppInfoProps> = ({selectedApplication, cpuData, memoryData, eventHistoryData}) => {
  const selectedMenu = 'overview';
  const appStatusColor: string = AppColorCode[selectedApplication.status as keyof typeof AppColorCode];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key);
  };

  return (
    <section className="w-full h-full px-8 py-4 flex flex-col gap-y-4">
      <div className="w-full h-max flex justify-between">
        <div className="text-xl text-black font-bold">
          {selectedApplication.name}
        </div>
        <div
          className="w-max h-6 border border-solid flex gap-x-1 items-center px-1 rounded"
          style={{ borderColor: appStatusColor }}
        >
          <div
            className="rounded-[50%] w-2 h-2"
            style={{ backgroundColor: appStatusColor }}
          ></div>
          <div className="font-medium" style={{ color: appStatusColor }}>
            {AppStatus[selectedApplication.status as keyof typeof AppStatus]}
          </div>
        </div>
      </div>
      <div>
        <Menu
          className="bg-inherit"
          onClick={onClick}
          selectedKeys={[selectedMenu]}
          mode="horizontal"
          items={items}
        />
      </div>
      <ApplicationOverview selectedApplication={selectedApplication} cpuData={cpuData} memoryData={memoryData} eventHistoryData={eventHistoryData}/>
    </section>
  );
}

export default ApplicationBody;