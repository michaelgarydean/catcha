import React, { Component } from 'react'
import './app.scss'

/*
 * Render the webpage with the app
 */
 function App() {

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

          {/*<CatchaImageGrid gridSize={gridSize} whichImage={currentImageIndex+1} />*/}

          </div> {/* end catcha-top-elements-container */}

          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <Icons />
              <div className="button-container">
               {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
               {/*<button className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } onClick={() => {setSubmitting(true); setImageType(!imageType); setCurrentImage(13);}}>VERIFY</button>*/}
               <button className={"verify-button" } >VERIFY</button>
             </div>
          </div>
        </div> {/* end catcha-interior-elements-container */}
    </div>

    </div>
    );
}