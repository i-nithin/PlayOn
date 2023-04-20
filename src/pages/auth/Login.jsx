import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";

function Login() {
  const { loginHandler, isErr } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  return (
    <>
      <div className="auth-form-container">
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler(user.email, user.password);
          }}
        >
          <h1>Login</h1>
          <div className="input-container w-100-per">
            <label htmlFor="login-email">Email address*</label>
            <input
              id="login-email"
              type="email"
              placeholder="your@mail.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="input-container w-100-per">
            <label htmlFor="login-password">Password*</label>
            <input
              id="login-password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <span
              className="material-icons passwordToggle"
              onClick={() => setisPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? "visibility" : "visibility_off"}
            </span>
          </div>
          {isErr ? (
            <small className="color-red-600 bg-red-200 p-alert w-100-per">
              &#9888; Some error occurred{" "}
            </small>
          ) : null}

          <button
            type="submit"
            className="btn btn-primary font-size-regular w-100-per"
          >
            Login
          </button>
          <button
            className="btn btn-outline font-size-regular w-100-per"
            onClick={(e) =>
              loginHandler("nithin2001@gmail.com", "nithinkmr2001")
            }
          >
            Login as a Guest
          </button>
          <Link to="/signup" className="color-gray-500 d-flex gap-sm">
            Create new account
            <span className="material-icons">arrow_forward</span>{" "}
          </Link>
        </form>
      </div>
    </>
  );
}

export { Login };
