import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './splashPage.css'

function SongPage() {
  const dispatch = useDispatch();


const renderSongPage = () => {
console.log('test')

return (
  <div>
    <p className="yourSongs">Your Songs</p>
    
  </div>
)
}

return (
  <div>
    {renderSongPage()}
  </div>
)

}

export default SongPage;
