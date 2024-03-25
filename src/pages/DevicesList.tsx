import { useNavigate } from "react-router-dom";
import { useFetchDevices } from "../api/devices.tsx";
import Table from "../components/Table.tsx";

function DevicesList() {
  const { data, isLoading, isError } = useFetchDevices();
  const navigate = useNavigate();

  const handleRowClick = (id: string | number) => {
    navigate(`/devices/${id}`);
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "IPv4", header: "IPv4" },
    { key: "hostname", header: "Hostname" },
    { key: "OperatingSystem", header: "Operating System" },
    { key: "Manufacturer", header: "Manufacturer" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Device not found</div>;
  }

  if (isError) {
    return <div>Error fetching devices</div>;
  }

  return (
    <Table
      data={data}
      columns={columns}
      rowKey="id"
      onRowClick={handleRowClick}
    />
  );
}

export default DevicesList;
