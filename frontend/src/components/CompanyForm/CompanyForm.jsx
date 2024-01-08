import { FormInput, Textarea } from "../../components/index.js";
import { useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./CompanyForm.scss";

const initialState = {
  companyName: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "UPDATE_COMPANY":
      return { ...state,...action.payload };
    default:
      return state;
  }
}

const CompanyForm = ({ method, companyData }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const companyNameRef = useRef();
  useEffect(() => {
    companyNameRef.current.focus();
  }, []);

  useEffect(() => {
    companyNameRef.current.focus();

    if (companyData) {
      dispatch({
        type: "UPDATE_COMPANY",
        payload: {
          companyName: companyData.name,
          description: companyData.description,
        },
      });
    }
  }, [companyData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "Add") {
      console.log(state);
    } else {
      console.log("Update");
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
          value={state.description}
          required={true}
          onChange={(e) =>
            dispatch({
              type: "SET_DESCRIPTION",
              payload: e.target.value,
            })
          }
          label="Description"
        />
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
