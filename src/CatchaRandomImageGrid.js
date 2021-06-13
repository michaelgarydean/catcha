import React from 'react';
import { useState, useEffect,Suspense } from "react";
import CatchaImage from "./CatchaImage";

//Storage to show the images on the grid
var gridImages = [];

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

  //If whichImage gets updated in the parent, re-render the component with a new image grid.
  useEffect( () => {
     gridImages = createGrid(props.gridSize, props.whichImage);

  }, [props.imageType]);

    //the paths of all the images needed to show a single image on the grid
    gridImages = createGrid(props.gridSize, props.imageType);

   return (

    <div key={props.whichImage} className="catcha-images">
    
    {/* CatchaImage */}
      {
        gridImages.map((source, gridPosition) => {
          return(
              <CatchaImage src={source} imageIndex={gridPosition} />
          )
        })
      }
    {/* end CatchaImage */}

    </div>
    )
  }

  function createGrid(gridSize, imageType) {

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