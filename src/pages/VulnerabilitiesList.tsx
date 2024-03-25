import { useFetchVulnerabilities } from "../api/vulnerabilities";
import Table from "../components/Table";

const Vulnerabilities: React.FC = () => {
  const { data, isLoading, isError } = useFetchVulnerabilities();

  const columns = [
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching vulnerabilities</div>;
  }

  if (!data) {
    return <div>Vulnerabilities not found</div>;
  }

  const formattedData = data.map((item) => ({
    ...item,
    ExploitPresent: String(item.ExploitPresent),
  }));

  return <Table data={formattedData} columns={columns} rowKey="CVE" />;
};

export default Vulnerabilities;
