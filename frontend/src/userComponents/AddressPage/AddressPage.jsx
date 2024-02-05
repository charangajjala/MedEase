import "./AddressPage.scss";
import address from "../../assets/address.svg";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.svg";

const AddressPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [addresses, setAddresses] = useState([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAddressLoading(true);
    const fetchAddresses = async () => {
      try {
        const response = await axiosPrivate.get(userEndpoints.GET_ADDRESSES);
        const data = response.data;
        setAddresses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAddressLoading(false);
      }
    };

    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddAdress = () => {
    // Navigate to address form Internally
    navigate("/profile/address-form");
  };

  if (isAddressLoading) {
    return (
      <div className="loading-page">
        <img src={loader} alt="" />
        <p>Loading Addresses...</p>
      </div>
    );
  }

  return (
    <div className="address-page">
      {addresses.length === 0 ? (
        <>
          <div className="content-wrapper">
            <img src={address} alt="No Addresses" />
            <p className="message">No addresses available</p>
          </div>
          <div className="address-page__buttons">
            <button onClick={handleAddAdress}>Add Address</button>
          </div>
        </>
      ) : (
        <>
          <div className="address-page__header">
            <h1>My Addresses</h1>
          </div>
          <div className="address-page__addresses">
            {addresses.map((address, index) => (
              <div key={index} className="address-card">
                <h3>{address.addressName}</h3>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{`${address.city}, ${address.state}`}</p>
                <p>{address.country}</p>
                <p>{address.pincode}</p>
              </div>
            ))}
            <div className="add-address-card">
              <div className="buttons">
                <button onClick={handleAddAdress}>Add Address</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressPage;
