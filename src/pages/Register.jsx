import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/Config";
import { createUserWithEmailAndPassword  } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/Slices/authSlice";
import Loader from "../Loader";
const Register = () => {
  let initialState = {
    username: "",
    email: "",
    password: "",
    CPassword: "",
    role: "user",
  };
  let [user, setUser] = useState({ ...initialState });
  let [isLoading, setIsLoding] = useState(false);

  const navigate = useNavigate();
  
  let handleSubmit = (e) => {
    e.preventDefault();
    setIsLoding(true);
    createUserWithEmailAndPassword (auth, user.email,user.password)
      .then(async(userCredential) => {
        
       const user1 = userCredential.user;
       const docref= doc(db,"users",user1.uid)
       await setDoc(docref,{...user,createdAt:Timestamp. now().toDate()})
        setIsLoding(false)
        toast.success('registered successfully')
        navigate('/')
      })
      .catch((error) => {
        console.log("err", error)
        setIsLoding(false)
        toast.error(error.message)
      });
  };

  return (
    <div className="container mt-5 shadow p-2">
      {isLoading && <Loader/>}
      <h1>Register Page</h1>
      <hr /> 
      <div className="row">
        <div className="col-5">
          <img src={require("../assests/register.png")} className="img-fluid" />
        </div>
        <div className="col-7">
          <form action="" onSubmit={handleSubmit}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder=""
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <label for="formId1">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder=""
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <label for="formId1">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder=""
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <label for="formId1">Password</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                name="CPassword"
                placeholder=""
                value={user.CPassword}
                onChange={(e) =>
                  setUser({ ...user, CPassword: e.target.value })
                }
              />
              <label for="formId1"> Confirm Password</label>
            </div>
            <button type="submit" class="btn btn-primary">
              Register
            </button>
            <hr />
            <p>
              Already having account?? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
