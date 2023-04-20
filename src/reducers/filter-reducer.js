function filterReducer(state, action) {
  switch (action.type) {
    case "SORT_BY":
      return { ...state, sortByPrice: action.payload };
    case "PRICE_FILTER":
      return { ...state, filterByPrice: action.payload };
    case "CATEGORY_FILTER":
      return {
        ...state,
        filterByCategory: state.filterByCategory.includes(action.payload)
          ? state.filterByCategory.filter((val) => val !== action.payload)
          : [...state.filterByCategory, action.payload],
      };
    case "RATING_FILTER":
      return { ...state, filterByRatings: action.payload };
    case "CLEAR":
      return {
        ...state,
        sortByPrice: null,
        filterByPrice: null,
        filterByCategory: [],
        filterByRatings: null,
      };

    default:
      return { ...state };
  }
}

export { filterReducer };
