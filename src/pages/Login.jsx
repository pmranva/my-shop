import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/Config";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { SAVE_URL, selectURL } from "../redux/Slices/cartSlice";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setIsLoding] = useState(false);
  let navigate = useNavigate();

  let URL=useSelector(selectURL)
  let redirectUser=()=>{
    if(URL.includes('cart')){
       navigate('/cart')
    }else{
      navigate('/')
    }
  }

  let handleLogin = (e) => {
    e.preventDefault();
    setIsLoding(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        let docref = doc(db, "users", user.uid);
        const snapshot = await getDoc(docref);
        const role = snapshot.data().role;
        if (role == "admin") {
          setIsLoding(false);
          toast.success("login sucessfully");
          navigate("/admin");
        } else {
          setIsLoding(false);
          toast.success("login sucessfully");
          redirectUser()
        }
      })
      .catch((error) => {
        setIsLoding(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();
  let googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const docref = doc(db, "users", user.uid);
        await setDoc(docref, {
          email: user.email,
          role: "user",
          name: user.displayName,
          createdAt: Timestamp.now().toDate(),
        });

        toast.success("login sucessfully");
        redirectUser()
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="container mt-5 shadow p-3">
      {isLoading && <Loader />}
      <h1>Login Page</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <img src={require("../assests/login.png")} className="img-fluid" />
        </div>
        <div className="col-6 mt-5 ">
          <form action="" onSubmit={handleLogin}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="email"
                id="formId1"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="formId1">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="password"
                id="formId1"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="formId1">Password</label>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" name="" id="" class="btn btn-primary">
                Login
              </button>
            </div>{" "}
            <hr />
            <div class="d-grid gap-2">
              <button
                type="button"
                name=""
                id=""
                class="btn btn-danger"
                onClick={googleLogin}
              >
                Login with google
              </button>
            </div>{" "}
            <hr />
            <p>
              Create account?? <Link to={"/register"}>SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
