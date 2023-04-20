import { Link } from "react-router-dom";
import { Card } from "../../components";

import { useWishlist } from "../../context/wishlist-context";

function Wishlist() {
  const { wishlistData } = useWishlist();

  return (
    <>
      <div className="wishlist-container">
        {wishlistData.length > 0 ? (
          wishlistData.map((wishlistProduct) => {
            return <Card key={wishlistProduct._id} product={wishlistProduct} />;
          })
        ) : (
          <div className=" d-flex align-center flex-column mr-auto-center">
            <h2>Your Wishlist is empty !</h2>
            <Link to="/productlisting" className="btn btn-primary">
              Add Products
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export { Wishlist };
