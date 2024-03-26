import { z } from "zod";

export const VulnerabilitySchema = z.object({
  CVE: z.string(),
  Name: z.string(),
  Severity: z.string(),
  Description: z.string(),
  Solution: z.string(),
  CVSSVector: z.string(),
  AffectedSoftware: z.array(z.string()),
  ExploitPresent: z.boolean(),
});

export type Vulnerability = z.infer<typeof VulnerabilitySchema>;

export const TransformedVulnerability = z.object({
  CVE: z.string(),
  Name: z.string(),
  Severity: z.string(),
  Description: z.string(),
  Solution: z.string(),
  CVSSVector: z.string(),
  AffectedSoftware: z.array(z.string()),
  ExploitPresent: z.string(),
});

export type TransformedVulnerabilityType = z.infer<
  typeof TransformedVulnerability
>;
