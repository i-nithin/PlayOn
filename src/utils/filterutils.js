function sortedData(state, data) {
  if (state.sortByPrice && state.sortByPrice === "LOW_TO_HIGH") {
    return [...data].sort((a, b) => a.originalPrice - b.originalPrice);
  }
  if (state.sortByPrice && state.sortByPrice === "HIGH_TO_LOW") {
    return [...data].sort((a, b) => b.originalPrice - a.originalPrice);
  }
  return data;
}

function FilterPriceData(state, data) {
  return data.filter((item) => item.originalPrice >= state.filterByPrice);
}

function FilterCategoryData(state, data) {
  if (state.filterByCategory.length !== 0) {
    return data.filter((item) =>
      state.filterByCategory.includes(item.category)
    );
  }
  return data;
}

function FilterRatingData(state, data) {
  if (state.filterByRatings === "GREATER_THAN_FOUR") {
    return data.filter((item) => item.rating >= 4);
  }
  if (state.filterByRatings === "GREATER_THAN_THREE") {
    return data.filter((item) => item.rating >= 3);
  }
  if (state.filterByRatings === "GREATER_THAN_TWO") {
    return data.filter((item) => item.rating >= 2);
  }

  return data;
}

const ComposeAll = (state, data, ...allFunctions) => {
  return allFunctions.reduce((acc, curr) => curr(state, acc), data);
};

export {
  sortedData,
  FilterPriceData,
  FilterCategoryData,
  FilterRatingData,
  ComposeAll,
};
