import React, { useEffect, useState } from "react";
import ApplicationHeader from './ApplicationHeader';
import ApplicationBody from './ApplicationBody';
import { APPLICATION_LIST_URL, CPU_UTILIZATION_URL, EVENT_HISTORY_URL, MEMORY_UTILIZATION_URL } from "../utils/consts";
import { Application, CpuUtilizationGroup, EventHistoryGroup, MemoryUtilizationGroup } from "../types/application";
import { getApplicationInfoGroup, getApplications, getCpuUtilization, getEventHistory, getMemoryUtilization } from "../utils/application";
import { isNotNullOrEmpty } from "../utils/util";
import Loader from "./Loader";

const ApplicationHome: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const [loading, setLoading] = useState<boolean>(true);
  const [applicationData, setApplicationData] = useState<Application[]>();
  const [cpuUtilizationData, setCpuUtilization] = useState<CpuUtilizationGroup>();
  const [memoryUtilizationData, setMemoryUtilizationData] = useState<MemoryUtilizationGroup>();
  const [eventHistoryData, setEventHistoryData] = useState<EventHistoryGroup>();

  const fetchApplications = async () => {
    try {
      const response = await fetch(APPLICATION_LIST_URL);
      const data = await response.json();
      setApplicationData(getApplications(data));
      setSelectedApplication(data[0]);
    } catch (error) {
      // For error usecase
    }
  }

  const fetchApplicationInfos = async () => {
    const responseArr = await Promise.all([
      fetch(EVENT_HISTORY_URL),
      fetch(CPU_UTILIZATION_URL),
      fetch(MEMORY_UTILIZATION_URL)
    ]);
    const dataArr = await Promise.all(responseArr.map(res => res.json()));
    setEventHistoryData(getApplicationInfoGroup(getEventHistory(dataArr[0])) as EventHistoryGroup);
    setCpuUtilization(getApplicationInfoGroup(getCpuUtilization(dataArr[1])) as CpuUtilizationGroup);
    setMemoryUtilizationData(getApplicationInfoGroup(getMemoryUtilization(dataArr[2])) as MemoryUtilizationGroup);
  }

  useEffect(() => {
    fetchApplications();
    fetchApplicationInfos();
    setLoading(false);
  }, []);

  const onSelectApplication = (app: Application) => {
    setLoading(true);
    setSelectedApplication(app);
    setTimeout(() => setLoading(false), 500);
  }

  return (
    <section className='w-full h-full grid grid-rows-[5rem_1fr]'>
      {isNotNullOrEmpty(selectedApplication) && isNotNullOrEmpty(applicationData) && <ApplicationHeader appData={applicationData!} selectedApp={selectedApplication!} selectApplication={(app: Application) => onSelectApplication(app)} />}
      { !loading && isNotNullOrEmpty(selectedApplication) && isNotNullOrEmpty(eventHistoryData) && <ApplicationBody selectedApplication={selectedApplication!} cpuData={cpuUtilizationData![selectedApplication?.id!]} memoryData={memoryUtilizationData![selectedApplication?.id!]} eventHistoryData={eventHistoryData![selectedApplication?.id!]} />}
      { loading && <Loader /> }
    </section>
  );
}

export default ApplicationHome;