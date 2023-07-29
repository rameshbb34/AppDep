import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    // validateToken();
  }, []);

  let loginValidate = async () => {
    let fd = new FormData();
    fd.append("email", emailInputRef.current.value);
    fd.append("password", passwordInputRef.current.value);
    let reqOptions = {
      method: "POST",
      body: fd,
    };

    let JSONData = await fetch("/validateLogin", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    if (JSOData.isLoggedIn == false) {
      alert(JSOData.msg);
    } else {
      localStorage.setItem("token", JSOData.token);
      navigate("/home", { state: JSOData.details });
    }
  };

  let validateToken = async () => {
    if (localStorage.getItem("token")) {
      let fd = new FormData();
      fd.append("token", localStorage.getItem("token"));
      let reqOptions = {
        method: "POST",
        body: fd,
      };

      let JSONData = await fetch("/validateToken", reqOptions);
      let JSOData = await JSONData.json();
      console.log(JSOData);
      if (JSOData.isLoggedIn == false) {
        alert(JSOData.msg);
      } else {
        localStorage.setItem("token", JSOData.token);
        navigate("/home", { state: JSOData.details });
      }
    } else {
      console.log("no token found");
    }
  };

  return (
    <div className="App">
      <form>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              loginValidate();
            }}
          >
            Login
          </button>
        </div>
        <p>
          Does'nt have an account <Link to="/signupform">sign up</Link> here
        </p>
      </form>
    </div>
  );
}

export default Login;
