import "./AdminDashboard.scss";
import logo from "../../../assets/logo.png";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
} from "../../../components/index.js";

import { links } from "../../../constants/links.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../../constants/endpoints.js";
import orders from "../../../constants/orders.js";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.PRODUCT_REPORTS_URL);
        const data = await response.data;
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.COMPANY_REPORTS_URL);
        const data = await response.data;
        setCompanies(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProductTypes = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_CATERGORY_URL);
        const data = await response.data;
        setProductTypes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    fetchCompanies();
    fetchProductTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
    });
  }

  const revenueByDate = {};
  orders.forEach((order) => {
    const formattedDate = formatDate(order.orderDate);
    revenueByDate[formattedDate] =
      (revenueByDate[formattedDate] || 0) + parseFloat(order.totalSum);
  });

  const orderBarChartData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Total Revenue ($)",
        data: Object.values(revenueByDate),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  const orderFrequency = {};
  orders.forEach((order) => {
    orderFrequency[order.customerName] =
      (orderFrequency[order.customerName] || 0) + 1;
  });

  const pieChartData = {
    labels: Object.keys(orderFrequency),
    datasets: [
      {
        label: "Order Frequency",
        data: Object.values(orderFrequency),
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
      },
    ],
  };

  const barChartData = {
    labels: productTypes.map((type) => type.categoryName),
    datasets: [
      {
        label: "Number of Products",
        data: productTypes.map(
          (type) =>
            products.filter((p) => p.category === type.categoryName).length
        ),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="admin-dashboard">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="admin-dashboard__main">
          <Header
            dropdownRef={dropdownRef}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            userName={"Admin"}
            dropdownMenu={[
              {
                name: "Profile",
                link: "/profile",
              },
              {
                name: "Logout",
                link: "/logout",
              },
            ]}
            heading={"Medical Store Stats"}
          />

          <div className="admin-dashboard__content">
            <section className="dashboard-section">
              <h3>Products by Category</h3>
              <Bar data={barChartData} />
            </section>

            <section className="dashboard-section">
              <h3>Revenue by Customer</h3>
              <Bar data={orderBarChartData} />
            </section>

            <section className="dashboard-section">
              <h3>Order Frequency</h3>
              <Pie data={pieChartData} />
            </section>

            <section className="dashboard-section">
              <h3>Order Frequency</h3>
              <Pie data={pieChartData} />
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
