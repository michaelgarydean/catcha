import React, { Component, useContext, useEffect, useRef } from 'react'
import { useState } from "react";
import './app.scss'
import Icons from "./Icons";
import CatchaRandomImageGrid from "./CatchaRandomImageGrid";
import {LoadingContext} from "./LoadingContext";

//total number of images that make up a grid (ex 16 = 4x4 grid)
const gridSize = 9;

/*
 * Render the webpage with the app
 */
 function App() {
  
  /*
   * SET IMAGE TYPE: 0 for Cats, 1 for Cars
   */
  const imageType = useRef(0);
  const [loading, setLoading] = useContext(LoadingContext);
  const [gridVisibility, setGridVisibility] = useState(false);

  //We only want to update the grid if imageType has changed

  return (

      <div className="centered-container">
      <div className="catcha-outer-border">

      <div className="catcha-interior-elements-container">

        <div className="catcha-top-elements-container">

          {/* Header */}
          <div className="catcha-header">
            <p>Select all squares with</p>
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <h2>{imageType.current ? "cars" : "cats"}</h2>
            <p>Click verify once there are none left.</p>
          </div>

          <CatchaRandomImageGrid gridSize={gridSize} imageType={imageType.current} />
          </div> {/* end catcha-top-elements-container */}

          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <Icons />
              <div className="button-container">
               {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
                <button 
                  className={loading ? "verify-button button-on-submit" : "verify-button" } 
                  onClick={() => {imageType.current = !imageType.current; setLoading(true);}}
                >
                  VERIFY
                </button>
             </div>
          </div>
        </div> {/* end catcha-interior-elements-container */}
    </div>

    </div>
    );
}

export default App;

/* End App Component */