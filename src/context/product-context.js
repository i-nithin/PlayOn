import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";

const productContext = createContext(null);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getProducts() {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <productContext.Provider value={{ products }}>
      {children}
    </productContext.Provider>
  );
}

const useProducts = () => useContext(productContext);

export { ProductProvider, useProducts };
