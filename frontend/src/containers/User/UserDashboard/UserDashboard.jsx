import { Header, Footer, CategoryCard } from "../../../userComponents";

const UserDashboard = () => {
  return (
    <>
      <Header />
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
