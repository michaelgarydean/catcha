import React from 'react';
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import CatchaImage from "./CatchaImage";
import {LoadingContext} from "./LoadingContext";

//Storage to show the images on the grid
var imagesSources = [];

//Only chose 89 (there's really 90) to try to create more randomness without a perfectly divisible number
const totalCatImages = 89;
const totalCarImages = 89;

var catsImageOrder = fillWithRandomNumbers(totalCarImages);
var carsImageOrder = fillWithRandomNumbers(totalCatImages);

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaRandomImageGrid(props) {

  //count how many images have been fully loaded and are in the DOM
  const imagesLoaded = useRef(0);

  //are images still loading?
  const [loading, setLoading] = useContext(LoadingContext);

  //Reset the image count to 0 if loading has been set to true after a render
  useEffect( () => {
    if(loading) {
      imagesLoaded.current = 0;
    }

    //console.log(imagesSources);
    
  }, [loading]);  

  //When all the <img> have loaded in the <GridImage> component, then update the state so we know loading is done
  const handleChildLoad = () => {

    //imagesLoaded++;
    imagesLoaded.current += 1;
    //console.log("image: " + imagesLoaded.current);

    if(imagesLoaded.current >= props.gridSize) {
      //update state
      setLoading(false);
    }

  };

  //an array of image paths for the src attribute in the <img> tags 
  if(loading) {
    imagesSources = getImageSources(props.gridSize, props.imageType);
    //imagesSources = getImageSources(props.gridSize, 0);
  }

  //create child elements on first render, then don't re-render unless imageSources is updated
  const children = React.useMemo(() =>
    imagesSources.map((source, gridPosition) => {
      return(
        //<CatchaImage src={source} imageIndex={gridPosition} onImgLoad={handleChildLoad} key={"child-image-" + source} />
        <CatchaImage src={source} imageIndex={gridPosition} key={"child-image-" + source} onImgLoad={handleChildLoad} />
      )
    }), [imagesSources]
  );

  return <React.Fragment>
      <div className="loading" style={{display: loading ? "block" : "none"}}></div>
      <div key={props.imageType} className="catcha-images" style={{visibility: loading ? "hidden" : "visible"}}>
        {/* CatchaImage */}
        { children }
        {/* end CatchaImage */}
      </div>
    </React.Fragment>;
   
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

  //console.log(catsImageOrder);

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
 * 
 * @params  numElements - How many random numbers should be generated? 
 * 
 * @returns [1,numElements] in random order 
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
 * Generate a random number between [1,maxNumber]
 */
 function randomNumber(maxNumber) {
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return randomNumber;
}

export default CatchaRandomImageGrid;