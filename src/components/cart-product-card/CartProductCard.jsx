import { Link } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";

function CartProductCard({ product }) {
  const {
    _id,
    imageSource,
    name,
    discountedPrice,
    originalPrice,
    rating,
    qty,
  } = product;

  const { getQuantity, removeFromCart } = useCart();
  const { addToWishlist, wishlistData } = useWishlist();

  return (
    <div className="card-horizontal">
      <div className="w-100-per">
        <img className="responsive-img" src={imageSource} alt="product-img" />
      </div>
      <div className="d-flex flex-column p-1 gap-1 w-100-per">
        <div className="card-body-header d-flex flex-column ">
          <h4 className="m-0">{name}</h4>

          <div className="d-flex flex-column ">
            <div className="d-flex gap-1">
              <span className="font-weight-600">₹ {discountedPrice}</span>
              <span className="text-decoration-linethrough">
                {" "}
                ₹ {originalPrice}
              </span>
              <span className="font-weight-600 color-green-600">
                {(
                  (100 * (originalPrice - discountedPrice)) /
                  originalPrice
                ).toFixed()}
                % off
              </span>
            </div>
          </div>
          <div className="star-badge-text bg-warn-200  font-size-sm color-warn-600">
            {rating}
            <span className="material-icons font-size-sm">star_border</span>
          </div>
          <div className="d-flex gap-sm ">
            Quantity :{" "}
            <button
              className="br-round br-1px"
              onClick={() =>
                qty === 1 ? removeFromCart(_id) : getQuantity(_id, "decrement")
              }
            >
              -
            </button>
            <span className="bg-gray-200 cart-count-num">{qty}</span>
            <button
              className="br-round br-1px "
              onClick={() => getQuantity(_id, "increment")}
            >
              +
            </button>
          </div>
        </div>
        <div className="cart-btns">
          <button
            className="btn btn-add-cart btn-secondary w-100-per font-size-regular"
            onClick={() => removeFromCart(_id)}
          >
            Remove from Cart
          </button>
          {wishlistData.find((wishlistItem) => wishlistItem._id === _id) ? (
            <Link className="btn btn-outline btn-add-cart " to="/wishlist">
              Go to wishlist
            </Link>
          ) : (
            <button
              className="btn btn-add-cart btn-outline w-100-per font-size-regular"
              onClick={() => {
                addToWishlist(product);
                removeFromCart(_id);
              }}
            >
              {" "}
              Move to Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { CartProductCard };
