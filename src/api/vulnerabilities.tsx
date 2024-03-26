import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import {
  TransformedVulnerabilityType,
  Vulnerability,
  VulnerabilitySchema,
} from "./models/vulnerabilitiesModel";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useFetchVulnerabilities = (): QueryObserverResult<
  TransformedVulnerabilityType[],
  Error
> => {
  return useQuery<TransformedVulnerabilityType[], Error>({
    queryKey: ["fetch-vulnerabilities"],
    queryFn: async (): Promise<TransformedVulnerabilityType[]> => {
      const res = await fetch("http://localhost:8000/vulnerabilities");
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
