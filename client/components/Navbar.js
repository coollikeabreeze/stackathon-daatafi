import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import history from "../history";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="container bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 ... text-white flex">
    <div className="flex-col">
      <h1 className="flex-auto text-6xl pt-3 mx-3 mt-3">DaataFi</h1>
      <p className="mx-5 pb-3">A little data about the Global Top 10 Songs on Spotify this week.</p>
    </div>
    <nav>
      <div className="flex">
        <Link to="/home" className="m-3 hover:text-lg hover:text-gray-400">
          Home
        </Link>
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
