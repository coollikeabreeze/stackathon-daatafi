import React from 'react'
import SpotifyData from './components/SpotifyData'
import Login from './components/SpotifyData/Login'
import Navbar from './components/Navbar'
import Routes from './Routes'

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {

  return (
    code ? (
    <div>
    <Navbar />
    <SpotifyData code={code}/>
    </div>
    ) :
    <div>
      <Navbar />
      <Login />
    </div>
  )
}

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
