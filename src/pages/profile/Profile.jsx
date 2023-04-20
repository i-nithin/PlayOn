import "./profile.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function ProfileSidebar() {
  const { setIsAuth } = useAuth();
  const logOutHandler = () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("AuthUser");
    setIsAuth(false);
  };

  return (
    <ul className="profile-menu">
      <Link className="profile-menu-li" to="/profile">
        Profile
      </Link>
      <Link className="profile-menu-li" to="/profile/address">
        {" "}
        Address{" "}
      </Link>
      {/* <Link className='profile-menu-li' to='/profile/orders'> Orders </Link> */}
      <div className="profile-menu-li" onClick={logOutHandler}>
        {" "}
        Logout{" "}
      </div>
    </ul>
  );
}

function Profile() {
  const authUser = JSON.parse(localStorage.getItem("AuthUser"));
  console.log(authUser, " authuser");
  return (
    <div className="filter-productlist-container p-2">
      <ProfileSidebar />
      <main>
        <div className="productlist-container profile-page-main">
          {
            <div>
              <h3 className="m-0 mb-1"> My Profile </h3>
              <div>
                <span>Name</span> : {authUser.firstName} {authUser.lastName}
              </div>
              <div>
                <span>Email</span> : {authUser.email}
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  );
}

export { Profile, ProfileSidebar };
