import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  ProductListing,
  Cart,
  Login,
  Signup,
  Wishlist,
  Checkout,
  Profile,
  Orders,
  Address,
} from "../pages/index";
import { PrivateRoute } from "../components";
import Mockman from "mockman-js";
import { useAuth } from "../context/auth-context";

function Routers() {
  const { isAuth } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productlisting" element={<ProductListing />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/address"
        element={
          <PrivateRoute>
            <Address />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      {!isAuth && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/mock" element={<Mockman />} />
    </Routes>
  );
}

export { Routers };
