import { useParams } from "react-router-dom";
import {
  useFetchDeviceDetails,
  useFetchDeviceVulnerabilities,
} from "../api/devices";
import Table from "../components/Table";

function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: device, isLoading: isLoadingDevice } = useFetchDeviceDetails(
    Number(id)
  );
  const { data: vulnerabilities, isLoading: isLoadingVulnerabilities } =
    useFetchDeviceVulnerabilities(Number(id));

  const columnsVulnerabilities = [
    { key: "CVE", header: "CVE" },
    { key: "Name", header: "Name" },
    { key: "Severity", header: "Severity" },
    { key: "Description", header: "Description" },
    { key: "Solution", header: "Solution" },
    { key: "CVSSVector", header: "CVSS Vector" },
    {
      key: "AffectedSoftware",
      header: "Affected Software",
      format: (value: string | number | string[]): string => {
        if (Array.isArray(value)) {
          return value.join(", ");
        }
        return String(value);
      },
    },
    { key: "ExploitPresent", header: "Exploit Present" },
  ];

  return (
    <>
      {isLoadingDevice && <div>Loading device...</div>}
      {isLoadingVulnerabilities && <div>Loading vulnerabilities...</div>}

      {device && (
        <div>
          <p>ID: {device.id}</p>
          <p>IPv4: {device.IPv4}</p>
          <p>Hostname: {device.hostname}</p>
          <p>MAC: {device.MAC}</p>
          <p>Operating System: {device.OperatingSystem}</p>
          <p>Manufacturer: {device.Manufacturer}</p>
          <p>Model: {device.model}</p>
          <p>Open Ports: {device.OpenPorts.join(", ")}</p>
        </div>
      )}

      {vulnerabilities && (
        <Table
          data={
            Array.isArray(vulnerabilities) ? vulnerabilities : [vulnerabilities]
          }
          columns={columnsVulnerabilities}
          rowKey="CVE"
        />
      )}
    </>
  );
}

export default DeviceDetails;
