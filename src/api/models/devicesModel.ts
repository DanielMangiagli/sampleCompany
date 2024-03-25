import { z } from "zod";

export const DeviceSchema = z.object({
  id: z.number(),
  IPv4: z.string().ip(),
  hostname: z.string(),
  MAC: z.string(),
  OperatingSystem: z.string(),
  Manufacturer: z.string(),
  model: z.string(),
  OpenPorts: z.array(z.string()),
});

export type Device = z.infer<typeof DeviceSchema>;
