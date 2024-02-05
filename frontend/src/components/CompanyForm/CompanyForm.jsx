import { FormInput, Textarea } from "../../components/index.js";
import { useReducer, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./CompanyForm.scss";

import endpoints from "../../constants/endpoints.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RedirectToast from "../../utils/RedirectToast.jsx";

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
  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const redirectDuration = 4000;

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

  const handleRedirection = (message) => {
    setIsRedirecting(true);
    // toast(
    //   () => <RedirectToast duration={redirectDuration} message={message} />,
    //   {
    //     duration: redirectDuration,
    //   }
    // );
    toast.custom(
      (t) => (
        <RedirectToast
          duration={t.duration}
          message={message}
        />
      ),
      {
        duration: 4000,
        id: "logout-toast",
      }
    );
    setTimeout(() => {
      navigate("/admin/companies");
    }, redirectDuration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.companyName || !state.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (method === "Add") {
      try {
        const response = await axiosPrivate.post(
          endpoints.ADD_COMPANY_URL,
          state
        );
        if (response.status === 201) {
          handleRedirection("Company added successfully");
        } else {
          toast.error("Failed to add company");
        }
      } catch (err) {
        toast.error(`Error adding company: ${err.message || "Unknown error"}`);
      }
    } else if (method === "Update") {
      try {
        const response = await axiosPrivate.put(
          endpoints.UPDATE_COMPANY_URL,
          state
        );
        if (response.status === 200) {
          handleRedirection("Company updated successfully");
        } else {
          toast.error("Failed to update company");
        }
      } catch (err) {
        toast.error(
          `Error updating company: ${err.message || "Unknown error"}`
        );
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
          disabled={isRedirecting}
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
          disabled={isRedirecting}
          label="Description"
        />
        {/* {successMessage && (
          <div className="company-form__success-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="company-form__error-message">{errorMessage}</div>
        )} */}
        <div className="company-form__button-container">
          <button
            className="company-form__button"
            type="submit"
            disabled={isRedirecting}
          >
            {method} Company
          </button>
          <button
            className="company-form__button"
            onClick={() => {
              navigate("/admin/companies");
            }}
            disabled={isRedirecting}
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
