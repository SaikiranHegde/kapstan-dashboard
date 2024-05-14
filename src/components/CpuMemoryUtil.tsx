import React, { useState } from "react";
import { CpuUtilization, MemoryUtilization } from "../types/application";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { map } from "ramda";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'CPU',
    key: 'cpu',
  },
  {
    label: 'Memory',
    key: 'memory',
  }
];

const CpuMemoryUtil: React.FC<{
  appName: string,
  cpuData: CpuUtilization[],
  memoryData: MemoryUtilization[]
}> = ({ appName, cpuData, memoryData }) => {
  const [selectedMenu, setSelectedMenu] = useState('cpu');

  const chartCpuData = map((data: CpuUtilization) => ({
    ...data,
    appName
  }), cpuData);
  const chartMemoryData = map((data: MemoryUtilization) => ({
    ...data,
    appName
  }), memoryData);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedMenu(key);
  };

  return (
    <section className="w-full h-full shadow-md bg-white p-5 flex flex-col rounded gap-y-2">
      <div className="text-base text-[#595959]">System metrics</div>
      <Menu
          className="bg-inherit"
          onClick={onClick}
          selectedKeys={[selectedMenu]}
          mode="horizontal"
          items={items}
        />
      <div>
        <LineChart
          width={650}
          height={380}
          data={selectedMenu === 'cpu' ? chartCpuData : chartMemoryData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={selectedMenu === 'cpu' ? 'cpuUtilization' : 'memoryUtilization'}
            stroke="#6E27D5"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </section>
  );
}

export default CpuMemoryUtil;