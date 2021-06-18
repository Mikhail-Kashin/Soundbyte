# Welcome to Soundbyte!
Soundbyte is a cloud based music app inspired by Spotify that focuses on providing users a platform to upload and play songs, as well as share music with their friends!

<img src='/frontend/public/ReadMe Pics/splashPageGIF.gif'>


## Features
  - Users can play songs using a custom built audio player.
  - Users can go to the explore page to see what other users uploaded.
  - Users can upload songs and track pictures.

## Technology
  - JavaScript
  - Espress
  - PosgreSQL
  - CSS
  - React
  - Redux

  # Features

  ## Audio Player
    - The Audio Player has all the features you would expect from an audio player.

      * Play/Pause
      * Previous Song/Next Song
      * Interactive Progress Bar
      * Current Duration/Full Duration

    - The Audio Player also features the name of the current song being played as well as the track picture the user uploaded along with the song.

  <img src="/frontend/public/ReadMe Pics/AduioPlayerDemo.gif">
    - This Snippet shows logic needed to fill the Progress Bar. As well as make it interactive to be able to skip through the song.

  <img src="/frontend/public/ReadMe Pics/audio player snippet 1.PNG">
    - JavaScript only deals in seconds. Therefore a simple format function is needed to display the duration in a readable song and second format.

  <img src="/frontend/public/ReadMe Pics/audio player snippet 2.PNG">
    - Simple function to make the volume bar interactive. As well as a snippet that shows the logic of the array the player picks songs from.

  <img src="/frontend/public/ReadMe Pics/audio player snippet 3.PNG">
  - These functions show how the previous and next features loop through the array the previous snippet has made.
  - Also a simple event listener that will automatically play the next song when the current one ends. Along with a short useEffect that ensures the page updates dynamically.

  <img src="/frontend/public/ReadMe Pics/audio player snippet 4.PNG">

## Upload
    - Upload Song Demo
  <img src="/frontend/public/ReadMe Pics/Upload Feature Giff.gif">
    - AWS Code
  <img src="/frontend/public/ReadMe Pics/AWS Logic.PNG">
    - New Song Post Route
  <img src="/frontend/public/ReadMe Pics/post new song route.PNG">
