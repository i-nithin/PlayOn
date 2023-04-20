import { useState } from "react";
import { useAddress } from "../../context/address-context";

function Modal({ isEdit, editAddress, setAddressModal }) {
  const [address, setAddress] = useState({
    [isEdit ? "_id" : ""]: isEdit ? editAddress._id : "",
    name: isEdit ? editAddress?.name : "",
    street: isEdit ? editAddress?.street : "",
    city: isEdit ? editAddress?.city : "",
    state: isEdit ? editAddress?.state : "",
    zipcode: isEdit ? editAddress?.zipcode : "",
    mobile: isEdit ? editAddress?.mobile : "",
  });

  const { addAddress } = useAddress();
  const { updateAddress } = useAddress();

  return (
    <>
      <div className="modal-background">
        <div className="modal-content">
          <button
            className="btn modal-close-btn"
            onClick={() => setAddressModal(false)}
          >
            {" "}
            <span className="material-icons">clear</span>
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEdit ? updateAddress(address) : addAddress(address);
              setAddressModal(false);
            }}
            className="modal-content p-relative"
          >
            <div className="input-container w-100-per">
              <label htmlFor="address-name">Name</label>
              <input
                id="address-name"
                type="text"
                value={address.name}
                required
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />
            </div>
            <div className="input-container w-100-per">
              <label htmlFor="address-street">Street</label>
              <input
                id="address-street"
                type="text"
                value={address.street}
                required
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            </div>
            <div className="input-container w-100-per">
              <label htmlFor="address-city">City</label>
              <input
                id="address-city"
                type="text"
                placeholder=""
                value={address.city}
                required
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </div>
            <div className="input-container w-100-per">
              <label htmlFor="address-state"> State</label>
              <input
                id="address-state"
                type="text"
                value={address.state}
                required
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
            <div className="input-container w-100-per">
              <label htmlFor="address-zipcode">Zipcode</label>
              <input
                id="address-zipcode"
                type="number"
                value={address.zipcode}
                required
                onChange={(e) =>
                  setAddress({ ...address, zipcode: e.target.value })
                }
              />
            </div>
            <div className="input-container w-100-per">
              <label htmlFor="address-mobile">Mobile No.</label>
              <input
                id="address-mobile"
                type="number"
                value={address.mobile}
                required
                onChange={(e) =>
                  setAddress({ ...address, mobile: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary font-size-regular w-100-per"
            >
              {isEdit ? "Update Address" : "Add New Address"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export { Modal };
