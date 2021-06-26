import React from 'react';
import { useState, useEffect, useCallback, useContext } from "react";
import CatchaImage from "./CatchaImage";
import {LoadingContext} from "./LoadingContext";

//Storage to show the images on the grid
var imagesSources = [];

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function RandomImageGrid(props) {

  var imageOrder;
  var childrenLoaded = 0;

  //const [loading, isLoading] = useContext(LoadingContext);
  const [loading, isLoading] = useState(LoadingContext);
  const [childrenLoaded, setChildrenLoaded] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("loading: " + loading);
  }, [loading]);

  useEffect(() => {
    setChildrenLoaded(0);
  }, [props.imageType]);
  

  //When all the <img> have loaded in the <GridImage> component, then update the state so we know loading is done
  const handleChildLoad = useCallback(() =>  {

    setChildrenLoaded(childrenLoaded+1);

    if(childrenLoaded === props.gridSize){
      isLoading(false);
    }
  }, []);

  //an array of image paths for the src attribute in the <img> tags  
  imagesSources = ['cats_01.jpg', 'cats_02.jpg', 'cats_03.jpg', 'cats_04.jpg', 'cats_05.jpg', 'cats_06.jpg', 'cats_07.jpg', 'cats_08.jpg', 'cats_09.jpg']

   return (
    
    <div key={props.imageType} className="catcha-images">
      { imagesSources.map((source, gridPosition) => {
        return(
          <div>
            <img
              src={source} 
              onLoad={ () => {handleChildLoad()}}
            />
          </div>
        )
      }) }
    </div>
    )
  }

export default RandomImageGrid;