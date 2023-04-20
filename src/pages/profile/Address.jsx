import "./profile.css";
import { useAddress } from "../../context/address-context";
import { useState } from "react";
import { Modal, PriceDetailsCard } from "../../components";
import "../../App.css";
import { useCart } from "../../context/cart-context";
import { Link } from "react-router-dom";

function Address() {
  const [addressModal, setAddressModal] = useState(false);
  const { addresses } = useAddress();
  const [isEdit, setIsEdit] = useState(false);
  const [editAddress, setEditAddress] = useState();
  const { removeAddress } = useAddress();
  const { cartData } = useCart();
  const [isAddresSelected, setisAddresSelected] = useState({
    status: false,
    id: null,
  });

  return (
    <div className="filter-productlist-container p-2">
      <ProfileSidebar />
      <main>
        <div>
          <h3 className="m-0 mb-1"> My address </h3>
          <button
            className="addressBtn "
            onClick={() => {
              setAddressModal(true);
              setIsEdit(false);
            }}
          >
            {" "}
            + Add New
          </button>
        </div>
        <div className="productlist-container profile-page-main">
          {addresses?.map((address) => {
            return (
              <div
                key={address._id}
                htmlFor={address._id}
                className="address-label"
              >
                <div className="w-100-per">
                  <h4>{address.name}</h4>
                  <p>{address.street}</p>
                  <p>
                    {address.zipcode} {address.city} {address.state}
                  </p>
                </div>
                <div className="menu">
                  <button
                    className="addressBtn"
                    onClick={() => {
                      setAddressModal(true);
                      setIsEdit(true);
                      setEditAddress(address);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="addressBtn"
                    onClick={() => {
                      removeAddress(address._id);
                      setisAddresSelected({ status: false, id: "" });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

          {addressModal && (
            <Modal
              setAddressModal={setAddressModal}
              isEdit={isEdit}
              editAddress={editAddress}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export { Address };
