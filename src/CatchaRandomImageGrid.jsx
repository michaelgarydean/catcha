import React from 'react';
import { useState, useEffect, useCallback, useContext } from "react";
import CatchaImage from "./CatchaImage";
import {LoadingContext} from "./LoadingContext";

//Storage to show the images on the grid
var imagesSources = [];

const totalCatImages = 90;
const totalCarImages = 90;

var catsImageOrder = fillWithRandomNumbers(totalCarImages);
var carsImageOrder = fillWithRandomNumbers(totalCatImages);

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaRandomImageGrid(props) {

  var imageOrder;
  var childrenLoaded = 0;

  //const [loading, isLoading] = useContext(LoadingContext);
  const [loading, isLoading] = useState(true);
  console.log(loading);
  console.log("Loading images...");

  //When all the <img> have loaded in the <GridImage> component, then update the state so we know loading is done
  const handleChildLoad = useCallback(() =>  {

    childrenLoaded++;
    console.log("loaded image #: ": childrenLoaded);

    if(childrenLoaded === props.gridSize){
      isLoading(false);
      console.log(loading);
      console.log("All images have loaded");
    }
  }, []);

  //an array of image paths for the src attribute in the <img> tags  
  imagesSources = getImageSources(props.gridSize, props.imageType);
  //imagesSources = ['cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg', 'cats_01.jpg']

  //all the image components to render (after all <img> have been loaded)
  var children = imagesSources.map((source, gridPosition) => {
    return(
      <div>
        <CatchaImage src={source} imageIndex={gridPosition} onImgLoad={handleChildLoad} key={"child-image-" + source} />
      </div>
    )
  });

  {/*<div key={props.whichImage} className="catcha-images" style={{visibility: childRenderingFinished ? 'visible' : 'hidden' }} >*/}

   return (

    
    <div key={props.imageType} className="catcha-images">
    {/* CatchaImage */}
      { children }
    {/* end CatchaImage */}
    </div>
    )
  }

  function preloadImage(src) {
    const img = document.createElement('img');
    img.src = src; // Assigning the img src immediately requests the image
    return img;
  }

  function getImageSources(gridSize, imageType) {

    /*
     * If there are not enough random numbers to show the sequence, generate more and add them to the arrays
     */
    if(imageType == 0 && catsImageOrder.length < gridSize) {
      catsImageOrder = fillWithRandomNumbers(totalCatImages);
    }

    if(imageType == 1 && carsImageOrder.length < gridSize) {
      carsImageOrder = fillWithRandomNumbers(totalCarImages);
    }

    var imageNumber;
    var imagePrefix = imageType ? "cars" : "cats";
    var imagesSources = [];

    /* 
   * Create an array that contains all the CatchaImage components
   */
   for(let squareIndex=1; squareIndex <= gridSize; squareIndex++){

    //pick a number off the randomly ordered arrays
    imageNumber = imageType ? carsImageOrder.shift() : catsImageOrder.shift();

    //generate the filename based on the current image to render on the grid
    var imageSrc = imagePrefix + "_" + String(imageNumber).padStart(2, '0') + ".jpg";

    //add the path of the image to the imageSources array
    imagesSources.push(imageSrc);
   }

   return imagesSources;

  }

/*
 * Generate more random numbers if needed to keep showing the images in a random sequence
 */
function verifyEnoughRandomNumbers(imageSequenceArray, totalAvailableImages, gridSize) {

   //is there at least the same number of elements in the imageNumbers arrays as the grid size?
  if(imageSequenceArray.length < gridSize) {

    //if not, generate more random numbers  so there is enough random numbers to select images for the grid
    imageSequenceArray.concat(fillWithRandomNumbers(totalAvailableImages));

  }

  return imageSequenceArray;
}

  /*
 * Fill an array with random numbers that don't repeat.
 */
function fillWithRandomNumbers(numElements) {

  var randomNumbersArray = [];

  for(let i=0; i<numElements; i++) {

    /* 
     * Generate a random number between [1, total number of elements]
     */
    var num = randomNumber(numElements);

    //Has the random number already been chosen? If it has, choose another number
    while(randomNumbersArray.includes(num)) {
      num = randomNumber(numElements);
    }

    //Add random number to the array
    randomNumbersArray.push(num);

  }

  return randomNumbersArray;

}

/* 
 * Generate a random number
 */
 function randomNumber(maxNumber) {
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return randomNumber;
}

export default CatchaRandomImageGrid;