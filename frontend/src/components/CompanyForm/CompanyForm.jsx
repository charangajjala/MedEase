import { FormInput, Textarea } from "../../components/index.js";
import { useReducer, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./CompanyForm.scss";

import endpoints from "../../constants/endpoints.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { useNavigate } from "react-router-dom";

const CompanyForm = ({ method, companyData }) => {
  const initialState = {
    companyName: companyData?.companyName || "",
    description: companyData?.description || "",
    id: companyData?.id || "",
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
  const navigate = useNavigate();

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
          navigate("/admin/companies");
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (err) {
        setErrorMessage("An Unknown Error has occured error occurred");
      }
    }

    if (method === "Update") {
      try {
        console.log(state);
        const response = await axiosPrivate.put(
          endpoints.UPDATE_COMPANY_URL,
          state
        );
        if (response.status === 200) {
          setSuccessMessage("Company updated successfully");
          navigate("/admin/companies");
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
          autoComplete="off"
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
        <div className="company-form__button-container">
          <button className="company-form__button" type="submit">
            {method} Company
          </button>
          <button
            className="company-form__button"
            onClick={() => {
              navigate("/admin/companies");
            }}
          >
            Return to Companies
          </button>
        </div>
      </form>
    </>
  );
};

CompanyForm.propTypes = {
  method: PropTypes.string.isRequired,
  companyData: PropTypes.object,
};

export default CompanyForm;
