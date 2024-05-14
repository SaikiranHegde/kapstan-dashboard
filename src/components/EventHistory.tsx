import { AppColorCode, AppStatus, EventHistory } from "../types/application";
import { Table } from 'antd';
import type { TableProps } from 'antd';
import React from "react";
import '../App.css';

const EventHistoryComponent: React.FC<{ eventHistoryData: EventHistory[] }> = ({ eventHistoryData }) => {
  const columns: TableProps<EventHistory>['columns'] = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      render: (_, eventRecord) => (
        <div className="flex flex-col gap-y-1">
          <div className="text-sm text-[#595959]">{eventRecord.event}</div>
          <div className="text-xs text-[#A5A5A5]">{eventRecord.timestamp}</div>
        </div>
      ),
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, eventRecord) => {
        const eventStatusColor: string = AppColorCode[eventRecord.status as keyof typeof AppColorCode];
        return (<div
          className="w-max h-6 border border-solid flex gap-x-1 items-center px-1 rounded"
          style={{ borderColor: eventStatusColor }}
        >
          <div
            className="rounded-[50%] w-2 h-2"
            style={{ backgroundColor: eventStatusColor }}
          ></div>
          <div className="font-medium" style={{ color: eventStatusColor }}>
            {AppStatus[eventRecord.status as keyof typeof AppStatus]}
          </div>
        </div>);
      },
    }
  ];

  return (
    <section className="w-full h-full shadow-md bg-white p-5 flex flex-col rounded gap-y-2">
      <div className="text-base text-[#595959]">Event History</div>
      <Table scroll={{ y: 'calc(100% - 4.25rem)' }} pagination={false} columns={columns} dataSource={eventHistoryData} />
    </section>
  );
}

export default EventHistoryComponent;