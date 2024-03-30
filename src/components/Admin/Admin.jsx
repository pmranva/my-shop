import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectIsLoggedIn, selectRole } from "../../redux/Slices/authSlice";
import Login from "../../pages/Login";
import Loader from "../../Loader";

const Admin = () => {
  let role = useSelector(selectRole);
  let isLogged=useSelector(selectIsLoggedIn)
  let [isLoading, setIsLoding] = useState(false);
  return (
    <>
        
        <div className="row">
          <div class=" col-2 bg-light sticky-top">
            <div
              class="d-flex flex-sm-column flex-row flex-nowrap  align-items-center sticky-top"
              style={{ height: "500px" }}
            >
              <a
                href="/"
                class="d-block p-3 link-dark text-decoration-none text-center"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Icon-only"
              >
                Dashboard
                <br />
                <FaUserCircle size={40} />
              </a>
              <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                <li class="nav-item">
                  <Link
                    to="addproduct"
                    class="nav-link py-3 px-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    Add Product
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link py-3 px-2 Link-hover"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                    to="viewproducts"
                  >
                    View Products
                  </Link>
                </li>
                <li>
                  <Link
                    class="nav-link py-3 px-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                    to="viewusers"
                  >
                    View Users
                  </Link>
                </li>
                <li>
                  <Link
                    class="nav-link py-3 px-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                    to="orders"
                  >
                    View Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-9 p-5">
            <p></p>
            <Outlet />
          </div>
        </div>
       
    </>
  );
};

export default Admin;
