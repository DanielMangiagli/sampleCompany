import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  path: string;
  label: string;
}

interface NavBarProps {
  items: NavItemProps[];
}
const NavItem: React.FC<NavItemProps> = ({ path, label }) => {
  const location = useLocation();
  const isActive =
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  return (
    <li className={isActive ? "border-b-4 border-blue-500" : ""}>
      <NavLink
        to={path}
        className={isActive ? "text-blue-700" : "text-gray-700"}
      >
        {label}
      </NavLink>
    </li>
  );
};
const NavBar: React.FC<NavBarProps> = ({ items }) => (
  <nav className="bg-zinc-200 p-4">
    <ul className="flex space-x-4">
      {items.map((item) => (
        <NavItem key={item.path} path={item.path} label={item.label} />
      ))}
    </ul>
  </nav>
);

export default NavBar;
