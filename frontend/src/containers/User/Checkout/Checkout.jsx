import { useEffect, useState } from "react";
import { Footer, Header, CartItem } from "../../../userComponents";
import "./Checkout.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import userEndpoints from "../../../constants/userEndpoints";
import endpoints from "../../../constants/endpoints";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosPrivate.get(userEndpoints.GET_ADDRESSES);
        const data = response.data;
        console.log("The Addresses Received are", data);
        setAddresses(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_CART_URL);
        const data = response.data;
        setCartItems(data);
        console.log("This the response recieved : ", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCost = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.cartProduct.costPerMonth;
    }, 0);
  };

  const totalCostValue = totalCost();

  const handleAddressChange = (event) => {
    const addressId = event.target.value;
    console.log(addressId);
    const address = addresses.find((addr) => addr.addressName === addressId);
    console.log(address);
    setSelectedAddress(address);
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.post(userEndpoints.PLACE_ORDER, {
        // Id is not being received
        addressId: selectedAddress._id,
      });
      const data = await response.data;
      console.log(data);
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-page__header">
          <Header />
        </div>

        <main className="checkout-page__main">
          <div className="checkout-page__content">
            <form className="checkout-form">
              <h2>
                Checkout <hr />
              </h2>

              <div className="form-section">
                <h3>Shipping Address</h3>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <div className="select-wrapper">
                    <select
                      name="address"
                      id="address"
                      onChange={handleAddressChange}
                    >
                      {addresses.map((address, index) => (
                        <option key={index} value={address._id}>
                          {address.addressName}
                        </option>
                      ))}
                    </select>
                    {selectedAddress && (
                      <div className="selected-address">
                        <p>{selectedAddress.addressLine1}</p>
                        <p>{selectedAddress.address}</p>
                        <p>{selectedAddress.city}</p>
                        <p>{selectedAddress.state}</p>
                        <p>{selectedAddress.pincode}</p>
                        <p>{selectedAddress.country}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedAddress && (
                <div className="cart-items">
                  <div className="cart-items__header">
                    <h3>Cart Items</h3>
                  </div>
                  <div className="cart-items__list">
                    {cartItems.map((item, index) => (
                      <CartItem key={index} item={item} disabled={true} />
                    ))}
                  </div>
                  <div className="cart-items__total">
                    <div className="cart-items__left">
                      <p>Total</p>
                    </div>
                    <div className="cart-items__right">
                      <p>${totalCostValue}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </form>
          </div>
        </main>

        <div className="checkout-page__footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Checkout;
