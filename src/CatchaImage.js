import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";

/*
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 function CatchaImage(props) {

  const checkmarkurl = "url(" + 'checkmark.png' + ")";

  /*
   * State variables
   * isSelected: so we know if the image has been clicked or not. Not clicked by default.
   */
    const [isSelected, setSelected] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    // const prevSrc = usePrevious(props.src);

    //make sure default state after rendering loading is not-checked
    // useEffect( () => {
    //   setIsLoaded(true);
    // }, []);

  //uncheck the image if the source has changed during the last render
  /* After setting state, React will call your components componentDidUpdate function. 
  By comparing the current and previous state objects within this function you can signal 
  to the parent component that your async operation has completed and your new component's 
  // state has rendered: */
  //   useEffect( () => {
  //      setSelected(false);

  //      if(prevSrc !== props.src && isLoaded) {
  //         props.onSrcChange
  //      }

  //   }, [props.src]);

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
          className={isSelected ? "catcha-image image-is-clicked" : "catcha-image" } 
          key={"source-image" + props.imageIndex}
          onLoad={ () => {props.onImgLoad()}}
        />
      </div>
      );

}

export default CatchaImage;