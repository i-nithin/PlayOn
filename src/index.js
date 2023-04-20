import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import "./index.css";
import "./index.css";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  ProductProvider,
  FilterProvider,
  WishlistProvider,
  CartProvider,
} from "./context";
import { AddressProvider } from "./context/address-context";

makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <FilterProvider>
            <CartProvider>
              <WishlistProvider>
                <AddressProvider>
                  <App />
                </AddressProvider>
              </WishlistProvider>
            </CartProvider>
          </FilterProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
