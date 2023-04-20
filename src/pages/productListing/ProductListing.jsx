import { Card } from "../../components";
import { useFilter } from "../../context/filter-context";
import Filter from "./Filter";

function ProductListing() {
  const { data, searchQuery } = useFilter();
  let finalData = data;

  finalData = finalData.filter((product) => {
    return product.name.includes(searchQuery?.toUpperCase());
  });

  return (
    <>
      <div className="filter-productlist-container p-2">
        <Filter />
        <main>
          <div className="productCount">
            Showing {finalData.length} Products
          </div>
          <div className="productlist-container">
            {finalData &&
              finalData.map((product) => {
                return <Card key={product._id} product={product} />;
              })}
          </div>
        </main>
      </div>
    </>
  );
}

export { ProductListing };
