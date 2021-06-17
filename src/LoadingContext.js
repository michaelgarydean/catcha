import React from 'react';
import {useState, createContext} from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = props => {

	const [loading, isLoading] = useState(true);

	return(
		<LoadingContext.Provider value={[loading, isLoading]}>
			{props.children}
		</LoadingContext.Provider>
	);
}