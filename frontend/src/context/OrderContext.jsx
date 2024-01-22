/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const OrderContext = createContext(null);

const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  return (
    <OrderContext.Provider value={{ orderPlaced, setOrderPlaced }}>
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default useOrderContext;
