import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>Oops! Page Not Found</h1>
      <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
      <a href="/" className="home-link">Go Back Home</a>
    </div>
  );
};

export default NotFoundPage;
