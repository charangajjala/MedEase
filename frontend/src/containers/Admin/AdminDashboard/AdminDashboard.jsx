import "./AdminDashboard.scss";
import logo from "../../../assets/logo.png";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  Loading,
} from "../../../components/index.js";

import { links } from "../../../constants/links.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../../constants/endpoints.js";
import orders from "../../../constants/orders.js";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
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
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
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

  function countOrdersPerYear(orders) {
    const counts = {};
    orders.forEach((order) => {
      const year = new Date(order.orderDate).getFullYear();
      counts[year] = (counts[year] || 0) + 1;
    });
    return counts;
  }

  const orderCounts = countOrdersPerYear(orders);
  const orderLineChartData = {
    labels: Object.keys(orderCounts).sort(),
    datasets: [
      {
        label: "Number of Orders per Year",
        data: Object.values(orderCounts),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
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

  if (isLoading) {
    return <Loading />;
  }

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
              <h3>Revenue by Year</h3>
              <Bar data={orderBarChartData} />
            </section>

            <section className="dashboard-section">
              <h3>Orders per Year</h3>
              <Line data={orderLineChartData} />
            </section>

            <section className="dashboard-section">
              <h3>Orders per Year</h3>
              <Line data={orderLineChartData} />
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
