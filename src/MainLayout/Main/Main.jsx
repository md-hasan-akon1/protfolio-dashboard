import { IoMenu } from "react-icons/io5";
import Home from "../Home/Home";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center justify-center absolute">
        <Home></Home>
        <label
          htmlFor="my-drawer-2"
          className="btn  drawer-button lg:hidden relative"
        >
          <IoMenu />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
          <Link to="/">Create Blog</Link>
          </li>
          <li>
          <Link to="/update-bog">Update Blog</Link>
          </li>
          <li>
          <Link to="/all-blogs">All Blogs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
