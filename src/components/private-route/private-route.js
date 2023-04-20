import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function PrivateRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export { PrivateRoute };
