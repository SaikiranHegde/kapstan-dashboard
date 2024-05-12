import { Application, CpuUtilization, EventHistory, MemoryUtilization } from "../types/application";
import { map, groupBy, prop } from 'ramda';

export const getApplications = (data: any[]): Application[] => {
  return map(({ id, name, status, version, updatedAt, desiredVersion }) => ({
    id,
    name,
    status,
    version,
    desiredVersion,
    updatedAt: +updatedAt
  }), data);
}

export const getEventHistory = (data: any[]): EventHistory[] => {
  return map(({ id, event, status, version, timestamp, applicationId }) => ({
    id,
    event,
    status,
    version,
    timestamp: +timestamp,
    applicationId: +applicationId
  }), data);
}

export const getCpuUtilization = (data: any[]): CpuUtilization[] => {
  return map(({ id, timestamp, cpuUtilization, applicationId }) => ({
    id,
    cpuUtilization: +cpuUtilization,
    timestamp: +timestamp,
    applicationId: +applicationId
  }), data);
}

export const getMemoryUtilization = (data: any[]): MemoryUtilization[] => {
  return map(({ id, timestamp, memoryUtilization, applicationId }) => ({
    id,
    memoryUtilization: +memoryUtilization,
    timestamp: +timestamp,
    applicationId: +applicationId
  }), data);
}

export const getApplicationInfoGroup = (data: any[]) => {
  return groupBy(prop("applicationId"), data);
}

