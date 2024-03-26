import { useParams } from "react-router-dom";
import {
  useFetchDeviceDetails,
  useFetchDeviceVulnerabilities,
} from "../api/devices";
import { NoItemsMsg } from "../components/States/States";
import Table from "../components/Table/Table";

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

  if (!device) {
    return <NoItemsMsg />;
  }

  const deviceProperties = [
    { label: "ID", value: device.id },
    { label: "IPv4", value: device.IPv4 },
    { label: "Hostname", value: device.hostname },
    { label: "MAC", value: device.MAC },
    { label: "Operating System", value: device.OperatingSystem },
    { label: "Manufacturer", value: device.Manufacturer },
    { label: "Model", value: device.model },
    { label: "Open Ports", value: device.OpenPorts.join(", ") },
  ];

  return (
    <>
      {isLoadingDevice && (
        <div className="text-lg text-blue-500">Loading device...</div>
      )}
      {isLoadingVulnerabilities && (
        <div className="text-lg text-blue-500">Loading vulnerabilities...</div>
      )}

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Device Details</h2>
        <div className="flex flex-wrap">
          {deviceProperties.map((property) => (
            <div key={property.value} className="w-1/2">
              <strong>{property.label}:</strong> {property.value}
            </div>
          ))}
        </div>
      </section>

      {vulnerabilities && (
        <section className="p-4 bg-white rounded shadow mt-4">
          <h2 className="text-xl font-bold mb-4">Vulnerabilities</h2>
          <Table
            data={
              Array.isArray(vulnerabilities)
                ? vulnerabilities
                : [vulnerabilities]
            }
            columns={columnsVulnerabilities}
            rowKey="CVE"
          />
        </section>
      )}
    </>
  );
}

export default DeviceDetails;
