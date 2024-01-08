import { FormInput, Textarea } from "../../components/index.js";
import { useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import './CompanyForm.scss';

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
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const CompanyForm = ({ method }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const companyNameRef = useRef();
  useEffect(() => {
    companyNameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "Add") {
      console.log("Add");
    } else {
      console.log("Update");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
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
          name="description"
          value={state.description}
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
  title: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default CompanyForm;
