import "./AddressPage.scss";
import address from "../../assets/address.svg";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosPrivate.get(userEndpoints.GET_ADDRESSES);
        const data = response.data;
        setAddresses(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddAdress = () => {
    // Navigate to address form Internally
    navigate("/profile/address-form");
  };

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
        <div className="address-page__addresses">
          {addresses.map((address) => (
            <div className="address-page__address" key={address.id}>
              <h3>{address.name}</h3>
              <p>{address.address}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.country}</p>
              <p>{address.zipCode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
