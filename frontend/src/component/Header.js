import React, { useState } from "react";
import olx from "../assets/olx.png";
import { Link, NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  return (
    <header className="fixed shadow-md w-full h-20 px-4 md:px-3 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="overflow-hidden">
            <img src={olx} alt="" className="object-cover" />
          </div>
        </Link>

        <div className="flex items-center gap-7">
          <nav className="flex gap-4 text-lg">
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive
                  ? "underline text-blue-700"
                  : "text-blue-700 hover:text-blue-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"about"}
              className={({ isActive }) =>
                isActive
                  ? "underline text-blue-700"
                  : "text-blue-700 hover:text-blue-500"
              }
            >
              About
            </NavLink>
            {userData.name && (
              <NavLink
                to="purchased-products"
                className={({ isActive }) =>
                  isActive
                    ? "underline text-blue-700"
                    : "text-blue-700 hover:text-blue-500"
                }
              >
                Product-Purchased
              </NavLink>
            )}
            {userData.name && (
              <NavLink
                to="user-products"
                className={({ isActive }) =>
                  isActive
                    ? "underline text-blue-700"
                    : "text-blue-700 hover:text-blue-500"
                }
              >
                Your-Products
              </NavLink>
            )}
          </nav>
          <div className="text-2xl text-slate-700" onClick={handleShowMenu}>
            <div className="border-2 border-solid border-slate-700 p-0 cursor-pointer">
              <BiUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-1 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                {userData.name && (
                  <Link
                    to={"newProduct"}
                    className="whitespace-nowrap cursor-pointer text-sm"
                  >
                    New Product
                  </Link>
                )}
                {userData.name && (
                  <button
                    className="whitespace-nowrap cursor-pointer text-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
                {}
                {!userData.name && (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer text-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
