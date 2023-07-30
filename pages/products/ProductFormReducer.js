const formReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_INPUT": //title, desc, price, category, props
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case "CHANGE_IMAGES": //images
			return {
				...state,
				images: action.payload,
			};
		case "LOAD_CATEGORIES":
			return {
				...state,
				categories: action.payload,
			};
		case "SET_PRODUCT_PROPERTIES":
			return {
				...state,
				productProperties: {
					...state.productProperties,
					[action.payload.propName]: action.payload.value,
				},
			};
		case "DELETE_IMAGE":
			return {
				...state,
				images: state.images.filter((image) => image !== action.payload),
			};
		default:
			return state;
	}
};
export default formReducer;

//refactorizacion del reducer a probar
export const formReducerRefactor = (state, action) => {
	const { type, payload } = action;
	const fn = {
		CHANGE_INPUT: () => ({ ...state, [payload.name]: payload.value }),
		CHANGE_IMAGES: () => ({ ...state, images: payload }),
		LOAD_CATEGORIES: () => ({ ...state, categories: payload }),
		SET_PRODUCT_PROPERTIES: () => ({
			...state,
			productProperties: {
				...state.productProperties,
				[payload.propName]: payload.value,
			},
		}),
		DELETE_IMAGE: () => ({
			...state,
			images: state.images.filter((image) => image !== payload),
		}),
		["default"]: () => ({ ...state }),
	};

	const Funct = fn[type] || fn["default"];

	return Funct();
};
