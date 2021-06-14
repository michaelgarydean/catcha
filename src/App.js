import React, { Component } from 'react'
import { useState } from "react";
import './app.scss'
import Icons from "./Icons";
import CatchaRandomImageGrid from "./CatchaRandomImageGrid";

//total number of images that make up a grid (ex 16 = 4x4 grid)
const gridSize = 9;

/*
 * Render the webpage with the app
 */
 function App() {
  
  /*
   * SET IMAGE TYPE: 0 for Cats, 1 for Cars
   */
   const [imageType, setImageType] = useState(0);

  return (

      <div className="centered-container">
      <div className="catcha-outer-border">

      <div className="catcha-interior-elements-container">

        <div className="catcha-top-elements-container">

          {/* Header */}
          <div className="catcha-header">
            <p>Select all squares with</p>
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <h2>{imageType ? "cars" : "cats"}</h2>
            <p>Click verify once there are none left.</p>
          </div>

          <CatchaRandomImageGrid gridSize={gridSize} imageType={imageType} />

          </div> {/* end catcha-top-elements-container */}

          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <Icons />
              <div className="button-container">
               {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
               {/*<button className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } onClick={() => {setSubmitting(true); setImageType(!imageType); setCurrentImage(13);}}>VERIFY</button>*/}
               <button className={"verify-button" } onClick={() => {setImageType(!imageType); }}>VERIFY</button>
             </div>
          </div>
        </div> {/* end catcha-interior-elements-container */}
    </div>

    </div>
    );
}

export default App;

/* End App Component */