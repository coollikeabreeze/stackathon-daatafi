import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import history from "../history";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="container min-w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 ... text-white flex justify-between">
    <div className="flex-col w-full">
      <h1 className="flex-auto text-6xl pt-3 mx-3 mt-3 font-title">DaataFi</h1>
      <p className="mx-5 pb-3">Visualizing your artists and songs.</p>
    </div>
    <nav>
      <div className="flex justify-self-end mx-2 mt-10 p-3 w-72">
        <div className="w-32 mt-4">
        Powered by the
        </div>
        <div className="w-32 m-1 p-2 bg-black rounded-md">
        <a href="https://developer.spotify.com/"><img className=" object-scale-down" src='/img/Spotify_Logo_CMYK_Green.png'/></a>
        </div>
        <div className="my-4">
        API
        </div>
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
