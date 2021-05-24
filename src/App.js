import './App.scss';

/* for preloading */
import React, { useEffect } from "react";

/* Load images from a folder for all the cats */
const catchaCatImages = collectImages(require.context('./images/cats', false, /\.(png|jpe?g|svg)$/));
const catchaIcons = collectImages(require.context('./images/icons', false, /\.(png|jpe?g|svg)$/));

//console.log(JSON.stringify(catchaCatImages, null, 2));

function App() {
  return (
    <div className="App">

        <div class="centered-container">
          <div class="catcha-outer-border">

            <div class="catcha-interior-elements-container">

          {/* Header */}
              <div class="catcha-header">
                <p>Select all images with</p>
                <h2>cats</h2>
                <p>Click verify once there are none left.</p>
              </div>

            {/* Grid of images */}
              <CatchaImages />

              {/* Bottom of catcha */}
              <div class="catcha-footer">
                <div class="catcha-icons">
                  <div class="icon"><img src={catchaIcons['refresh_2x.png'].default} /></div>
                  <div class="icon"><img src={catchaIcons['audio_2x.png'].default} /></div>
                  <div class="icon"><img src={catchaIcons['info_2x.png'].default} /></div>
                </div>
                <div class="button-verify">
                  <button class="button" onClick={refreshPage}>VERIFY</button>
                </div>
              </div>

            </div> {/* end catcha-interior-elements-container */}

        </div>

      </div>
        

          <div class="image-placeholder">
          </div>

    </div>
  );
}


  
function refreshPage() {
  window.location.reload(false);
}

/* Load images from a folder */
function collectImages(r) {

  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;

}

/* Component to show a grid of images */
function CatchaImages() {

  var gridSize = 9;
  var gridImages = [];

  //total number of images in assets folder
  var numberOfImages = Object.keys(catchaCatImages).length;

  //stores random numbers used to choose images randomly from the folder
  var imageNumbers = [];

  /* Create the <div> and insert a random image on the image grid */
  for(let i=1; i <= gridSize; i++){

    /* Generate a random numbers. Generate a new one if it already has been chosen. */
    var num = randomNumber(numberOfImages);

    //Has the random number already been chosen? If it has, choose another number
    while(imageNumbers.includes(num)) {
      num = randomNumber(numberOfImages);
    }

    //Add random number to the array
    imageNumbers.push(num);

    //format it to be exactly 2 digits (ex. 01, 11, 04 etc) for the filenames
    let filenumber = String(num).padStart(2, '0');       
    
    //Create the <div> and insert a random image on the image grid
    gridImages.push(
      <div id={"image" + i}>
        <img src={catchaCatImages["cats_" + filenumber + ".jpg"].default} />
      </div>
    );
  }

  /* 
   * Preload the images
   */
  useEffect(() => {

    gridImages.forEach(image => {
      new Image().src = image;
    })
  });

  return <div className="catcha-images">{gridImages}</div>;
}

/* Generate a random number */
function randomNumber(maxNumber) {
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return randomNumber;
}

export default App;
