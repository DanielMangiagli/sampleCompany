import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { Device } from "./models/devices";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useFetchDevices = (): QueryObserverResult<Device[], Error> => {
  return useQuery<Device[], Error>({
    queryKey: ["fetch-devices"],
    queryFn: async () => {
      const res = await fetch("/api/devices");
      const data: Device[] = await res.json();
      return data;
    },
    staleTime: STALE_TIME,
  });
};

export const useFetchDevice = (
  id: number
): QueryObserverResult<Device, Error> => {
  return useQuery<Device, Error>({
    queryKey: ["fetch-device", id],
    queryFn: async () => {
      const res = await fetch(`/api/devices/${id}`);
      const data: Device = await res.json();
      return data;
    },
    staleTime: STALE_TIME,
  });
};

export const useFetchDeviceVulnerabilities = (
  id: number
): QueryObserverResult<Device, Error> => {
  return useQuery<Device, Error>({
    queryKey: ["fetch-device-vulnerabilities", id],
    queryFn: async () => {
      const res = await fetch(`/api/devices/${id}/vulnerabilities`);
      const data: Device = await res.json();
      return data;
    },
    staleTime: STALE_TIME,
  });
};
