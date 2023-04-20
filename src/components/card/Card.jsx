import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";

function Card({ product }) {
  const { wishlistData, addToWishlist, removeFromWishlist } = useWishlist();
  const { cartData, addToCart } = useCart();
  const { isAuth } = useAuth();

  const {
    _id,
    imageSource,
    name,
    discountedPrice,
    originalPrice,
    rating,
    isBestseller,
  } = product;

  return (
    <>
      <div className="d-flex flex-column card br-top-sm justify-between">
        <div>
          <div className="card-media">
            <img
              className="responsive-img br-top-sm"
              src={imageSource}
              alt="no img"
            />
            {isBestseller ? (
              <div className="badge-text bg-green-200 color-green-600 card-badge-topLeft font-size-sm">
                <span className="material-icons badge-icon"> trending_up </span>
                Best Seller
              </div>
            ) : (
              false
            )}

            {wishlistData.find((wishlistItem) => wishlistItem._id === _id) ? (
              <button
                className="btn-icon card-badge-topRight"
                onClick={() => removeFromWishlist(product)}
              >
                <span className="material-icons color-red-600">favorite</span>
              </button>
            ) : (
              <button
                className="btn-icon card-badge-topRight"
                onClick={() => addToWishlist(product)}
              >
                <span className="material-icons">favorite_border</span>
              </button>
            )}
          </div>
          <div className="card-body">
            <h4 className=" m-0">{name}</h4>

            <div className="card-desc">
              <div className="font-weight-600">₹ {discountedPrice}</div>
              <div className="text-decoration-linethrough">
                ₹ {originalPrice}
              </div>
              <div className="color-green-600">
                {(
                  (100 * (originalPrice - discountedPrice)) /
                  originalPrice
                ).toFixed()}
                %
              </div>
              <div className="star-badge-text bg-warn-200  font-size-sm color-warn-600">
                {rating}
                <span className="material-icons font-size-sm">star_border</span>
              </div>
            </div>
          </div>
        </div>
        {cartData.find((cartItem) => cartItem._id === _id) ? (
          <Link
            className="btn btn-add-cart btn-outline mr-btn-10px font-size-regular"
            to="/cart"
          >
            Go to Cart
          </Link>
        ) : isAuth ? (
          <button
            className="btn btn-add-cart btn-primary mr-btn-10px font-size-regular"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <Link
            className="btn btn-add-cart btn-primary mr-btn-10px font-size-regular"
            to="/login"
          >
            Add to Cart
          </Link>
        )}
      </div>
    </>
  );
}

export { Card };
