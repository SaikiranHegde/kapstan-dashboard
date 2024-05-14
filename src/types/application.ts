export enum AppStatus {
  deployed = "Deployed",
  uninstalled = "Uninstalled",
  in_progress = "In Progress",
  failed = "Failed",
  successful = "Successful",
}

export enum AppColorCode {
  deployed = "#00B88C",
  successful = "#00B88C",
  in_progress = "#F39C12",
  uninstalled = "#F39C12",
  failed = "#E91F04"
}

export interface Application {
  id: number;
  name: string;
  status: string;
  version: string;
  updatedAt: number;
  desiredVersion: string;
}

export interface EventHistory {
  id: number;
  event: string;
  status: string;
  version: string;
  timestamp: string;
  applicationId: number;
}

export interface EventHistoryGroup {
  [key: string]: EventHistory[];
}

export interface CpuUtilization {
  id: number;
  cpuUtilization: number;
  timestamp: string;
  applicationId: number;
}

export interface CpuUtilizationGroup {
  [key: string]: CpuUtilization[];
}

export interface MemoryUtilization {
  id: number;
  memoryUtilization: number;
  timestamp: string;
  applicationId: number;
}

export interface MemoryUtilizationGroup {
  [key: string]: MemoryUtilization[];
}

export interface AppHeaderProps {
  appData: Application[];
  selectedApp: Application;
  selectApplication?: Function;
}

export interface AppInfoProps {
  selectedApplication: Application;
  cpuData: CpuUtilization[];
  memoryData: MemoryUtilization[];
  eventHistoryData: EventHistory[];
}