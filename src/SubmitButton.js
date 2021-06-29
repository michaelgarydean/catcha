import React from 'react';
import {useState,useEffect} from 'react';

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function SubmitButton(props) {

 const [loadingState, SetLoadingState] = useState(props.loadingState);

useEffect(() => {
console.log(loadingState);
}, [loadingState]);

   return (
		<div className="button-container">
	       <button 
	          className={loadingState ? "verify-button button-on-submit" : "verify-button"} >
	          VERIFY
	        </button>
	     </div>
    )
  }

export default SubmitButton;


	          // onClick={() => {numImagesLoaded.current = 0; loading.current = true; setImageType(!imageType); }}>