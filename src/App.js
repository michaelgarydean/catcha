import './App.scss';

/* for preloading */
import React, { useEffect, useState } from "react";

/* Load images from the folders */
const catchaCatImages = collectImages(require.context('./images/cats', false, /\.(png|jpe?g|svg)$/));
const catchaCarImages = collectImages(require.context('./images/cars', false, /\.(png|jpe?g|svg)$/));
const catchaIcons = collectImages(require.context('./images/icons', false, /\.(png|jpe?g|svg)$/));

//console.log(JSON.stringify(catchaCatImages, null, 2));

/*
 * Render the webpage with the app
 */
 function App() {

  /* 
   * Store which image type has been used for the CATCAH (cars or cats)
   * 0 - is for cats
   * 1 - is for cars
   */

   const [imageType, setImageType] = useState(0);

  //this effect runs first so it doesn't get overwritten
  useEffect(() => {
  	const data = localStorage.getItem('localData');

    //first check if there is already data, then parse it.
    if(data) {
      //set the image type to the opposite of the last time
      setImageType(!JSON.parse(data));
	}
  }, []); // Only run after the first render

  //store image type in local storage
  useEffect(() => {
  	localStorage.setItem("localData", JSON.stringify(imageType));
  });

  console.log(imageType);

  return (
	  	<div className="App">

	  	<div className="centered-container">
	  	<div className="catcha-outer-border">

	  	<div className="catcha-interior-elements-container">

	  	<div className="catcha-top-elements-container">

	  {/* Header */}
	  <div className="catcha-header">
	  <p>Select all images with</p>
		{/* If imageType is 0, show cats, otherwise, show cars. */}
		<h2>{imageType ? "cars" : "cats"}</h2>
		<p>Click verify once there are none left.</p>
		</div>

		{/* Grid of images */}
		{/* If imageType is 0, show cats, otherwise, show cars. */}
		<CatchaImageGrid imageType={imageType} />

		</div> {/* end catcha-top-elements-container */}

		{/* Bottom of catcha */}
		<div className="catcha-footer">
		<span className="icon-size-aligner"></span>
		<div className="catcha-icons">
		<div className="icon"><img src={catchaIcons['refresh_2x.png'].default} /></div>
		<div className="icon"><img src={catchaIcons['audio_2x.png'].default} /></div>
		<div className="icon"><img src={catchaIcons['info_2x.png'].default} /></div>
		</div>
		<SubmitButton />
		</div>

		</div> {/* end catcha-interior-elements-container */}
		</div>

		</div>


		<div className="image-placeholder">
		</div>

		</div>
		);
}

/* 
 * ==============================================================
 * Component for the submit button and it's behaviours.
 * ==============================================================
 */
 function SubmitButton() {

  /*
   * State variables
   * isSubmitting: Behavior to change while the "submitting process" is taking place. 
   * This is just for user feedback to see their action having an effect.
   */
   const [isSubmitting, setSubmitting] = useState(false);

   return (
	   	<div className="button-container">
		   {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
		   <button className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } onClick={() => {setSubmitting(true); refreshPage()}}>VERIFY</button>
	   </div>
   );

}

/* 
 * When the verify button is clicked, show a new set of random images.
 */  
 function refreshPage() {
 	window.location.reload(false);
 }

/* 
 * Load images from a folder
 */
 function collectImages(r) {

 	let images = {};
 	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
 	return images;

 }

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaImageGrid(props) {

 	const gridSize = 9;
 	const gridImages = [];
 	const images = props.imageType ? catchaCarImages : catchaCatImages;

  //total number of images in assets folder
  const numberOfImages = Object.keys(images).length;

  //stores random numbers used to choose images randomly from the folder
  const imageNumbers = [];

  /* 
   * Create the <div> and insert a random image on the image grid
   */
   for(let imageIndex=1; imageIndex <= gridSize; imageIndex++){

   	/* Generate a random number. Generate a new one if it already has been chosen. */
   	let num = randomNumber(numberOfImages);

    //Has the random number already been chosen? If it has, choose another number
    while(imageNumbers.includes(num)) {
    	num = randomNumber(numberOfImages);
    }

    //Add random number to the array
    imageNumbers.push(num);

    /*
     * Filenames are written like "cat_01.jpg"
     * So format filenumbers to be exactly 2 digits (ex. 01, 11, 04 etc) for the filenames
     */
     let fileNumber = String(num).padStart(2, '0');     

    /*
     * Create the <div> and insert a random image on the image grid;
     */
     gridImages.push(
     	<CatchaImage fileNumber={fileNumber} imageIndex={imageIndex} images={images} imageType={props.imageType} />
     );
 }

 return <div className="catcha-images">{gridImages}</div>;
}

/* 
 * Generate a random number
 */
 function randomNumber(maxNumber) {
 	var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
 	return randomNumber;
 }

/*
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 function CatchaImage(props) {

 	//filename of the image to load, depending on which folder it's coming from - cars or cats.
 	var fileName = (props.imageType ? "cars" : "cats") + "_" + props.fileNumber + ".jpg";

  /*
   * State variables
   * isSelected: so we know if the image has been clicked or not. Not clicked by default.
   */
   const [isSelected, setSelected] = useState(false);
   const [isLoaded, setLoaded] = useState(false);

  /*
   * Add a class "image-is-clicked" if the image has been clicked to resize the image and show the checkmark.
   * The <span> element is just used to vertically align the image (both set to inline-block).
   */
   return (
	   	<div id={"image" + props.imageIndex} className="catcha-single-image">
		   	{!isLoaded && <div className="hide-image-before-load"></div>}
		   	<div className={isSelected ? "checkmark image-is-clicked" : "checkmark" }></div>
		   	<span className="catcha-image-size-aligner"></span>
		   	<img 
			   	src={props.images[fileName].default} 
			   	onLoad={() => (setLoaded(true))} 
			   	className={isSelected ? "catcha-image image-is-clicked" : "catcha-image" } 
			   	onClick={() => setSelected(!isSelected )}
		   	/>
	   	</div>
   	)
}

export default App;
