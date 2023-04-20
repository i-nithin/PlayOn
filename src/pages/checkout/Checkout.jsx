import { useState } from "react";
import { Modal, PriceDetailsCard } from "../../components";
import "../../App.css";
import { useAddress } from "../../context/address-context";
import { useCart } from "../../context/cart-context";
import { Link } from "react-router-dom";

function Checkout() {
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

  const addressSelector = (e, id) => {
    setisAddresSelected({ status: e.target.checked, id: id });
  };
  return (
    <>
      {cartData?.length > 0 ? (
        <div className="cart-container">
          <div className="d-flex flex-column gap-2">
            <div className="address-card">
              <div className="address-card-header">
                <h4 className="m-0">Delivery Address</h4>
                <button
                  className="addressBtn"
                  onClick={() => {
                    setAddressModal(true);
                    setIsEdit(false);
                  }}
                >
                  {" "}
                  + Add New
                </button>
              </div>
              <div className="address-card-body">
                {addresses?.map((address) => {
                  return (
                    <label
                      key={address._id}
                      htmlFor={address._id}
                      className="address-label"
                    >
                      <input
                        type="radio"
                        id={address._id}
                        name="choose"
                        onChange={(e) => addressSelector(e, address._id)}
                      />
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
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="address-img-card">
              <div className="address-card-header">
                <h4 className="m-0">Item Overview</h4>
              </div>
              {cartData.map((product) => {
                return (
                  <div key={product._id} className="address-img-card-body">
                    <div className="address-img">
                      <img
                        className="responsive-img br-top-sm"
                        src={product.imageSource}
                        alt="no img"
                      />
                    </div>
                    <div>
                      <h5 className="m-0 font-size-sm">{product.name}</h5>
                      <p className="m-0 font-size-sm font-weight-600 d-flex gap-1">
                        <span className="">₹ {product.discountedPrice}</span>
                        <span className="text-decoration-linethrough">
                          ₹ {product.originalPrice}
                        </span>
                        <span className="color-green-600">
                          {(
                            (100 *
                              (product.originalPrice -
                                product.discountedPrice)) /
                            product.originalPrice
                          ).toFixed()}
                        </span>
                      </p>
                      <p className="font-size-sm">Qty : {product.qty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {addressModal && (
              <Modal
                setAddressModal={setAddressModal}
                isEdit={isEdit}
                editAddress={editAddress}
              />
            )}
          </div>
          <PriceDetailsCard isAddresSelected={isAddresSelected} />
        </div>
      ) : (
        <div className="wishlist-container">
          <div className="d-flex align-center flex-column mr-auto-center">
            <h2>Your Cart is empty !</h2>
            <Link to="/productlisting" className="btn btn-primary">
              Add Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export { Checkout };
