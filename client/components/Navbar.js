import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import history from "../history";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 ... text-white flex">
    <h1 className="flex-auto text-6xl py-5">DaataFi</h1><br></br>
    <nav>
      <div className="flex">
        <Link to="/home">Home</Link>
      </div>
    </nav>

    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
