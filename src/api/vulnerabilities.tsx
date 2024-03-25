import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { Vulnerability } from "./models/vulnerabilities";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useFetchVulnerabilities = (): QueryObserverResult<
  Vulnerability[],
  Error
> => {
  return useQuery<Vulnerability[], Error>({
    queryKey: ["fetch-vulnerabilities"],
    queryFn: async () => {
      const res = await fetch("/api/vulnerabilities");
      const data: Vulnerability[] = await res.json();
      return data;
    },
    staleTime: STALE_TIME,
  });
};
