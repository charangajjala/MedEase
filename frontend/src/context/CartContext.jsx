import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import endpoints from "../constants/endpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const CartContext = createContext();

const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth?.accessToken) {
      let isMounted = true;

      const fetchCartItems = async () => {
        try {
          const response = await axiosInstance.get(endpoints.GET_CART_URL);
          if (isMounted) {
            const totalQuantity = response.data.reduce(
              (acc, item) => acc + item.quantity,
              0
            );
            setCartCount(totalQuantity);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchCartItems();

      return () => {
        isMounted = false;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export default useCart;
