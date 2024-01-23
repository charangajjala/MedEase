import { useEffect, useState } from "react";
import { Footer, Header, CheckoutItem } from "../../../userComponents";
import "./Checkout.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import userEndpoints from "../../../constants/userEndpoints";
import endpoints from "../../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import { SelectField } from "../../../components";
import noitems from '../../../assets/empty-cart2.svg'
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
    const addressName = event.target.value;
    console.log(addressName);
    const address = addresses.find((addr) => addr.addressName === addressName);
    console.log(address);
    setSelectedAddress(address);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    try {
      console.log("The selected address is", selectedAddress);
      const response = await axiosPrivate.post(userEndpoints.PLACE_ORDER, {
        // Id is not being received
        addressId: selectedAddress.id,
      });
      const data = await response.data;
      console.log(data);
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const handleNoCartItems = () => {
    navigate("/dashboard");
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

              {cartItems && cartItems.length === 0 && (
                <div className="no-items">
                  <img src={noitems} alt="empty-cart" />
                </div>
              )}

              {cartItems && cartItems.length !== 0 && (
                <div className="form-section">
                  <h3>Shipping Address</h3>

                  <div className="form-group">
                    <div className="select-wrapper">
                      <SelectField
                        id="address"
                        name="address"
                        onChange={handleAddressChange}
                        value={selectedAddress?.addressName}
                        required
                        options={
                          addresses &&
                          addresses.map((address) => ({
                            value: address.addressName,
                            label: address.addressName,
                          }))
                        }
                      />
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
              )}

              {selectedAddress && (
                <div className="cart-items">
                  <div className="cart-items__header">
                    <h3>Cart Items</h3>
                  </div>
                  <div className="cart-items__list">
                    {cartItems.map((item, index) => (
                      <CheckoutItem
                        item={item}
                        key={index}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
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

              {cartItems && cartItems.length !== 0 && (
                <button
                  type="submit"
                  className="submit-button"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              )}
            </form>
            {cartItems && cartItems.length === 0 && (
              <button
                type="submit"
                className="redirect-button"
                onClick={handleNoCartItems}
              >
                Add Items to cart
              </button>
            )}
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
