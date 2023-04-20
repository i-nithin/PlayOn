import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";

const addressContext = createContext(null);
const useAddress = () => useContext(addressContext);

function AddressProvider({ children }) {
  const token = localStorage.getItem("AuthToken");
  const [addresses, setAddresses] = useState([]);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      (async function getAddress() {
        try {
          const { data } = await axios.get("/api/user/address", {
            headers: {
              authorization: token,
            },
          });
          setAddresses(data.address);
        } catch (err) {
          console.error(err, "err in getaddress");
        }
      })();
    }
  }, [isAuth]);

  const addAddress = async (address) => {
    try {
      const { data } = await axios.post(
        "/api/user/address",
        {
          address,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      setAddresses(data.address);
    } catch (err) {
      console.error(err);
    }
  };

  const updateAddress = async (address) => {
    try {
      const { data } = await axios.post(
        `/api/user/address/${address._id}`,
        {
          address,
        },
        {
          headers: { authorization: token },
        }
      );
      setAddresses(data.address);
    } catch (err) {
      console.error(err);
    }
  };

  const removeAddress = async (addressId) => {
    try {
      const { data } = await axios.delete(`/api/user/address/${addressId}`, {
        headers: {
          authorization: token,
        },
      });
      setAddresses(data.address);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <addressContext.Provider
      value={{ addAddress, addresses, updateAddress, removeAddress }}
    >
      {children}
    </addressContext.Provider>
  );
}

export { AddressProvider, useAddress };
