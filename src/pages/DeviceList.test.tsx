import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { vi } from "vitest";
import DevicesList from "./DevicesList";

const mockUseFetchDeviceDetails = vi.fn();

vi.mock("../api/devices", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("../api/devices")>()),
    useFetchDevices: () => mockUseFetchDeviceDetails(),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("react-router-dom")>()),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("DevicesList", () => {
  it("should render loading message", () => {
    mockUseFetchDeviceDetails.mockReturnValue({
      isLoading: true,
    });

    render(<DevicesList />, { wrapper });

    expect(screen.getByText("Loading...")).toBeVisible();
  });

  it("should render error message", () => {
    mockUseFetchDeviceDetails.mockReturnValue({
      isError: true,
    });

    render(<DevicesList />, { wrapper });

    expect(screen.getByText("Error fetching")).toBeVisible();
  });

  it("should render no items message", () => {
    mockUseFetchDeviceDetails.mockReturnValue({
      data: [],
    });

    render(<DevicesList />, { wrapper });

    expect(screen.getByText("No items found")).toBeVisible();
  });

  it("should render table", () => {
    mockUseFetchDeviceDetails.mockReturnValue({
      data: [
        {
          id: 1,
          IPv4: "192.168.1.2",
          hostname: "hostname",
          OperatingSystem: "OS",
          Manufacturer: "manufacturer",
        },
      ],
      isLoading: false,
      isError: false,
    });

    render(<DevicesList />, { wrapper });

    expect(screen.getByText("ID")).toBeVisible();
    expect(screen.getByText("IPv4")).toBeVisible();
    expect(screen.getByText("Hostname")).toBeVisible();
    expect(screen.getByText("Operating System")).toBeVisible();
    expect(screen.getByText("Manufacturer")).toBeVisible();
    expect(screen.getByText("192.168.1.2")).toBeVisible();
    expect(screen.getByText("hostname")).toBeVisible();
  });
});
