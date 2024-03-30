import React, { useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaHome,
  FaPenNib,
  FaSearch,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/Config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRole,
  selectUserName,
  userLogin,
  userLogout,
} from "../redux/Slices/authSlice";
import { ShowOnLogin, ShowOnLogout } from "./HiddinLinks";
import { selectCart } from "../redux/Slices/cartSlice";
import { fliter_by_search } from "../redux/Slices/filterSlice";
import useFetchCollection from "../customhook/useFetchCollection";
import { selectProduct, store_products } from "../redux/Slices/productSlice";

const Header = () => {
  let [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const role = useSelector(selectRole);
  const cartItem = useSelector(selectCart);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let docref = doc(db, "users", user.uid);
        const snapshot = await getDoc(docref);
        let obj = {
          role: snapshot.data().role,
          email: snapshot.data().email,
          userName: snapshot.data().username,
          userId: uid,
        };

        dispatch(userLogin(obj));
      } else {
        dispatch(userLogout());
      }
    });
  }, [auth, dispatch]);
  const navigate = useNavigate();
  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Loggedout successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  let { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProduct);

  useEffect(() => {
    dispatch(store_products({ productlist: data }));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(fliter_by_search({ products, search }));
  }, [products, search]);

  let searchProduct = (e) => {
    e.preventDefault();
    dispatch(fliter_by_search({ products, search }));
  };
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src={require("../assests/logo.jpg")}
              alt=""
              class="img-fluid"
              width="40px"
              height="40px"
            />
          </a>
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" to="/" aria-current="page">
                  <FaHome /> Home <span class="visually-hidden">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/product">
                  <FaShoppingBag /> Product
                </Link>
              </li>
            </ul>
            <form class="d-flex my-2 my-lg-0" onSubmit={searchProduct}>
              <div className="input-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button class="btn btn-success" type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>

            <ul class="navbar-nav  mt-2 mt-lg-0">
              {role != "admin" && (
                <li class="nav-item">
                  <Link class="nav-link" to="/cart">
                    <FaShoppingCart size={30} />
                    <span
                      class="badge rounded-pill text-bg-danger"
                      style={{ position: "relative", top: "-10px" }}
                    >
                      {cartItem.length}
                    </span>
                  </Link>
                </li>
              )}
              <ShowOnLogout>
                <li class="nav-item">
                  <Link class="nav-link active" to="/register">
                    <FaPenNib /> Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">
                    <FaUser /> Login
                  </Link>
                </li>
              </ShowOnLogout>
              <ShowOnLogin>
                {role == "user" && (
                  <li class="nav-item">
                    <Link class="nav-link" to="/myorders">
                      My orders
                    </Link>
                  </li>
                )}
                <li class="nav-item">
                  <a class="nav-link">Welcome {userName} </a>
                </li>
                <li class="nav-item">
                  <button class="nav-link" onClick={handleLogout}>
                    <FaArrowAltCircleLeft /> Logout
                  </button>
                </li>
              </ShowOnLogin>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
