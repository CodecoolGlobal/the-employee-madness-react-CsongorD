import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = ({ name, i }) => {
  return (
    <div className="Layout" id={i}>
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">{name}</Link>
          </li>
          <li>
            <Link to={"/create" + name}>
              <button type="button">Create {name}</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
