import { FormInput, Textarea } from "../../components/index.js";
import { useReducer, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./CompanyForm.scss";

import endpoints from "../../constants/endpoints.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

const CompanyForm = ({ method, companyData }) => {
  const initialState = {
    companyName: companyData?.companyName || "",
    description: companyData?.description || "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_COMPANY_NAME":
        return { ...state, companyName: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };
      case "UPDATE_COMPANY":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const companyNameRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    companyNameRef.current.focus();
  }, []);

  useEffect(() => {
    companyNameRef.current.focus();

    if (companyData) {
      console.log(companyData);
      dispatch({
        type: "UPDATE_COMPANY",
        payload: {
          companyName: companyData.companyName,
          description: companyData.description,
        },
      });
    }
  }, [companyData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (method === "Add") {
      try {
        const response = await axiosPrivate.post(
          endpoints.ADD_COMPANY_URL,
          state
        );
        if (response.status === 201) {
          setSuccessMessage("Company added successfully");
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (err) {
        alert("An error occurred while adding the data");
      }
    }

    if (method === "Update") {
      try {
        console.log(state);
        const response = await axiosPrivate.put(
          endpoints.UPDATE_COMPANY_URL.replace("{id}", companyData.id),
          state
        );
        if (response.status === 200) {
          setSuccessMessage("Company updated successfully");
        }
      } catch (err) {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="company-form">
        <FormInput
          id="companyName"
          type="text"
          name="companyName"
          value={state.companyName}
          onChange={(e) =>
            dispatch({
              type: "SET_COMPANY_NAME",
              payload: e.target.value,
            })
          }
          label="Company Name"
          ref={companyNameRef}
        />
        <Textarea
          id="description"
          name="description"
          required={true}
          value={state.description}
          onChange={(e) =>
            dispatch({
              type: "SET_DESCRIPTION",
              payload: e.target.value,
            })
          }
          label="Description"
        />
        {successMessage && (
          <div className="company-form__success-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="company-form__error-message">{errorMessage}</div>
        )}
        <button type="submit" className="add-company-form__button">
          {method} Company
        </button>
      </form>
    </>
  );
};

CompanyForm.propTypes = {
  method: PropTypes.string.isRequired,
  companyData: PropTypes.object,
};

export default CompanyForm;
