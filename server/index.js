import cors from "cors";
import express from "express";
import { deviceVulnerabilities, devices, vulnerabilities } from "./db.js";

const app = express();
app.use(cors());
const host = "localhost";
const port = 8000;

app.get("/devices", (_req, res) => {
  res.json(devices);
});

app.get("/devices/:id", (req, res) => {
  const device = devices.find((device) => device.id === Number(req.params.id));
  if (device) {
    res.json(device);
  } else {
    res.status(404).send("Device not found");
  }
});

app.get("/devices/:id/vulnerabilities", (req, res) => {
  const deviceVulnerability = deviceVulnerabilities.find(
    (deviceVulnerability) =>
      deviceVulnerability.deviceId === Number(req.params.id)
  );
  if (deviceVulnerability) {
    const deviceVulnerabilities = deviceVulnerability.vulnerabilities.map(
      (vulnerabilityId) =>
        vulnerabilities.find(
          (vulnerability) => vulnerability.CVE === vulnerabilityId
        )
    );
    res.json(deviceVulnerabilities);
  } else {
    res.status(404).send("Device not found");
  }
});

app.get("/vulnerabilities", (_req, res) => {
  res.json(vulnerabilities);
});

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
