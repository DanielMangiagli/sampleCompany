import { useNavigate } from "react-router-dom";
import { useFetchDevices } from "../api/devices.tsx";
import {
  ErrorMsg,
  LoadingMsg,
  NoItemsMsg,
} from "../components/States/States.tsx";
import Table from "../components/Table/Table.tsx";

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
    return <LoadingMsg />;
  }

  if (isError) {
    return <ErrorMsg />;
  }

  if (!data || data.length === 0) {
    return <NoItemsMsg />;
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
