import axios from "axios";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "./auth-context";

const cartContext = createContext(null);
const useCart = () => useContext(cartContext);

function CartProvider({ children }) {
  const authtoken = localStorage.getItem("AuthToken");
  const [cartData, setcartData] = useState([]);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      (async function getCartData() {
        try {
          const res = await axios.get("/api/user/cart", {
            headers: {
              authorization: authtoken,
            },
          });
          setcartData(res.data.cart);
        } catch (error) {
          console.error(error, "err in getcartData");
        }
      })();
    } else {
      setcartData([]);
    }
  }, [isAuth]);

  async function addToCart(product) {
    try {
      const res = await axios.post(
        "/api/user/cart",
        { product },
        {
          headers: {
            authorization: authtoken,
          },
        }
      );
      setcartData(res.data.cart);
    } catch (error) {
      console.error(error, "err in addToCart-context");
    }
  }

  async function getQuantity(id, type) {
    try {
      const res = await axios.post(
        `/api/user/cart/${id}`,
        {
          action: {
            type: type,
          },
        },
        {
          headers: {
            authorization: authtoken,
          },
        }
      );
      setcartData(res.data.cart);
    } catch (error) {
      console.error(error, "err in removefromcart-context");
    }
  }

  async function removeFromCart(id) {
    try {
      const res = await axios.delete(`/api/user/cart/${id}`, {
        headers: {
          authorization: authtoken,
        },
      });
      setcartData(res.data.cart);
    } catch (error) {
      console.error(error, "err in increaseQuantity-context");
    }
  }

  const priceDetailsCalc = (obj, curritem) => ({
    ...obj,
    totalOriginalPrice:
      curritem.originalPrice * curritem.qty + obj.totalOriginalPrice,
    totalDiscoutPrice:
      curritem.discountedPrice * curritem.qty + obj.totalDiscoutPrice,
  });

  const reducedData = cartData.reduce(priceDetailsCalc, {
    totalOriginalPrice: 0,
    totalDiscoutPrice: 0,
  });

  return (
    <cartContext.Provider
      value={{
        cartData,
        addToCart,
        getQuantity,
        removeFromCart,
        reducedData,
        setcartData,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export { CartProvider, useCart };
