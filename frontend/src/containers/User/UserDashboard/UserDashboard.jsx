import { Header, Footer, CategoryCard, Navbar } from "../../../userComponents";

const UserDashboard = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="home">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
      <Footer />
    </>
  )
};

export default UserDashboard;
