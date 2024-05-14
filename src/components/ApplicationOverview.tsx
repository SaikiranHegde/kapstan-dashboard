import { AppInfoProps } from "../types/application";
import { Button } from 'antd';
import moment from"moment";
import EventHistoryComponent from "./EventHistory";
import CpuMemoryUtil from "./CpuMemoryUtil";

const ApplicationOverview: React.FC<AppInfoProps> = ({selectedApplication, cpuData, memoryData, eventHistoryData}) => {
  return (
    <section className="w-full h-[calc(100%-10rem)] flex flex-col gap-y-4">
      <div className="w-full h-max shadow-md bg-white p-4 flex flex-col gap-y-4 rounded">
        <div className="font-bold text-[#595959] text-base">Service info</div>
        <div className="flex gap-x-8">
          <div className="flex flex-col gap-y-2">
            <div className="text-xs text-[#595959]">Current version</div>
            <div className="text-base text-[#333333]">
              {selectedApplication.version ===
              selectedApplication.desiredVersion
                ? "In sync"
                : "Out of sync"}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-xs text-[#595959]">Desired version</div>
            <div className="text-base text-[#333333]">{selectedApplication.desiredVersion}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button className="bg-[#6E27D5] text-white">Deploy</Button>
          <div>{moment.unix(selectedApplication.updatedAt).fromNow()}</div>
        </div>
      </div>
      <div className="flex gap-x-4">
        {/* System Metrics & Event History */}
        <div className="h-[31.25rem] w-[50%]">
          <CpuMemoryUtil appName={selectedApplication.name} cpuData={cpuData} memoryData={memoryData}/>
        </div>
        <div className="h-[31.25rem] w-[50%]">
          <EventHistoryComponent eventHistoryData={eventHistoryData} />
        </div>
      </div>
    </section>
  );
}

export default ApplicationOverview;