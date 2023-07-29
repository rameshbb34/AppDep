import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {
  let loc = useLocation();
  let navigate = useNavigate();
  console.log(loc);

  let deleteUser = async (req, res) => {
    let reqOptions = {
      method: "DELETE",
    };
    let url = `/deleteuser?id=${loc.state._id}`;

    let JSONData = await fetch(url, reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      navigate("/");
    }

    console.log(JSOData);
  };

  return (
    <div>
      <NavBar userDetails={loc.state} />
      <button
        type="button"
        onClick={() => {
          deleteUser();
        }}
      >
        Delete Account
      </button>
      <h1>Hello {loc.state.fn}</h1>
      <div>
        <img
          className="pic"
          alt=""
          src={`/${loc.state.profilePic}`}
        ></img>
      </div>
      <div>
        <ul>
          <h1>
            <li>your email id is {loc.state.email}</li>
          </h1>
          <h1>
            <li>your contact no is +91{loc.state.contact}</li>
          </h1>
          <h1>
            <li>your age is {loc.state.age}</li>
          </h1>
        </ul>
      </div>
    </div>
  );
}

export default Home;
