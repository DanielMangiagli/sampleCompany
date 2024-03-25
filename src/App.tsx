import "./App.css";

import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/devices">Devices</Link>
      <Link to="/vulnerabilities">Vulnerabilities</Link>
      <Outlet />
    </>
  );
}

export default App;
