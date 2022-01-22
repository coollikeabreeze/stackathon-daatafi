import React from 'react'
import {connect} from 'react-redux'
import SpotifyData from './SpotifyData'

/**
 * COMPONENT
 */
const Home = props => {
  // const {username} = props

  return (
    <div>
      <h3>Daatafi</h3>
      <SpotifyData />
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

export default Home;
