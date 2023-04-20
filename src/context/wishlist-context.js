import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

const wishlistContext = createContext(null);

function WishlistProvider({ children }) {
  const { isAuth, navigate } = useAuth();
  let authtoken = localStorage.getItem("AuthToken");
  const [wishlistData, setWishlistData] = useState([]);

  async function addToWishlist(product) {
    if (authtoken) {
      try {
        const res = await axios.post(
          "/api/user/wishlist",
          { product },
          {
            headers: {
              authorization: authtoken,
            },
          }
        );
        setWishlistData(res.data.wishlist);
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  }

  async function removeFromWishlist(product) {
    try {
      const res = await axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: {
          authorization: authtoken,
        },
      });

      setWishlistData(res.data.wishlist);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isAuth) {
      (async function getWishlistData() {
        try {
          const res = await axios.get("/api/user/wishlist", {
            headers: {
              authorization: authtoken,
            },
          });
          setWishlistData(res.data.wishlist);
        } catch (error) {
          console.error(error, "wishlist useEffect");
        }
      })();
    } else {
      setWishlistData([]);
    }
  }, [isAuth]);

  return (
    <>
      <wishlistContext.Provider
        value={{ wishlistData, addToWishlist, removeFromWishlist }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
}

const useWishlist = () => useContext(wishlistContext);

export { WishlistProvider, useWishlist };
