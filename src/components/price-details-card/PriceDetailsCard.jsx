import { useCart } from "../../context/cart-context";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { loadScript } from "../../utils/loadScript";
import axios from "axios";

function PriceDetailsCard({ isAddresSelected }) {
  const { cartData, reducedData, setcartData } = useCart();
  const token = localStorage.getItem("AuthToken");
  const navigate = useNavigate();
  const location = useLocation();
  const { totalDiscoutPrice, totalOriginalPrice } = reducedData;

  const clearCart = async (setcartData, token) => {
    try {
      const res = await axios.post(
        "/api/user/cart/clearCart",
        {},
        { headers: { authorization: token } }
      );
      setcartData(res.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  async function displayRazorpay(e) {
    e.preventDefault();
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      currency: "INR",
      amount: totalDiscoutPrice * 100,
      name: "Neon Sports",
      description: "Thank you for trusting us",
      image: "",

      handler: async (response) => {
        const { razorpay_payment_id } = await response;
        const orderData = {
          orderAmount: totalDiscoutPrice,
          razorpayId: razorpay_payment_id,
        };
        await clearCart(setcartData, token);
        toast.success("Order placed sucessfully!");
        navigate("/productlisting");
      },
      prefill: {
        contact: "7304120522",
        email: "narharikale5051@gmail.com",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment Cancelled", toastStyle);
    });
    paymentObject.open();
  }

  return (
    <>
      <div>
        <div className="card card-textonly p-2 p-sticky-top">
          <h3 className="m-0">Price Details</h3>
          <hr />
          <ul className="d-flex gap-1 flex-column justify-between list-style-none">
            <li className="d-flex justify-between">
              <span>Total Item's</span> <span> {cartData.length}</span>
            </li>

            <li className="d-flex justify-between">
              <span>Price</span> <span> ₹{totalOriginalPrice}</span>
            </li>
            <li className="d-flex justify-between">
              <span>Discount</span>{" "}
              <span className="color-green-600">
                -₹ {totalOriginalPrice - totalDiscoutPrice}{" "}
              </span>
            </li>
            <li className="d-flex justify-between">
              <span>Delivery Charges</span> <span>Free</span>
            </li>
          </ul>
          <hr />
          <h4>
            <p className="d-flex justify-between font-size-regular">
              <span>Total</span> <span>₹ {totalDiscoutPrice}</span>
            </p>
          </h4>
          <hr />
          <p>
            you will save ₹{totalOriginalPrice - totalDiscoutPrice} on this
            order{" "}
          </p>
          {location.pathname === "/checkout" ? (
            <button
              className="btn btn-primary font-size-regular w-100-per"
              onClick={displayRazorpay}
              disabled={isAddresSelected.status ? false : true}
            >
              {" "}
              Pay{" "}
            </button>
          ) : (
            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-primary font-size-regular w-100-per"
            >
              {" "}
              Checkout{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export { PriceDetailsCard };
