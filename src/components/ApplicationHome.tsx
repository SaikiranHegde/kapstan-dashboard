import React, { useEffect, useState } from "react";
import ApplicationHeader from './ApplicationHeader';
import ApplicationBody from './ApplicationBody';
import { APPLICATION_LIST_URL, CPU_UTILIZATION_URL, EVENT_HISTORY_URL, MEMORY_UTILIZATION_URL } from "../utils/consts";
import { Application, CpuUtilizationGroup, EventHistoryGroup, MemoryUtilizationGroup } from "../types/application";
import { getApplicationInfoGroup, getApplications } from "../utils/application";
import { isNotNullOrEmpty } from "../utils/util";
import Loader from "./Loader";

const ApplicationHome: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<number>();
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
      setSelectedApplication(data[0].id);
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
    setEventHistoryData(getApplicationInfoGroup(dataArr[0]) as EventHistoryGroup);
    setCpuUtilization(getApplicationInfoGroup(dataArr[1]) as CpuUtilizationGroup);
    setMemoryUtilizationData(getApplicationInfoGroup(dataArr[2]) as MemoryUtilizationGroup);
  }

  useEffect(() => {
    fetchApplications();
    fetchApplicationInfos();
    setLoading(false);
  }, []);

  const onSelectApplication = (appId: number) => {
    setLoading(true);
    setSelectedApplication(appId);
  }

  return (
    <section className='w-full h-full grid grid-rows-[5rem_1fr]'>
      {isNotNullOrEmpty(selectedApplication) && isNotNullOrEmpty(applicationData) && <ApplicationHeader appData={applicationData!} selectApplication={(appId: number) => onSelectApplication(appId)} />}
      { !loading && isNotNullOrEmpty(selectedApplication) && <ApplicationBody cpuData={cpuUtilizationData![selectedApplication!]} memoryData={memoryUtilizationData![selectedApplication!]} eventHistoryData={eventHistoryData![selectedApplication!]} />}
      { loading && <Loader /> }
    </section>
  );
}

export default ApplicationHome;