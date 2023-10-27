import NavBar from "../home/NavBar/NavBar";
import Header from "../home/Header/Header";
import Footer from "../home/Footer/Footer";

const NotFoundPage = () => {
  const style = {
    marginTop: "60px",
    marginBottom: "60px",
    textAlign: "center",
  };
  return (
    <div>
      <div className="section">
        <NavBar />
        <Header />
      </div>
      <div className="container">
        <h1 style={style}>Not found page.</h1>
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};

export default NotFoundPage;
