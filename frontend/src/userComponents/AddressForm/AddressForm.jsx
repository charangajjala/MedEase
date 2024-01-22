import { useReducer, useState } from "react";
import { FormInput, SelectField } from "../../components";
import "./AddressForm.scss";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const initialState = {
  addressName: "string",
  addressLine1: "string",
  addressLine2: "string",
  city: "string",
  state: "string",
  country: "string",
  pincode: "string",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESS_NAME":
      return { ...state, addressName: action.payload };
    case "SET_ADDRESS_LINE_1":
      return { ...state, addressLine1: action.payload };
    case "SET_ADDRESS_LINE_2":
      return { ...state, addressLine2: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_PINCODE":
      return { ...state, pincode: action.payload };
    default:
      return state;
  }
};

const AddressForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosPrivate = useAxiosPrivate();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        userEndpoints.ADD_ADDRESS,
        state
      );
      const data = response.data;
      navigate("/profile/addresses");
      console.log(data);
      // console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = await response.data;
      const formattedCountries = data.map((country) => ({
        code: country.name.common,
        name: country.name.common,
      }));
      setCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
 
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="address-form">
      <div className="address-form__header">
        <h1>Add New Address</h1>
      </div>
      <form>
        <FormInput
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="Enter your name"
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS_NAME", payload: e.target.value })
          }
          required
        />
        <FormInput
          type="text"
          name="address1"
          id="address1"
          label="Address Line 1"
          placeholder="Enter your address"
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS_LINE_1", payload: e.target.value })
          }
          required
        />
        <FormInput
          type="text"
          name="address2"
          id="address2"
          label="Address Line 2"
          placeholder="Enter your address"
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS_LINE_2", payload: e.target.value })
          }
        />

        <SelectField
          label="Country"
          name="country"
          id="country"
          onChange={(e) =>
            dispatch({ type: "SET_COUNTRY", payload: e.target.value })
          }
          options={countries.map((country) => ({
            value: country.code,
            label: country.name,
          }))}
          required
        />

        <SelectField
          label="State"
          name="state"
          id="state"
          onChange={(e) =>
            dispatch({ type: "SET_STATE", payload: e.target.value })
          }
          options={countries.map((country) => ({
            value: country.code,
            label: country.name,
          }))}
          required
        />

        <SelectField
          label="City"
          name="city"
          id="city"
          onChange={(e) =>
            dispatch({ type: "SET_CITY", payload: e.target.value })
          }
          options={countries.map((country) => ({
            value: country.code,
            label: country.name,
          }))}
          required
        />

        <FormInput
          type="text"
          name="pinode"
          id="pincode"
          label="Pin Code"
          placeholder="Enter your pin code"
          onChange={(e) =>
            dispatch({ type: "SET_PINCODE", payload: e.target.value })
          }
          required
        />
        <div className="form-buttons">
          <div className="submit-button">
            <button onClick={handleSubmit}>Add Address</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
