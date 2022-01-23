import React from "react";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=streaming`

export default function Login() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <a  href={AUTH_URL}>
        <button className="bg-green-600 text-white p-4 text-2xl rounded-md">Login with Spotify</button>
        </a>
    </div>
  )
}
