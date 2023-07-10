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
