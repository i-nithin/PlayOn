import { useState } from "react";
import { useFilter } from "../../context/filter-context";

function Filter() {
  const [price, setPrice] = useState();
  const { state, dispatch } = useFilter();
  const { sortByPrice, filterByPrice, filterByRatings, filterByCategory } =
    state;

  return (
    <>
      <aside className="filter-sidebar">
        <div className="filter-container">
          <div className="filter-head">
            <h3 className="m-0">Filter</h3>
            <button
              className="text-underline m-0 btn-link"
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              Clear
            </button>
          </div>

          <h4>Sort By</h4>
          <div className="filter-input-group">
            <label htmlFor="sortby2">
              <input
                type="radio"
                name="sort"
                id="sortby2"
                checked={sortByPrice === "HIGH_TO_LOW"}
                onChange={() =>
                  dispatch({ type: "SORT_BY", payload: "HIGH_TO_LOW" })
                }
              />{" "}
              Price -- High to Low
            </label>
            <label htmlFor="sortby3">
              <input
                type="radio"
                name="sort"
                id="sortby3"
                checked={sortByPrice === "LOW_TO_HIGH"}
                onChange={() =>
                  dispatch({ type: "SORT_BY", payload: "LOW_TO_HIGH" })
                }
              />{" "}
              Price -- Low to High
            </label>
          </div>
          <hr className="customDivider" />
          <div className="filter-content">
            <h4>Price</h4>
            <div className="filter-input-group">
              <input
                className="slider"
                type="range"
                value={filterByPrice || 0}
                min={0}
                step={2000}
                max={8000}
                onChange={(e) => {
                  dispatch({ type: "PRICE_FILTER", payload: e.target.value });
                  setPrice(e.target.value);
                }}
              />
              <span id="rangeValue" className="slider-value">
                {price} &amp;above
              </span>
            </div>
            <hr className="customDivider" />
            <h4>Category</h4>
            <div className="filter-input-group">
              <label htmlFor="category1">
                <input
                  type="checkbox"
                  name="category"
                  id="category1"
                  checked={filterByCategory.includes("Men")}
                  onChange={() =>
                    dispatch({ type: "CATEGORY_FILTER", payload: "Men" })
                  }
                />{" "}
                Men
              </label>
              <label htmlFor="category2">
                <input
                  type="checkbox"
                  name="category"
                  id="category2"
                  checked={filterByCategory.includes("Women")}
                  onChange={() =>
                    dispatch({ type: "CATEGORY_FILTER", payload: "Women" })
                  }
                />{" "}
                Women
              </label>
              <label htmlFor="category3">
                <input
                  type="checkbox"
                  name="category"
                  id="category3"
                  checked={filterByCategory.includes("Kids")}
                  onChange={() =>
                    dispatch({ type: "CATEGORY_FILTER", payload: "Kids" })
                  }
                />{" "}
                Kids
              </label>
            </div>
            <hr className="customDivider" />
            <h4>Ratings</h4>
            <div className="filter-input-group">
              <label htmlFor="rating1">
                <input
                  type="radio"
                  name="rating"
                  id="rating1"
                  checked={filterByRatings === "GREATER_THAN_FOUR"}
                  onChange={() =>
                    dispatch({
                      type: "RATING_FILTER",
                      payload: "GREATER_THAN_FOUR",
                    })
                  }
                />
                4 ★&amp; above
              </label>
              <label htmlFor="rating2">
                <input
                  type="radio"
                  name="rating"
                  id="rating2"
                  checked={filterByRatings === "GREATER_THAN_THREE"}
                  onChange={() =>
                    dispatch({
                      type: "RATING_FILTER",
                      payload: "GREATER_THAN_THREE",
                    })
                  }
                />
                3 ★&amp; above
              </label>
              <label htmlFor="rating3">
                <input
                  type="radio"
                  name="rating"
                  id="rating3"
                  checked={filterByRatings === "GREATER_THAN_TWO"}
                  onChange={() =>
                    dispatch({
                      type: "RATING_FILTER",
                      payload: "GREATER_THAN_TWO",
                    })
                  }
                />{" "}
                2 ★&amp; above
              </label>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Filter;
