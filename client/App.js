import React from "react";
import SpotifyData from "./components/SpotifyData";
import Login from "./components/SpotifyData/Login";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return code ? (
    <div className="justify-center h-screen relative">
      <div className="relative">
        <div className="w-full fixed top-0">
          <Navbar />
        </div>
        <div className="mt-32">
          <SpotifyData code={code} />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <Login />
    </div>
  );
};

export default App;

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//     </div>
//   )
// }

// export default App
