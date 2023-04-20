import "./profile.css";

function Orders() {
  return (
    <div className="filter-productlist-container p-2">
      <ProfileSidebar />
      <main>
        <div className="productlist-container profile-page-main">
          Placed orders will update here
        </div>
      </main>
    </div>
  );
}

export { Orders };
