import { useFetchVulnerabilities } from "../api/vulnerabilities";
import { ErrorMsg, LoadingMsg, NoItemsMsg } from "../components/States/States";
import Table from "../components/Table/Table";

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
    return <LoadingMsg />;
  }

  if (isError) {
    return <ErrorMsg />;
  }

  if (!data || data.length === 0) {
    return <NoItemsMsg />;
  }

  return <Table data={data} columns={columns} rowKey="CVE" />;
};

export default Vulnerabilities;
