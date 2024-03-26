import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { Device } from "./models/devicesModel";
import {
  TransformedVulnerabilityType,
  Vulnerability,
  VulnerabilitySchema,
} from "./models/vulnerabilitiesModel";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useFetchDevices = (): QueryObserverResult<Device[], Error> => {
  return useQuery<Device[], Error>({
    queryKey: ["fetch-devices"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/devices");
      const data: Device[] = await res.json();
      return data;
    },
    staleTime: STALE_TIME,
  });
};

export const useFetchDeviceDetails = (
  id: number
): QueryObserverResult<Device, Error> => {
  return useQuery<Device, Error>({
    queryKey: ["fetch-device", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/devices/${id}`);
      const data: Device = await res.json();
      return data;
    },
    staleTime: STALE_TIME,
  });
};

export const useFetchDeviceVulnerabilities = (
  id: number
): QueryObserverResult<TransformedVulnerabilityType[], Error> => {
  return useQuery<TransformedVulnerabilityType[], Error>({
    queryKey: ["fetch-device-vulnerabilities", id],
    queryFn: async (): Promise<TransformedVulnerabilityType[]> => {
      const res = await fetch(
        `http://localhost:8000/devices/${id}/vulnerabilities`
      );
      const data: Vulnerability[] = await res.json();
      return data.map((item) => {
        const result = VulnerabilitySchema.safeParse(item);
        if (!result.success) {
          throw new Error("Data validation failed");
        }
        return {
          ...result.data,
          ExploitPresent: String(result.data.ExploitPresent),
        };
      });
    },
    staleTime: STALE_TIME,
  });
};
