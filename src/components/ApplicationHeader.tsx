import React, { useState } from "react";
import { AppHeaderProps, Application } from "../types/application";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { find, propEq } from 'ramda';

const ApplicationHeader: React.FC<AppHeaderProps> = ({
  appData,
  selectedApp,
  selectApplication,
}) => {
  const [selectedAppName, setSelectedAppName] = useState<string>(selectedApp.name);
  const items: MenuProps["items"] = appData.map((app: Application) => ({
    key: `${app.id}`,
    label: app.name,
  }));

  const onDropdownClick:  MenuProps['onClick'] = ({key}) => {
    const selectedData = find(propEq(+key, "id"), appData);
    setSelectedAppName(selectedData?.name!);
    selectApplication!(selectedData!);
  }

  return (
    <section className="w-full h-full px-8 flex justify-between items-center border border-solid border-b-[#BDBDBD]">
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: [`${selectedApp?.id!}`],
          onClick: onDropdownClick,
        }}
        trigger={["click"]}
      >
        <div className="flex flex-col">
          <div className="text-xs">
            Applications
          </div>
          <div className="cursor-pointer w-max text-base font-medium">
            <Space>
              <div>{selectedAppName}</div>
              <DownOutlined />
            </Space>
          </div>
        </div>
      </Dropdown>
    </section>
  );
};

export default ApplicationHeader;