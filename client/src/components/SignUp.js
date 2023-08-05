import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  let fnInputRef = useRef();
  let lnInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let ageInputRef = useRef();
  let contactInputRef = useRef();
  let ppInputRef = useRef();
  let [profilePic, setProfilePic] = useState("./images/profilepic.jpg");

  let sendSignUptoServerFormData = async (req, res) => {
    // let dataTOSend = new FormData();
    // dataTOSend.append("fn", fnInputRef.current.value);
    // dataTOSend.append("ln", lnInputRef.current.value);
    // dataTOSend.append("email", emailInputRef.current.value);
    // dataTOSend.append("password", passwordInputRef.current.value);
    // dataTOSend.append("age", ageInputRef.current.value);
    // dataTOSend.append("contact", contactInputRef.current.value);
    // // dataTOSend.append("profilePic", ppInputRef.current.file);
    // for (let i = 0; i < ppInputRef.current.files.length; i++) {
    //   dataTOSend.append("profilePic", ppInputRef.current.files[i]);
    // }

    // let reqOptions = {
    //   method: "POST",
    //   body: dataTOSend,
    // };
    // let JSONData = await fetch("/signup", reqOptions);
    // let JSOData = await JSONData.json();
    // console.log(JSOData);
    alert("Profile Created");
  };

  return (
    <div className="App">
      <form>
        <h2>Sign Up</h2>
        <div>
          <label>First Name</label>
          <input ref={fnInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lnInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Contact No.</label>
          <input ref={contactInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            ref={ppInputRef}
            onChange={() => {
              let selectedFileURL = URL.createObjectURL(
                ppInputRef.current.files[0]
              );
              setProfilePic(selectedFileURL);
            }}
          ></input>
        </div>
        <div>
          <img src={profilePic} alt="" className="profile"></img>
        </div>
        <div>
          <div>
            <button
              type="button"
              onClick={() => {
                sendSignUptoServerFormData();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <p>
          Had an account <Link to="/">login</Link> here
        </p>
      </form>
    </div>
  );
}

export default SignUp;
