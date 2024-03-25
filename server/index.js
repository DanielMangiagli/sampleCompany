import express from "express";
import { devices, vulnerabilities } from "./db.js";

const app = express();
const port = 3000;

app.get("/devices", (req, res) => {
  res.json(
    devices.map(({ id, IPv4, hostname, OperatingSystem, Manufacturer }) => ({
      id,
      IPv4,
      hostname,
      OperatingSystem,
      Manufacturer,
    }))
  );
});

app.get("/devices/:id", (req, res) => {
  const device = devices.find((device) => device.id === Number(req.params.id));
  if (device) {
    const { id, IPv4, hostname, OperatingSystem, Manufacturer } = device;
    res.json({ id, IPv4, hostname, OperatingSystem, Manufacturer });
  } else {
    res.status(404).send("Device not found");
  }
});

app.get("/devices/:id/vulnerabilities", (req, res) => {
  const device = devices.find((device) => device.id === Number(req.params.id));
  if (device && device.vulnerabilities) {
    const deviceVulnerabilities = vulnerabilities.filter((vulnerability) =>
      device.vulnerabilities.includes(vulnerability.CVE)
    );
    res.json(
      deviceVulnerabilities.map(
        ({ CVE, Name, Severity, Description, ExploitPresent }) => ({
          CVE,
          Name,
          Severity,
          Description,
          ExploitPresent,
        })
      )
    );
  } else {
    res
      .status(404)
      .send("Device not found or no vulnerabilities found for device");
  }
});

app.get("/vulnerabilities", (req, res) => {
  res.json(
    vulnerabilities.map(
      ({ CVE, Name, Severity, Description, ExploitPresent }) => ({
        CVE,
        Name,
        Severity,
        Description,
        ExploitPresent,
      })
    )
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
