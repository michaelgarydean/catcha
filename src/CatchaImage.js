import React from 'react';
import { useState, useEffect } from "react";


/*
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 function CatchaImage(props) {

  useEffect( () => {
     setSelected(false);

  }, [props.src]);

  const checkmarkurl = "url(" + 'checkmark.png' + ")";

  /*
   * State variables
   * isSelected: so we know if the image has been clicked or not. Not clicked by default.
   */
    const [isSelected, setSelected] = useState(false);

    return(

      <div id={"image" + props.imageIndex} className="catcha-single-image" key={"image-div" + props.imageIndex} 
          onClick={() => setSelected(!isSelected )}>
        <div className={isSelected ? "checkmark image-is-clicked" : "checkmark" } style={isSelected ? {backgroundImage: checkmarkurl} : {backgroundImage: "none"} } key={"checkmark" + props.imageIndex}></div>
        <span className="catcha-image-size-aligner" key={"aligner" + props.imageIndex}></span>
        <img
          src={props.src} 
          className={isSelected ? "catcha-image image-is-clicked" : "catcha-image" } 
          key={"source-image" + props.imageIndex}
        />
      </div>
      );

}


export default CatchaImage;