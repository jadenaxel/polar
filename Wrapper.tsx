import type { FC } from "react";

// Importing necessary components from react
import { createContext, useReducer } from "react";

// Initializing values to state
const initialValue: any = {
	darkMode: false,
	category: {},
	especialidad: [],
	book: {},
};

//  Creating actions names and exporting them
export const Actions = {
	DarkMode: "Dark Mode",
	Category: "Category",
	Especialidad: "Especialidad",
	Book: "Book",
};

// Reducer function
// Reducing values to make sure they only recieve a specific value
const reducer = (state: any, action: any): any => {
	switch (action.type) {
		case Actions.DarkMode:
			return { ...state, darkMode: action.payload };
		case Actions.Category:
			return { ...state, category: action.payload };
		case Actions.Especialidad:
			return { ...state, especialidad: action.payload };
		case Actions.Book:
			return { ...state, book: action.payload };
		default:
			return state;
	}
};

// Exporting the context
export const Context: any = createContext({});

// Wrapper component
const Wrapper: FC<any> = ({ children }: any): JSX.Element => {
	// Setting the state and dispatcher up with the initial state and the reducer.
	const [state, dispatch] = useReducer(reducer, initialValue);

	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default Wrapper;
