import React from 'react';
import {useState, useRef, createContext} from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = props => {

	const [loading, setLoading] = useState(true);
	// const [numImagesLoaded, setNumImagesLoaded] = useState(0);

	//const loading = useRef(true);
	//const numImagesLoaded = useRef(0);

	return(
		<LoadingContext.Provider value={[loading, setLoading]}>
			{props.children}
		</LoadingContext.Provider>
	);
}