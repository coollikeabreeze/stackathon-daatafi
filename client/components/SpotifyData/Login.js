import React from "react";

const REDIRECT_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080'
    : 'https://daatafi.herokuapp.com/';


const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=416fece6750a4a9bb9185f0be748671c&response_type=code&redirect_uri=${REDIRECT_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <a  href={AUTH_URL}>
        <button className="bg-green-600 text-white p-4 text-2xl rounded-md">Login with Spotify</button>
        </a>
    </div>
  )
}
