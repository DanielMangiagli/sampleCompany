import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";

function App() {
  const location = useLocation();

  return (
    <>
      <header>
        <NavBar
          items={[
            { path: "/", label: "Home" },
            { path: "/devices", label: "Devices" },
            { path: "/vulnerabilities", label: "Vulnerabilities" },
          ]}
        />
      </header>
      <main>
        {location.pathname === "/" && <HomePage />}
        <Outlet />
      </main>
    </>
  );
}

export default App;
