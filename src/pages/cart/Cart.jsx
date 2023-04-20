import { Link } from "react-router-dom";
import { CartProductCard, PriceDetailsCard } from "../../components";
import { useCart } from "../../context/cart-context";

function Cart() {
  const { cartData } = useCart();

  return (
    <>
      {cartData.length > 0 ? (
        <div className="cart-container">
          <div className="d-flex flex-column gap-2">
            {cartData.map((cartItem) => {
              return <CartProductCard key={cartItem._id} product={cartItem} />;
            })}
          </div>
          <PriceDetailsCard />
        </div>
      ) : (
        <div className="wishlist-container">
          <div className="d-flex align-center flex-column mr-auto-center">
            <h2>Your Cart is empty !</h2>
            <Link to="/productlisting" className="btn btn-primary">
              Add Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export { Cart };
