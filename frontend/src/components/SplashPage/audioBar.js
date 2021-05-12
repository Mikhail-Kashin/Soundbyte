import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";


export const AudioBar = () => {


  const audio = document.getElementById("audio")

  function timeFormater(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10 ){
      sec = `0${sec}`;
    }
    return `${min}:${sec}`
  }

  function updateBar() {
  if (audio) {
    let canvas = document.getElementById('my-canvas').getContext('2d')
    let canvasWidth = 500
    let ctrl = document.getElementById('audioControl')
    canvas.clearRect(0, 0, canvasWidth, 50);
    canvas.fillStyle = '#000000';
    canvas.fillRect(0, 0, canvasWidth, 50);

    if (audio.currentTime === audio.duration) {
      ctrl.innerHTML = 'Play'
    }

    timeFormater(audio.currentTime)

    let percentage = audio.currentTime / audio.duration
    let progress = (canvasWidth * percentage)
    canvas.fillStyle = "#FF0000"
    canvas.fillRect(0, 0, progress, 50)
  }
  }

  return (
    <div>
      <canvas id="my-canvas" width="300" height="20">
        <p>{updateBar()}</p>
        </canvas>
    </div>
  )
}

export default AudioBar;
