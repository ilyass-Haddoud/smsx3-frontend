import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state.registerReducer);
  console.log(state);
  return (
    <div className="home">
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
