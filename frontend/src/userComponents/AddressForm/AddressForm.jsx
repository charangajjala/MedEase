import { useReducer, useState } from "react";
import { FormInput, SelectField } from "../../components";
import "./AddressForm.scss";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import keys from "../../constants/keys";

const initialState = {
  addressName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
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
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY": keys.COUNTRY_STATE_API_KEY,
          },
        }
      );
      const data = await response.data;
      const formattedCountries = data.map((country) => ({
        code: country.iso2,
        name: country.name,
      }));
      setCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        {
          headers: {
            "X-CSCAPI-KEY": keys.COUNTRY_STATE_API_KEY,
          },
        }
      );
      const data = await response.data;
      const formattedStates = data.map((state) => ({
        code: state.iso2,
        name: state.name,
      }));
      setStates(formattedStates);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": keys.COUNTRY_STATE_API_KEY,
          },
        }
      );
      const data = await response.data;
      const formattedCities = data.map((city) => ({
        code: String(city.id),
        name: city.name,
      }));
      setCities(formattedCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    dispatch({ type: "SET_COUNTRY", payload: selectedCountry });
    fetchStates(selectedCountry);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    dispatch({ type: "SET_STATE", payload: selectedState });
    fetchCities(state.country, selectedState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(userEndpoints.ADD_ADDRESS, {
        ...state,
        country: countries.find((country) => country.code === state.country)
          .name,
        state: states.find((eachState) => eachState.code === state.state).name,
        city: cities.find((city) => city.code === state.city).name,
      });
      const data = response.data;
      navigate("/profile/addresses");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
          label="Address Type"
          placeholder="Enter address type"
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
          onChange={handleCountryChange}
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
          onChange={handleStateChange}
          options={states.map((state) => ({
            value: state.code,
            label: state.name,
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
          options={cities.map((city) => ({
            value: city.code,
            label: city.name,
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
