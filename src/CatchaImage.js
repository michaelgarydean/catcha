import React from 'react';
import { useState, useEffect, useContext } from "react";
import {LoadingContext} from "./LoadingContext";

/*
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 function CatchaImage(props) {

   // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("image component loaded");
  }, []);

  const checkmarkurl = "url(" + 'checkmark.png' + ")";

  /*
   * State variables
   * isSelected: so we know if the image has been clicked or not. Not clicked by default.
   */
    const [isSelected, setSelected] = useState(false);
    //const [isLoaded, setIsLoaded] = useState(false);
    const [loading, isLoading] = useContext(LoadingContext);

    //make sure default state after rendering loading is not-checked
    useEffect( () => {
       setSelected(false);
    }, [props.src]);

    return(
      <div id={"image" + props.imageIndex} className="catcha-single-image" key={"image-div" + props.imageIndex} 
          onClick={() => setSelected(!isSelected )}>
        <div className={isSelected ? "checkmark image-is-clicked" : "checkmark" } style={isSelected ? {backgroundImage: checkmarkurl} : {backgroundImage: "none"} } key={"checkmark" + props.imageIndex}></div>
        <span className="catcha-image-size-aligner" key={"aligner" + props.imageIndex}></span>
        <img
          src={props.src} 
          className={`${isSelected ? "catcha-image image-is-clicked" : "catcha-image"} ${!loading ? "catcha-image-animation" : ""}` } 
          key={"source-image" + props.imageIndex}
          onLoad={ () => {props.onImgLoad()}}
        />
      </div>
      );

}

export default CatchaImage;